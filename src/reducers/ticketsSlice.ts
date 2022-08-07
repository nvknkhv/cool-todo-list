import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { RootState } from '~/app/store';
import { Ticket } from '~/model/Ticket';
import { Status } from '~/model/enums';
import TicketsService from '~/services/TicketsService';

interface TicketStore {
  tickets: Record<Status, Ticket[]>;
  ticketsStatus: 'idle' | 'loading';
  activeTicket: Ticket | undefined | null;
  activeTicketStatus: 'idle' | 'loading';
}

const initialState: TicketStore = {
  tickets: {
    [Status.Todo]: [],
    [Status.InProgress]: [],
    [Status.Done]: [],
  },
  ticketsStatus: 'idle',
  activeTicket: null,
  activeTicketStatus: 'idle',
};

export const getTicketsAsync = createAsyncThunk('getTickets', async () =>
  TicketsService.requestAllTickets(),
);

export const getActiveTicketAsync = createAsyncThunk(
  'getActiveTicket',
  async ({ ticketId }: { ticketId: string }) =>
    TicketsService.getTicket(ticketId),
);

export const updateTicketsAsync = createAsyncThunk(
  'updateTickets',
  async ({ tickets }: { tickets: Record<Status, Ticket[]> }) =>
    TicketsService.updateTickets(tickets),
);

export const createTicketAsync = createAsyncThunk(
  'createTicket',
  async ({
    ticketData,
    ticketStatus,
  }: {
    ticketData: Ticket;
    ticketStatus: Status;
  }) => {
    await TicketsService.createTicket({ ticketData, ticketStatus });
  },
);

export const removeTicketAsync = createAsyncThunk(
  'removeTicket',
  async ({ ticketId }: { ticketId: string }) =>
    TicketsService.removeTicket(ticketId),
);

export const getSingleTicketAsync = createAsyncThunk(
  'getSingleTickets',
  async ({ ticketId }: { ticketId: string }) =>
    TicketsService.getTicket(ticketId),
);

export const editTicketAsync = createAsyncThunk(
  'editTicket',
  async ({
    ticketData,
    initialData,
    ticketId,
  }: {
    ticketData: Ticket;
    initialData: Ticket;
    ticketId: string;
  }) =>
    TicketsService.editTicket({
      ticketData,
      initialData,
      ticketId,
    }),
);

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsAsync.pending, (state) => {
        state.ticketsStatus = 'loading';
      })
      .addCase(getTicketsAsync.fulfilled, (state, action) => {
        state.ticketsStatus = 'idle';
        state.tickets = action.payload;
      })
      .addCase(getActiveTicketAsync.pending, (state) => {
        state.activeTicketStatus = 'loading';
      })
      .addCase(getActiveTicketAsync.fulfilled, (state, action) => {
        state.activeTicketStatus = 'idle';
        state.activeTicket = action.payload;
      })
      .addCase(updateTicketsAsync.pending, (state) => {
        state.ticketsStatus = 'loading';
      })
      .addCase(updateTicketsAsync.fulfilled, (state) => {
        state.ticketsStatus = 'idle';
      })
      .addCase(createTicketAsync.pending, (state) => {
        state.activeTicketStatus = 'loading';
      })
      .addCase(createTicketAsync.fulfilled, (state) => {
        state.activeTicketStatus = 'idle';
      })
      .addCase(removeTicketAsync.pending, (state) => {
        state.ticketsStatus = 'loading';
      })
      .addCase(removeTicketAsync.fulfilled, (state) => {
        state.ticketsStatus = 'idle';
      })
      .addCase(editTicketAsync.pending, (state) => {
        state.activeTicketStatus = 'loading';
      })
      .addCase(editTicketAsync.fulfilled, (state) => {
        state.activeTicketStatus = 'idle';
      });
  },
});

export const ticketsStatusSelector = createSelector(
  (state: RootState) => state.tickets.ticketsStatus,
  (status) => status,
);

export const ticketsSelector = createSelector(
  (state: RootState) => state.tickets.tickets,
  (items) => items,
);

export const activeTicketStatusSelector = createSelector(
  (state: RootState) => state.tickets.activeTicketStatus,
  (status) => status,
);

export const activeTicketSelector = createSelector(
  (state: RootState) => state.tickets.activeTicket,
  (item) => item,
);

export default ticketSlice.reducer;
