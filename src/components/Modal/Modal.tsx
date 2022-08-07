import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/react';

export const CustomModal: FC<{
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  size?: string;
  isSubmitting?: boolean;
  isInvalid?: boolean;
}> = ({
  children,
  isOpen,
  onClose,
  onSubmit,
  title,
  size = '2xl',
  isSubmitting = false,
  isInvalid = false,
}) => {
  const { t } = useTranslation('Common');
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton autoFocus={false} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={onClose}>
            {t('Button.cancel')}
          </Button>
          <Button
            colorScheme="orange"
            onClick={onSubmit}
            isLoading={isSubmitting}
            isDisabled={isInvalid}
          >
            {t('Button.save')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
