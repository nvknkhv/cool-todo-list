import React, { FC } from 'react';
import classnames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@chakra-ui/react';

import Modal from '~/components/Modal';
import { RHFInput, RHFTextarea } from '~/components/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Comment } from '~/model/Ticket';
import {
  getActiveTicketAsync,
  addCommentToTicketAsync,
} from '~/reducers/ticketsSlice';
import { useAppDispatch } from '~/app/hooks';
import styles from './styles.module.css';

export const CommentModal: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['TicketModal', 'Notifications', 'Fields']);
  const { ticketId } = useParams();

  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Comment>({
    defaultValues: {
      author: '',
      text: '',
    },
  });

  const onSubmit: SubmitHandler<Comment> = (formData) => {
    if (ticketId)
      dispatch(
        addCommentToTicketAsync({
          ticketId,
          comment: { ...formData, commentId: uuidv4() },
        }),
      ).then(() => {
        toast({
          title: t('Notifications:comment', { context: 'added' }),
          status: 'success',
          duration: 9000,
          isClosable: true,
          variant: 'left-accent',
          position: 'bottom-right',
        });
        navigate(-1);
        dispatch(getActiveTicketAsync({ ticketId }));
      });
  };

  return (
    <form>
      <Modal
        title="Добавить комментарий"
        isOpen
        onClose={() => {
          navigate(-1);
        }}
        onSubmit={handleSubmit(onSubmit)}
        isInvalid={Object.keys(errors).length > 0}
      >
        <div className={classnames(styles.field)}>
          <RHFInput
            name="author"
            control={control}
            required={true}
            label={t('Fields:author')}
          />
        </div>
        <div className={classnames(styles.field)}>
          <RHFTextarea
            name="text"
            control={control}
            required={true}
            label={t('Fields:text')}
            rows={3}
          />
        </div>
      </Modal>
    </form>
  );
};

export default CommentModal;
