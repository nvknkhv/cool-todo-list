import React, { FC } from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, Heading, Tooltip } from '@chakra-ui/react';
import {
  InfoOutlineIcon,
  ChatIcon,
  ExternalLinkIcon,
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import { Draggable } from 'react-beautiful-dnd';

import { tagsConfig } from '~/assets/tagsConfig';
import Actions from '~/components/Actions';
import { basePathDelete } from '~/components/TicketDeleteConfirmationByRoute/route';
import { Tag } from '~/model/enums';
import { Ticket } from '~/model/Ticket';
import { basePathEdit } from '~/modals/TicketModal/route';
import { basePath } from '~/pages/TicketPage/route';
import styles from './styles.module.css';

export const TicketCard: FC<Ticket & { index: number }> = ({
  tags,
  title,
  description,
  comments,
  ticketId,
  index,
}) => {
  const { t } = useTranslation(['Common', 'Notifications']);
  const navigate = useNavigate();
  return (
    <Draggable draggableId={ticketId} index={index}>
      {(provided, snapshot) => (
        <article
          className={classnames(styles.card)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={classnames(styles.card__raw)}>
            <Heading size="sm" noOfLines={1}>
              {title}
            </Heading>
            <div
              className={classnames(
                styles.card__actions,
                styles.card__actions_top,
              )}
            >
              <Actions
                actions={[
                  {
                    icon: <ExternalLinkIcon />,
                    callback: () => {
                      navigate(`${basePath}/${ticketId}`);
                    },
                    text: t('Button.go'),
                  },
                  {
                    icon: <EditIcon />,
                    callback: () => {
                      navigate(`${basePathEdit}/${ticketId}`);
                    },
                    text: t('Button.edit'),
                  },
                  {
                    icon: <DeleteIcon />,
                    callback: () => {
                      navigate(`${basePathDelete}/${ticketId}`);
                    },
                    text: t('Common:Button.delete'),
                  },
                ]}
              />
            </div>
          </div>
          <div className={classnames(styles.card__raw)}>
            <div className={classnames(styles.card__tags)}>
              {tags.map((tagAccent: Tag) => (
                <Badge
                  key={tagAccent}
                  colorScheme={tagsConfig[tagAccent].color}
                >
                  {tagAccent}
                </Badge>
              ))}
            </div>
            <div
              className={classnames(
                styles.card__actions,
                styles.card__actions_bottom,
              )}
            >
              {/* {description && (
                <Tooltip label="Есть описание">
                  <InfoOutlineIcon />
                </Tooltip>
              )}
              {comments.length > 0 && (
                <Tooltip label="Есть комментарии">
                  <ChatIcon />
                </Tooltip>
              )}*/}
            </div>
          </div>
        </article>
      )}
    </Draggable>
  );
};

export default TicketCard;
