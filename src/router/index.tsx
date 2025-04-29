import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import CompanyDetail from '@/pages/CompanyDetail';
import Mypage from '@/pages/Mypage';
import Login from '@/pages/Login';
import LoginRequired from '@/pages/LoginRequired';
import ToBeContinued from '@/pages/ToBeContinued';
import MainLayout from '@/layout/MainLayout';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'company/:id', element: <CompanyDetail /> },
      { path: 'my', element: <Mypage /> },
      { path: 'login', element: <Login /> },
      { path: 'login-required', element: <LoginRequired /> },
      { path: 'to-be-continued', element: <ToBeContinued /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);