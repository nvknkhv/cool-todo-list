import { isEqual } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

import lsRequest from '~/api';
import defaultTickets from '~/assets/defaultTickets';
import { Ticket } from '~/model/Ticket';
import { Status } from '~/model/enums';
import { Tag } from '~/model/enums';

const TICKETS_KEY = 'TICKETS';

class TicketsAPI {
  requestAllTickets = async (): Promise<Record<Status, Ticket[]>> => {
    if (!localStorage.getItem(TICKETS_KEY)) {
      await lsRequest.setItem(TICKETS_KEY, JSON.stringify(defaultTickets));
    }
    return lsRequest
      .getItem(TICKETS_KEY)
      .then((data) => JSON.parse(<string>data));
  };

  updateTickets(items: Record<Status, Ticket[]>): Promise<void> {
    return lsRequest.setItem(TICKETS_KEY, JSON.stringify(items));
  }

  async createTicket({
    ticketData,
    ticketStatus,
  }: {
    ticketData: Ticket;
    ticketStatus: Status;
  }): Promise<void> {
    const tickets = await this.requestAllTickets();
    tickets[ticketStatus].unshift({
      ...ticketData,
      comments: [],
      status: ticketStatus,
      ticketId: uuidv4(),
    });
    await this.updateTickets(tickets);
  }

  async getTicket(ticketId: string): Promise<Ticket | undefined> {
    const tickets = await this.requestAllTickets();
    return Object.values(tickets)
      .flat()
      .find(({ ticketId: id }) => id === ticketId);
  }

  async removeTicket(ticketId: string): Promise<void> {
    const tickets = await this.requestAllTickets();
    await this.updateTickets(
      Object.entries(tickets).reduce((sum, [status, tickets]) => {
        sum[<Status>status] = tickets.filter(
          ({ ticketId: id }) => id !== ticketId,
        );
        return sum;
      }, <Record<Status, Ticket[]>>{}),
    );
  }

  async editTicket({
    ticketData,
    initialData,
    ticketId,
  }: {
    ticketData: Ticket;
    initialData: Ticket;
    ticketId: string;
  }): Promise<void> {
    // только изменившиеся поля
    const fields = Object.entries(ticketData).reduce(
      (sum, [fieldName, fieldValue]) => {
        if (!isEqual(fieldValue, initialData[fieldName as keyof Ticket])) {
          sum[fieldName] = fieldValue;
        }
        return sum;
      },
      {} as Record<string, string | Tag[]>,
    );
    const tickets = await this.requestAllTickets();
    const ticketToEditIndex = tickets[initialData.status].findIndex(
      ({ ticketId: id }) => id === ticketId,
    );
    const ticketToEditData = tickets[initialData.status][ticketToEditIndex];
    tickets[initialData.status][ticketToEditIndex] = {
      ...ticketToEditData,
      ...fields,
    };
    await this.updateTickets(tickets);
  }
}

export default new TicketsAPI();
