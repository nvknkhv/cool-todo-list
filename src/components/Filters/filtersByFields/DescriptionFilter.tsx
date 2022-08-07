import React, { FC, useState } from 'react';
import { Input } from '@chakra-ui/react';
import FilterItem from '~/components/Filters/FilterItem';
import { useAppSelector } from '~/app/hooks';
import { filtersSelector } from '~/reducers/filtersSlice';

const DescriptionFilter: FC = () => {
  const filters = useAppSelector(filtersSelector);
  const [value, setValue] = useState(filters.description ?? '');
  return (
    <FilterItem
      field="description"
      value={value}
      onClose={() => setValue(filters.description ?? '')}
      onReset={() => setValue('')}
      isActive={'description' in filters}
    >
      <Input
        value={value}
        focusBorderColor="orange.300"
        onChange={(event) => setValue(event.target.value)}
      />
    </FilterItem>
  );
};

export default DescriptionFilter;
