import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router';
// components
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import LanguageSelector from './language-selector/LanguageSelector';
// constants
import { ROUTES } from '~/constants/constants';
// i18n
import { defineI18n } from '~/i18n/i18n';

const i18nRoutes = defineI18n('routes');
const i18nGlobal = defineI18n('global');

const navItems = [
  { href: ROUTES.MENU, label: i18nRoutes('menu') },
  { href: ROUTES.CART, label: i18nRoutes('cart') },
  { href: ROUTES.MY_LAST_ORDER, label: i18nRoutes('myLastOrder') },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-300 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to={ROUTES.MENU} className="text-3xl font-bold text-blue-500">
          {i18nGlobal('appName')}
        </NavLink>
        <ul className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                // className="hover:text-gray-300"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-500"
                }>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <LanguageSelector />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-0 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="block px-2 py-1 text-lg hover:text-[var(--primary)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

