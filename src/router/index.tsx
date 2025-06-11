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
// import Ranking from '@/features/Competition/Ranking';
// import Competition from '@/features/Competition/Competition';
// import Notification from '@/features/Member/notification/Notification';
// import Account from '@/features/Member/profile/Account';
import { DirtyProvider } from '@/features/Member/profile/contexts/isDirtyContext';

// import Quit from '@/features/Member/profile/Quit';
// import Developers from '@/features/Member/service/developers';
// import ResumeForm from '@/features/Member/resume/resumeForm';
// import Upload from '@/features/Member/resume/upload';

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
      { path: 'competition', element: <ToBeContinued /> },
      { path: 'competition/entry', element: <ToBeContinued /> },
      { path: 'notification', element: <ToBeContinued /> },
      {
        path: 'my/account',
        element: (
          <DirtyProvider>
            <ToBeContinued />
          </DirtyProvider>
        ),
      },
      // { path: 'my/account', element: <Account /> },
      { path: 'my/account/quit', element: <ToBeContinued /> },
      { path: 'service/developers', element: <ToBeContinued /> },
      { path: 'resume/form', element: <ToBeContinued /> },
      { path: 'resume/upload', element: <ToBeContinued /> },
      { path: '*', element: <ToBeContinued /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
