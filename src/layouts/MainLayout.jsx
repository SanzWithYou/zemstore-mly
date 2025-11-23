import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export default function MainLayout() {
  return (
    <div className='bg-background'>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
