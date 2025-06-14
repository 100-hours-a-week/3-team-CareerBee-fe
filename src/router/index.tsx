import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Main from '@/features/Map/Main';
import CompanyDetail from '@/features/Company/CompanyDetail';
import Mypage from '@/features/Member/profile/Mypage';
import Login from '@/features/Member/auth/Login';
import LoginRequired from '@/features/Member/auth/LoginRequired';
import ToBeContinued from '@/pages/ToBeContinued';
import MainLayout from '@/layout/MainLayout';
import NotFound from '@/pages/NotFound';
import OAuthCallback from '@/features/Member/auth/OAuthCallback';
import Ranking from '@/features/Competition/Ranking';
import Competition from '@/features/Competition/Competition';
import Notification from '@/features/Member/notification/Notification';
import Account from '@/features/Member/profile/Account';
import { DirtyProvider } from '@/features/Member/profile/contexts/isDirtyContext';

import Quit from '@/features/Member/profile/Quit';
import Developers from '@/features/Member/service/developers';
import ResumeForm from '@/features/Member/resume/resumeForm';
import Upload from '@/features/Member/resume/upload';
import RequireMyAuth from '@/features/Member/auth/components/RequireMyAuth';

const showUnreleased = import.meta.env.VITE_SHOW_UNRELEASED === 'true';
const thisIsEmily = import.meta.env.VITE_THIS_IS_EMILY === 'true';

const AuthWrapper = () => {
  return thisIsEmily ? <Outlet /> : <RequireMyAuth />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'company/:id', element: <CompanyDetail /> },
      { path: 'competition', element: showUnreleased ? <Ranking /> : <ToBeContinued /> },
      {
        element: <AuthWrapper />,
        children: [
          { path: 'my', element: <Mypage /> },
          {
            path: 'my/account',
            element: showUnreleased ? (
              <DirtyProvider>
                <Account />
              </DirtyProvider>
            ) : (
              <ToBeContinued />
            ),
          },
          { path: 'notification', element: showUnreleased ? <Notification /> : <ToBeContinued /> },
          {
            path: 'competition/entry',
            element: showUnreleased ? <Competition /> : <ToBeContinued />,
          },
          { path: 'my/account/quit', element: showUnreleased ? <Quit /> : <ToBeContinued /> },
          {
            path: 'service/developers',
            element: showUnreleased ? <Developers /> : <ToBeContinued />,
          },
          { path: 'resume/form', element: showUnreleased ? <ResumeForm /> : <ToBeContinued /> },
          { path: 'resume/upload', element: showUnreleased ? <Upload /> : <ToBeContinued /> },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'login-required', element: <LoginRequired /> },
      { path: 'oauth/callback/kakao', element: <OAuthCallback /> },
      { path: '*', element: <ToBeContinued /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
