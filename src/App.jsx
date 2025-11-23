import { BrowserRouter } from 'react-router';
import AppRoute from './routes/AppRoutes';
import './styles/global.css';
import { ThemeProvider } from './components/theme/ThemeProvider';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AppRoute />
      </ThemeProvider>
    </BrowserRouter>
  );
}
