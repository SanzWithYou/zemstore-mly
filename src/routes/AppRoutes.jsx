import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home';
import { Route, Routes } from 'react-router';

export default function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
