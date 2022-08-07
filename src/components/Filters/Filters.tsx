import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { TagsFilter, DescriptionFilter } from './filtersByFields';

const Filters: FC = () => {
  return (
    <Box>
      <TagsFilter />
      <DescriptionFilter />
    </Box>
  );
};

export default Filters;
