import React, { FC, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import route from './route';
import MainPage from '../MainPage';
import styles from './styles.module.css';
import { Button, Heading, Spinner, Flex, Text } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import KeyList from '~/components/ListKey';
import Actions from '~/components/Actions';
import { RHFInput, RHFTags, RHFTextarea } from '~/components/FormField';
import CommentList from '~/components/CommentList';
import { Ticket, TicketFormValues } from '~/model/Ticket';

import {
  activeTicketSelector,
  activeTicketStatusSelector,
  editTicketAsync,
  getActiveTicketAsync,
  getTicketsAsync,
} from '~/reducers/ticketsSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import TicketDeleteConfirmation from '~/components/TicketDeleteConfirmation';

const TicketPage: FC = () => {
  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const { ticketId } = useParams();
  const status = useAppSelector(activeTicketStatusSelector);
  const data = useAppSelector(activeTicketSelector);
  const { t } = useTranslation([
    'TicketModal',
    'Notifications',
    'Fields',
    'Common',
  ]);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue: setFormValue,
    watch,
  } = useForm<TicketFormValues>({
    defaultValues: {
      description: '',
      tags: [],
      status: undefined,
    },
  });

  if (!ticketId) {
    return null;
  }

  //получаем тикет по id
  useEffect(() => {
    if (typeof ticketId !== 'undefined') {
      dispatch(getActiveTicketAsync({ ticketId }));
    }
  }, []);

  //обновляем поля формы
  useEffect(() => {
    if (data) {
      const { tags, comments, ...rest } = data;
      Object.entries(rest).map(([key, value]) =>
        setFormValue(key as keyof TicketFormValues, value),
      );
      setFormValue(
        'tags',
        tags.map((item) => ({ value: item, label: item })),
      );
    }
  }, [data]);

  const onSubmit: SubmitHandler<TicketFormValues> = (formData) => {
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
      setEditing(false);
      dispatch(getActiveTicketAsync({ ticketId }));
    });
  };

  if (status === 'loading')
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <Spinner size="xl" color="orange" speed="0.65s" />
      </Flex>
    );
  if (!data)
    return (
      <>
        <Link to={MainPage.path}>
          <Button variant="link" leftIcon={<ArrowBackIcon />}>
            {t('Common:Button.back')}
          </Button>
        </Link>
        <div className={classnames(styles.content)}>Нет таких данных</div>
      </>
    );

  return (
    <>
      <Link to={MainPage.path}>
        <Button variant="link" leftIcon={<ArrowBackIcon />}>
          {t('Common:Button.back')}
        </Button>
      </Link>
      <div className={classnames(styles.content)}>
        <div className={classnames(styles.content__title)}>
          <Heading size="md" noOfLines={2}>
            {data.title}
          </Heading>
          <Actions
            actions={[
              {
                icon: <EditIcon />,
                callback: () => {
                  setEditing(true);
                },
                text: t('Common:Button.edit'),
              },
              {
                icon: <DeleteIcon />,
                callback: () => {
                  setDeleting(true);
                },
                text: t('Common:Button.delete'),
              },
            ]}
            isDisabled={isEditing}
          />
        </div>
        <div className={classnames(styles.content__body)}>
          {isEditing ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  <RHFTags
                    name="tags"
                    control={control}
                    label={t('Fields:tags')}
                  />
                </div>
                <div className={classnames(styles.container_centered)}>
                  <Button
                    variant="ghost"
                    onClick={() => setEditing(false)}
                    mr={3}
                    mt={4}
                  >
                    {t('Common:Button.cancel')}
                  </Button>
                  <Button
                    colorScheme="orange"
                    type="submit"
                    isDisabled={watch('title') === ''}
                    mt={4}
                  >
                    {t('Common:Button.save')}
                  </Button>
                </div>
              </form>
              <div className={classnames(styles.comments)}>
                <Text mb="8px">Комментарии</Text>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="orange"
                  onClick={() => navigate('comment/add')}
                  mb={4}
                >
                  {t('Common:Button.add_comment')}
                </Button>
                <CommentList
                  comments={data.comments}
                  isEditable
                  ticketId={ticketId}
                />
              </div>
            </>
          ) : (
            <>
              <KeyList
                data={{
                  [t('Fields:status')]: t(`Common:Status:${data.status}`),
                  [t('Fields:description')]: data.description,
                  [t('Fields:tags')]: data.tags,
                  [t('Fields:comments')]: (
                    <CommentList comments={data.comments} />
                  ),
                }}
              />
            </>
          )}
          {isDeleting && (
            <TicketDeleteConfirmation
              onCancel={() => setDeleting(false)}
              onRemove={() => {
                setDeleting(false);
                navigate(MainPage.path);
                dispatch(getTicketsAsync());
              }}
              ticketId={ticketId}
            />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default { ...route, element: <TicketPage /> };
