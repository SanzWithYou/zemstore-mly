import { useState, useEffect } from 'react';
import ModeToggle from '../theme/ModeToggle';
import NavigationMenu from './NavigationMenu';

// Komponen navbar
export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Monitor scroll posisi
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(false);
        }

        if (currentScrollY < 50) {
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`
          fixed top-0 left-0 right-0 z-50
          w-full bg-background
          transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
    >
      <div
        className='
          container mx-auto px-4 py-3
          flex items-center justify-between
        '
      >
        <div className='select-none'>
          <h1 className='text-xl font-bold tracking-wide'>Zem Store</h1>
        </div>

        <NavigationMenu />

        <div className='flex items-center gap-4'>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
