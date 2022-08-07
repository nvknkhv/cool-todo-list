import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useAppDispatch } from '~/app/hooks';
import { removeTicketAsync } from '~/reducers/ticketsSlice';

const TicketDeleteConfirmation: FC<{
  onCancel: () => void;
  onRemove: () => void;
  ticketId: string;
}> = ({ onCancel, onRemove, ticketId }) => {
  const cancelRef = useRef(null);
  const { t } = useTranslation([
    'DeleteConfirmation',
    'Notifications',
    'Common',
  ]);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeTicketAsync({ ticketId })).then(() => {
      toast({
        title: t('Notifications:ticket', { context: 'delete' }),
        status: 'success',
        duration: 9000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      });
      onRemove();
    });
  };

  return (
    <AlertDialog
      isOpen
      leastDestructiveRef={cancelRef}
      autoFocus={false}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('DeleteConfirmation:title')}
          </AlertDialogHeader>
          <AlertDialogBody>
            {t('DeleteConfirmation:description')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button mr={3} onClick={onCancel} variant="ghost">
              {t('Common:Button.cancel')}
            </Button>
            <Button colorScheme="orange" onClick={handleDelete}>
              {t('Common:Button.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default TicketDeleteConfirmation;
