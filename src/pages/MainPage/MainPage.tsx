import React from 'react';

import classnames from 'classnames';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Board from '~/components/Board';
import Filters from '~/components/Filters';
import route from './route';
import styles from './styles.module.css';

const MainPage = () => {
  return (
    <>
      <Filters />
      <div className={classnames(styles.board)}>
        <Board />
      </div>
      <Outlet />
    </>
  );
};

export default { ...route, element: <MainPage /> };
