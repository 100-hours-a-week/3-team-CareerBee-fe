import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 공통 Header */}
      <header className="h-16 w-screen bg-yellow-400 flex items-center px-4">
        <h1 className="text-xl font-bold">CareerBee</h1>
      </header>

      {/* 각 페이지가 여기에 끼워진다 */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* 공통 Footer */}
      <footer className="h-16  w-screen bg-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-500">© 2025 CareerBee</p>
      </footer>
    </div>
  );
}