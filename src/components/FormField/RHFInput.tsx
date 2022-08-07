import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useController, Control } from 'react-hook-form';
import { Input, Text, Tooltip } from '@chakra-ui/react';

import { FormFieldItem } from './styled';

const RHFInput: FC<{
  name: string;
  control: Control<any>;
  required?: boolean;
  label: string;
}> = ({ name, control, required = false, label }) => {
  const { t } = useTranslation(['TicketModal', 'Fields']);
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required },
  });
  if (error?.type === 'required')
    return (
      <FormFieldItem>
        <Text mb="8px">{label}</Text>
        <Tooltip
          hasArrow
          bg="red.300"
          placement="top"
          closeOnClick={false}
          label={t('TicketModal:Errors.required', {
            name: t(`Fields:${name}`),
          })}
        >
          <Input
            value={value}
            onChange={onChange}
            isInvalid={invalid}
            focusBorderColor="orange.300"
          />
        </Tooltip>
      </FormFieldItem>
    );
  return (
    <FormFieldItem>
      <Text mb="8px">{label}</Text>
      <Input value={value} onChange={onChange} focusBorderColor="orange.300" />
    </FormFieldItem>
  );
};

export default RHFInput;
