import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { Button, Heading, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Droppable } from 'react-beautiful-dnd';

import TicketCard from '~/components/TicketCard';
import { TicketColumn } from '~/model/Ticket';
import styles from './styles.module.css';
import { Status } from '~/model/enums';
import { useAppSelector } from '~/app/hooks';
import { ticketsStatusSelector } from '~/reducers/ticketsSlice';

export const TicketList: FC<TicketColumn> = ({ tickets, status }) => {
  const { t } = useTranslation('Common');
  const ticketsStatus = useAppSelector(ticketsStatusSelector);
  if (ticketsStatus === 'loading')
    return (
      <div className={classnames(styles.ticketList)}>
        <Heading size="md">{t(`Status.${status}`)}</Heading>
        <div className={classnames(styles.ticketList__content)}>
          {status !== Status.Done && (
            <Link
              to={`create/${status}`}
              className={classnames(styles.link_full)}
            >
              <Button
                leftIcon={<AddIcon />}
                colorScheme="orange"
                className={classnames(styles.button_full)}
              >
                {t('Button.add')}
              </Button>
            </Link>
          )}
          <Spinner size="md" color="orange" speed="0.65s" />
        </div>
      </div>
    );
  return (
    <div className={classnames(styles.ticketList)}>
      <Heading size="md">{t(`Status.${status}`)}</Heading>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className={classnames(styles.ticketList__content)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {status !== Status.Done && (
              <Link
                to={`create/${status}`}
                className={classnames(styles.link_full)}
              >
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="orange"
                  className={classnames(styles.button_full)}
                >
                  {t('Button.add')}
                </Button>
              </Link>
            )}
            {tickets?.length > 0 &&
              tickets.map((ticket, index) => (
                <TicketCard
                  key={ticket.ticketId}
                  ticketId={ticket.ticketId}
                  title={ticket.title}
                  tags={ticket.tags}
                  description={ticket.description}
                  comments={ticket.comments}
                  status={status}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TicketList;
