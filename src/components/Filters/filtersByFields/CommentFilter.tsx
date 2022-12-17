import React, { FC, useState } from 'react';
import { Checkbox } from '@chakra-ui/react';
import FilterItem from '~/components/Filters/FilterItem';
import { useAppSelector } from '~/app/hooks';
import { filtersSelector } from '~/reducers/filtersSlice';
import { useTranslation } from 'react-i18next';

const CommentFilter: FC = () => {
  const { t } = useTranslation(['Filters']);
  const filters = useAppSelector(filtersSelector);
  const [value, setValue] = useState(!!filters.comments);
  return (
    <FilterItem
      field="comments"
      value={value}
      onClose={() => setValue(!!filters.comments)}
      onReset={() => setValue(false)}
      isActive={'comments' in filters}
    >
      <Checkbox
        isChecked={value}
        colorScheme="orange"
        onChange={(e) => setValue(e.target.checked)}
      >
        {t('Filters:withComments')}
      </Checkbox>
    </FilterItem>
  );
};

export default CommentFilter;
