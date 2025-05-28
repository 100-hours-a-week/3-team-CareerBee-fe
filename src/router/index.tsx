import { createBrowserRouter } from 'react-router-dom';

import Main from '@/features/Map/Main';
import CompanyDetail from '@/features/Company/CompanyDetail';
import Mypage from '@/features/Member/Mypage';
import Login from '@/features/Member/auth/Login';
import LoginRequired from '@/features/Member/LoginRequired';
import ToBeContinued from '@/pages/ToBeContinued';
import MainLayout from '@/layout/MainLayout';
import NotFound from '@/pages/NotFound';
import OAuthCallback from '@/features/Member/auth/OAuthCallback';
import Ranking from '@/features/Competition/Ranking';
import Competition from '@/features/Competition/Competition';
import Notification from '@/features/Member/notification/Notification';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'company/:id', element: <CompanyDetail /> },
      { path: 'my', element: <Mypage /> },
      { path: 'login', element: <Login /> },
      { path: 'login-required', element: <LoginRequired /> },
      { path: 'oauth/callback/kakao', element: <OAuthCallback /> },
      { path: 'competition', element: <Ranking /> },
      { path: 'competition/entry', element: <Competition /> },
      { path: 'notification', element: <Notification /> },
      { path: '*', element: <ToBeContinued /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
