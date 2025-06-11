import { createBrowserRouter } from 'react-router-dom';

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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'company/:id', element: <CompanyDetail /> },
      {
        element: <RequireMyAuth />,
        children: [
          { path: 'my', element: <Mypage /> },
          {
            path: 'my/account',
            element: (
              <DirtyProvider>
                <Account />
              </DirtyProvider>
            ),
          },
          { path: 'my/account/quit', element: <Quit /> },
          { path: 'competition/entry', element: <Competition /> },
          { path: 'service/developers', element: <Developers /> },
          { path: 'resume/form', element: <ResumeForm /> },
          { path: 'resume/upload', element: <Upload /> },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'login-required', element: <LoginRequired /> },
      { path: 'oauth/callback/kakao', element: <OAuthCallback /> },
      { path: 'competition', element: <Ranking /> },
      { path: 'notification', element: <Notification /> },
      { path: '*', element: <ToBeContinued /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
