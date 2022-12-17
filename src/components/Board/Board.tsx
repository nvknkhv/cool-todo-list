import React, { FC, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { useToast } from '@chakra-ui/react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import TicketList from '~/components/TicketList';
import { Status } from '~/model/enums';
import {
  getTicketsAsync,
  updateTicketsAsync,
  ticketsSelector,
} from '~/reducers/ticketsSlice';
import styles from './styles.module.css';
import { filtersSelector } from '~/reducers/filtersSlice';
import { groupBy } from 'lodash-es';
import { Ticket } from '~/model/Ticket';

const Board: FC = () => {
  const { t } = useTranslation('Notifications');
  const tickets = useAppSelector(ticketsSelector);
  const filters = useAppSelector(filtersSelector);

  const filteredTickets = useMemo(() => {
    let tempTickets = Object.values(tickets).flat();
    Object.entries(filters).forEach(([filterName, filterValue]) => {
      tempTickets = [
        ...tempTickets.filter((ticket) => {
          switch (filterName) {
            case 'description':
              return ticket[filterName as 'description']
                .toLowerCase()
                .includes((filterValue as Ticket['description']).toLowerCase());
            case 'tags':
              return (filterValue as Ticket['tags']).reduce((sum, value) => {
                sum = sum || ticket[filterName as 'tags'].includes(value);
                return sum;
              }, false);
            case 'comments':
              return ticket.comments.length > 0;
          }
        }),
      ];
    });
    return groupBy(tempTickets, 'status');
  }, [tickets, filters]);

  const dispatch = useAppDispatch();
  const toast = useToast();

  // initial state
  useEffect(() => {
    dispatch(getTicketsAsync());
  }, []);

  const handleOnDragEnd = async (result: DropResult): Promise<void> => {
    if (!result.destination) return;
    if (result.source.droppableId === result.destination.droppableId) return;

    //изменяем 2 колонки
    const reorderedItem =
      tickets[result.source.droppableId as Status][result.source.index];

    const sourceTickets = [...tickets[result.source.droppableId as Status]];

    sourceTickets.splice(result.source.index, 1);

    const destinationTickets =
      result.source.droppableId === result.destination.droppableId
        ? sourceTickets
        : [...tickets[result.destination.droppableId as Status]];

    destinationTickets.splice(result.destination.index, 0, {
      ...reorderedItem,
      status: result.destination.droppableId as Status,
    });

    const newOrderedTickets = {
      ...tickets,
      [result.source.droppableId]: sourceTickets,
      [result.destination.droppableId]: destinationTickets,
    };
    dispatch(updateTicketsAsync({ tickets: newOrderedTickets })).then(() => {
      toast({
        title: t('ticket', {
          context: 'status_changed',
          name: reorderedItem.title,
          status: result.destination?.droppableId,
        }),
        status: 'success',
        duration: 9000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      });
      dispatch(getTicketsAsync());
    });
  };

  return (
    <div className={classnames(styles.board)}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {[Status.Todo, Status.InProgress, Status.Done].map((columnName) => (
          <TicketList
            key={columnName}
            tickets={filteredTickets[columnName]}
            status={columnName}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Board;
