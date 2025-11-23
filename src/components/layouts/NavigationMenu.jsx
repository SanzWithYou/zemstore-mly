import { NavLink } from 'react-router';
import { navLinks } from './data/NavLinks';

export default function NavigationMenu() {
  return (
    <div className='hidden md:flex items-center gap-4 select-none'>
      {navLinks.map((menu) => (
        <NavLink
          key={menu.to}
          to={menu.to}
          className={({ isActive }) =>
            `
            group relative px-1 py-0.5 text-sm font-medium transition-colors
            ${
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }
          `
          }
        >
          {({ isActive }) => (
            <>
              {menu.label}

              {/* Underline animation */}
              <span
                className={`
                  absolute left-0 -bottom-1 h-0.5 w-full bg-primary rounded-full
                  transition-all duration-300 origin-left

                  ${isActive ? 'scale-x-100' : 'scale-x-0'}
                  group-hover:scale-x-100
                `}
              />
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
