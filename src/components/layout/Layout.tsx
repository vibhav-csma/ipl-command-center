import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto p-6 min-w-0 max-w-[1800px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
