import React, { FC } from 'react';
import { useController, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, Textarea, Tooltip } from '@chakra-ui/react';

import { FormFieldItem } from './styled';

const RHFTextarea: FC<{
  name: string;
  control: Control<any>;
  required?: boolean;
  label: string;
  rows: number;
}> = ({ name, control, required = false, label, rows }) => {
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
        <Tooltip
          hasArrow
          bg="red.300"
          placement="top"
          closeOnClick={false}
          label={t('TicketModal:Errors.required', {
            name: t(`Fields:${name}`),
          })}
        >
          <Textarea
            rows={rows}
            value={value}
            onChange={onChange}
            focusBorderColor="orange.300"
            isInvalid={invalid}
          />
        </Tooltip>
      </FormFieldItem>
    );
  return (
    <FormFieldItem>
      <Text mb="8px">{label}</Text>
      <Textarea
        rows={rows}
        value={value}
        onChange={onChange}
        focusBorderColor="orange.300"
      />
    </FormFieldItem>
  );
};

export default RHFTextarea;
