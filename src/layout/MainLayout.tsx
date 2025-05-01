import { Outlet } from 'react-router-dom';
import {Header} from "@/components/layout/header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col max-w-[600px] w-full mx-auto bg-background shadow-sides">
      {/* 공통 Header */}
      <Header type="main" point={999}/>
      {/* <Header type="login" point={999} />
      <Header type="down" point={999} />
      <Header type="downLogin" point={999} />
      <Header type="nav" point={999} />
      <Header type="minimal" point={999} /> */}

      {/* 각 페이지가 여기에 끼워진다 */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* 공통 Nav */}
      <footer className="h-16  w-full bg-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-500">© 2025 CareerBee</p>
      </footer>
    </div>
  );
}