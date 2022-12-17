import React, { FC, useState } from 'react';
import FilterItem from '~/components/Filters/FilterItem';
import { useAppSelector } from '~/app/hooks';
import { filtersSelector } from '~/reducers/filtersSlice';
import TagsSelect from '~/components/TagsSelect';

const TagsFilter: FC = () => {
  const filters = useAppSelector(filtersSelector);
  const [value, setValue] = useState(filters.tags || []);

  return (
    <FilterItem
      field="tags"
      value={value}
      onClose={() => {
        setValue(filters.tags || []);
      }}
      onReset={() => setValue([])}
      isActive={'tags' in filters}
    >
      <TagsSelect
        value={value.map((value) => ({ value, label: value }))}
        isClearable
        onChange={(values) => setValue(values.map(({ value }) => value))}
      />
    </FilterItem>
  );
};

export default TagsFilter;
