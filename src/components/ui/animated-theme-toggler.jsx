import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { flushSync } from 'react-dom';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { useTheme } from '../theme/ThemeProvider';

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}) => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef(null);

  // Sync dark mode state
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [theme]);

  // Toggle theme with animation
  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    let nextTheme;
    if (theme === 'light') {
      nextTheme = 'dark';
    } else if (theme === 'dark') {
      nextTheme = 'system';
    } else {
      nextTheme = 'light';
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  }, [theme, duration, setTheme]);

  // Select icon based on theme
  const renderIcon = () => {
    if (theme === 'light') {
      return <Sun className='h-5 w-5' />;
    } else if (theme === 'dark') {
      return <Moon className='h-5 w-5' />;
    } else {
      return <Monitor className='h-5 w-5' />;
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {renderIcon()}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
