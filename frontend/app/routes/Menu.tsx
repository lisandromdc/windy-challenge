import { useEffect, useState } from 'react';
// i18n
import { defineI18n } from '~/i18n/i18n';
// components
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '~/components/ui/card';
// types
import type { MenuItem } from '~/types/models';
// lib
import { formatNumber } from '~/lib/utils';
import { api } from '~/lib/api';
// context
import { useCart } from '~/context/CartContext';
import { NavLink } from 'react-router';

export default function Menu() {
  const i18n = defineI18n('menu');
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const { menuItemsAndQuantities, addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('menu');
      setMenu(res);
    };

    fetchData();
  }, []);

  const addToOrder = (menuItem: MenuItem) => {
    addToCart(menuItem);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[var(--primary)]">
        { i18n('menuTitle') }
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {menu.map((menuItem) => {
          const isInCart = menuItemsAndQuantities.some(
            (item) => item.menuItem.id === menuItem.id
          );
          return (
            <Card key={menuItem.id} className="flex flex-col justify-between">
              <CardHeader className="p-2 sm:p-4">
                <img
                  src={menuItem.image || "/placeholder.svg"}
                  alt={menuItem.name}
                  width={100}
                  height={100}
                  className="w-full object-cover rounded-md mb-2"
                />
                <CardTitle className="text-sm sm:text-lg">
                  {menuItem.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {menuItem.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 pt-0">
                <p className="text-lg sm:text-xl font-bold text-[var(--primary)] text-center">
                  ${formatNumber(menuItem.price)}
                </p>
                <CardFooter className="p-2 sm:p-4 pt-0">
                  {isInCart ? (
                    <NavLink className="w-full" to="/Cart">
                      <Button className="w-full">{i18n('finishOrder')}</Button>
                    </NavLink>
                  ) : (
                    <Button onClick={() => addToOrder(menuItem)} className="w-full text-xs sm:text-sm">
                      {i18n('addToOrderBtn')}
                    </Button>
                  )}
                </CardFooter>
              </CardContent>
            </Card>
          )}
        )}
      </div>
    </div>
  )
}

