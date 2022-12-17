import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';
import TicketModal from '~/modals/TicketModal';
import MainPage from '~/pages/MainPage';
import TaskPage from '~/pages/TicketPage';
import { createPath, editPath } from '~/modals/TicketModal/route';
import CommentModal from '~/modals/CommentModal';
import { deletePath } from '~/components/TicketDeleteConfirmationByRoute/route';
import TicketDeleteConfirmationByRoute from '~/components/TicketDeleteConfirmationByRoute';
import LayoutHeader from '~/components/Header';

const Layout = styled.div`
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
`;

const LayoutContent = styled.div`
  height: calc(100% - 48px);
  box-sizing: border-box;
  overflow-y: auto;
  padding: 24px;
`;

function App() {
  return (
    <Layout>
      <LayoutHeader />
      <LayoutContent>
        <Routes>
          <Route {...MainPage}>
            <Route path={createPath} element={<TicketModal />} />
            <Route path={editPath} element={<TicketModal />} />
            <Route
              path={deletePath}
              element={<TicketDeleteConfirmationByRoute />}
            />
          </Route>
          <Route {...TaskPage}>
            <Route path="comment/add" element={<CommentModal />} />
            <Route path="*" element={<Navigate replace to={MainPage.path} />} />
          </Route>
          <Route path="*" element={<Navigate replace to={MainPage.path} />} />
        </Routes>
      </LayoutContent>
    </Layout>
  );
}

export default App;
