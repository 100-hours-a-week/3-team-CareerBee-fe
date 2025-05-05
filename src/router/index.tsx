import { createBrowserRouter } from 'react-router-dom';

import Main from '@/pages/Main';
import CompanyDetail from '@/pages/CompanyDetail';
import Mypage from '@/pages/Mypage';
import Login from '@/pages/Login';
import LoginRequired from '@/pages/LoginRequired';
import ToBeContinued from '@/pages/ToBeContinued';
import MainLayout from '@/layout/MainLayout';
import NotFound from '@/pages/NotFound';
import OAuthCallback from '@/pages/OAuthCallback';

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
      { path: '*', element: <ToBeContinued /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: "/oauth/callback/kakao",
    element: <OAuthCallback />,
  }
]);