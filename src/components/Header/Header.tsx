import React, { FC } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import LocaleSwitcher from '~/components/LocaleSwitcher';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import boardImg from '~/assets/img/board.png';

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
          <img src={boardImg} alt="header image" />
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
