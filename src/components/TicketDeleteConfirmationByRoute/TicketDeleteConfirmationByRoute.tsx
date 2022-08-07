import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { getTicketsAsync } from '~/reducers/ticketsSlice';
import TicketDeleteConfirmation from '~/components/TicketDeleteConfirmation';
import MainPage from '~/pages/MainPage/MainPage';

const TicketDeleteConfirmationByRoute: FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const ticketId = params.ticketId;
  const dispatch = useAppDispatch();

  if (!ticketId) return null;

  return (
    <TicketDeleteConfirmation
      ticketId={ticketId}
      onRemove={() => {
        navigate(MainPage.path);
        dispatch(getTicketsAsync());
      }}
      onCancel={() => {
        navigate(MainPage.path);
      }}
    />
  );
};

export default TicketDeleteConfirmationByRoute;
