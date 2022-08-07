import React, { FC } from 'react';
import { useController, Control } from 'react-hook-form';
import { Text } from '@chakra-ui/react';
import TagsSelect from '~/components/TagsSelect';

import { FormFieldItem } from './styled';

const FormInput: FC<{
  name: string;
  control: Control<any>;
  label: string;
}> = ({ name, control, label }) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });
  return (
    <FormFieldItem>
      <Text mb="8px">{label}</Text>
      <TagsSelect isClearable value={value} onChange={onChange} />
    </FormFieldItem>
  );
};

export default FormInput;
