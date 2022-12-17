import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import {
  TagsFilter,
  DescriptionFilter,
  CommentFilter,
} from './filtersByFields';

const Filters: FC = () => {
  return (
    <Box>
      <TagsFilter />
      <DescriptionFilter />
      <CommentFilter />
    </Box>
  );
};

export default Filters;
