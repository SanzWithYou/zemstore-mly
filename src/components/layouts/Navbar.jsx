import { useState, useEffect } from 'react';
import ModeToggle from '../theme/ModeToggle';
import NavigationMenu from './NavigationMenu';

export default function Navbar() {
  // State visibilitas
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll handler
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Show/hide logic
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(false);
        }

        // Always show at top
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
    // Navbar container
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
        {/* Logo */}
        <div className='select-none'>
          <h1 className='text-xl font-bold tracking-wide'>Zem Store</h1>
        </div>

        {/* Navigation */}
        <NavigationMenu />

        {/* Actions */}
        <div className='flex items-center gap-4'>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
