import React, { useEffect, useState, FC } from 'react';
import classnames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Spinner, useToast } from '@chakra-ui/react';
import { ModalOverlay } from '@chakra-ui/modal';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { RHFInput, RHFTags, RHFTextarea } from '~/components/FormField';
import Modal from '~/components/Modal';
import { Ticket, TicketFormValues } from '~/model/Ticket';
import { Tag, Status } from '~/model/enums';
import MainPage from '~/pages/MainPage';
import {
  createTicketAsync,
  getTicketsAsync,
  editTicketAsync,
  activeTicketStatusSelector,
} from '~/reducers/ticketsSlice';
import TicketsService from '~/services/TicketsService';
import styles from './styles.module.css';

export const TicketModal: FC = () => {
  const { t } = useTranslation(['TicketModal', 'Notifications', 'Fields']);
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();
  const [data, setData] = useState<Ticket | null>(null);
  const isEditing = !!params?.ticketId;
  const ticketId = params?.ticketId || null;
  const creationStatus = (params?.status || Status.Todo) as Status;
  const status = useAppSelector(activeTicketStatusSelector);
  if (
    ![Status.Todo, Status.InProgress].includes(creationStatus) &&
    !isEditing
  ) {
    return null;
  }
  if (data === undefined) {
    return <div>no data</div>;
  }

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue: setFormValue,
  } = useForm<TicketFormValues>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
    },
  });

  // получаем тикет по id
  useEffect(() => {
    async function fetchTicket(id: string | null) {
      if (typeof id === 'string') {
        const ticket = await TicketsService.getTicket(id);
        if (ticket) {
          setData(ticket);
        }
      }
    }
    fetchTicket(ticketId);
  }, []);

  // обновляем поля формы
  useEffect(() => {
    if (data) {
      const { tags, ...rest } = data;
      Object.entries(rest).map(([key, value]) =>
        setFormValue(key as keyof TicketFormValues, value),
      );
      setFormValue(
        'tags',
        tags.map((item: Tag) => ({ value: item, label: item })),
      );
    }
  }, [data]);

  const handleCreate: SubmitHandler<TicketFormValues> = (formData) => {
    const { tags, ...ticketData } = formData;
    const ticket = {
      ...ticketData,
      tags: tags.map(({ value }) => value),
    };
    dispatch(
      createTicketAsync({ ticketData: ticket, ticketStatus: creationStatus }),
    ).then(() => {
      toast({
        title: t('Notifications:ticket', { context: 'created' }),
        status: 'success',
        duration: 9000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      });
      navigate(MainPage.path);
      dispatch(getTicketsAsync());
    });
  };

  const handleEdit: SubmitHandler<TicketFormValues> = (formData) => {
    const { tags, ...ticketData } = formData;
    const ticket = {
      ...ticketData,
      tags: tags.map(({ value }) => value),
    };
    dispatch(
      editTicketAsync({
        ticketData: ticket,
        initialData: data as Ticket,
        ticketId: ticketId as string,
      }),
    ).then(() => {
      toast({
        title: t('Notifications:ticket', { context: 'edited' }),
        status: 'success',
        duration: 9000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      });
      navigate(MainPage.path);
      dispatch(getTicketsAsync());
    });
  };

  const onSubmit: SubmitHandler<TicketFormValues> = (data) =>
    isEditing ? handleEdit(data) : handleCreate(data);

  return (
    <form>
      <Modal
        title={t('TicketModal:header', {
          context: isEditing ? 'edit' : 'create',
        })}
        isOpen
        onSubmit={handleSubmit(onSubmit)}
        onClose={() => {
          navigate(MainPage.path);
        }}
        isSubmitting={status === 'loading'}
        isInvalid={Object.keys(errors).length > 0}
      >
        {status === 'loading' && (
          <>
            <ModalOverlay />
            <Spinner
              size="lg"
              color="orange"
              speed="0.65s"
              className={classnames(styles.spinner)}
            />
          </>
        )}
        {!data && isEditing ? (
          <Spinner
            size="lg"
            color="orange"
            speed="0.65s"
            className={classnames(styles.spinner)}
          />
        ) : (
          <>
            <div className={classnames(styles.field)}>
              <RHFInput
                name="title"
                control={control}
                required={true}
                label={t('Fields:title')}
              />
            </div>
            <div className={classnames(styles.field)}>
              <RHFTextarea
                name="description"
                control={control}
                label={t('Fields:description')}
                rows={6}
              />
            </div>
            <div className={classnames(styles.field)}>
              <RHFTags name="tags" control={control} label={t('Fields:tags')} />
            </div>
          </>
        )}
      </Modal>
    </form>
  );
};

export default TicketModal;
