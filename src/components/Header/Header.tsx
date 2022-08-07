import React, { FC } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import LocaleSwitcher from '~/components/LocaleSwitcher';

const LayoutHeader: FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bgColor="orange.500"
      height="48px"
      paddingLeft="24px"
      paddingRight="24px"
    >
      <Flex alignItems="center" gap="8px">
        <Box height="36px" width="36px">
          <img src="https://img.icons8.com/external-color-line-collection-vinzence-studio/64/null/external-dashboard-augmented-reality-color-line-collection-vinzence-studio.png" />
        </Box>
        <Heading size="md">Board</Heading>
      </Flex>
      <Box width="128">
        <LocaleSwitcher />
      </Box>
    </Flex>
  );
};

export default LayoutHeader;
