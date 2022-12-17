import React, { FC } from 'react';
import { Text, Flex, IconButton, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Comment } from '~/model/Ticket';
import {
  deleteCommentFromTicketAsync,
  getActiveTicketAsync,
} from '~/reducers/ticketsSlice';
import { useAppDispatch } from '~/app/hooks';
import { useTranslation } from 'react-i18next';

const CommentList: FC<{
  comments: Comment[];
  isEditable?: boolean;
  ticketId?: string;
}> = ({ comments = [], isEditable = false, ticketId }) => {
  const { t } = useTranslation(['Notifications']);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handleRemove = (commentId: string) => {
    if (ticketId)
      dispatch(
        deleteCommentFromTicketAsync({
          commentId,
          ticketId,
        }),
      ).then(() => {
        toast({
          title: t('Notifications:comment', { context: 'deleted' }),
          status: 'success',
          duration: 9000,
          isClosable: true,
          variant: 'left-accent',
          position: 'bottom-right',
        });
        dispatch(getActiveTicketAsync({ ticketId }));
      });
  };

  return (
    <>
      {comments.map(({ author, text, commentId }, id) => (
        <div key={id}>
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Text as="b">{author}</Text>
            {isEditable && (
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => {
                  handleRemove(commentId);
                }}
                aria-label="label"
              />
            )}
          </Flex>
          <Text mb={4}>{text}</Text>
        </div>
      ))}
    </>
  );
};

export default CommentList;
