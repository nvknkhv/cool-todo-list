import React, { FC } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Dots } from '~/assets/icons';
import { Action } from '~/model/Ticket';

export const Actions: FC<{ actions: Action[]; isDisabled?: boolean }> = ({
  actions,
  isDisabled = false,
}) => (
  <Menu>
    <MenuButton
      as={IconButton}
      icon={<Dots />}
      size="xs"
      disabled={isDisabled}
    />
    <MenuList>
      {actions.map(({ icon, text, callback }) => (
        <MenuItem icon={icon} onClick={callback} key={text}>
          {text}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default Actions;
