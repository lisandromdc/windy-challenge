import React, { createContext, useContext, useMemo, useState } from 'react';
// types
import type { MenuItem } from '~/types/models';
import type { MenuItemAndQuantity } from '~/types/types';

type CartContextType = {
  menuItemsAndQuantities: MenuItemAndQuantity[];
  cartTotal: number;
  addToCart: (menuItem: MenuItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItemsAndQuantities, setMenuItemsAndQuantities] = useState<MenuItemAndQuantity[]>([]);

  // Computed total price
  const cartTotal = useMemo(
    () =>
      menuItemsAndQuantities.reduce(
        (total, item) => total + item.menuItem.price * item.quantity,
        0
      ),
    [menuItemsAndQuantities]
  );

  // Add item to cart
  const addToCart = (menuItem: MenuItem) => {
    setMenuItemsAndQuantities((prev) => {
      const existingItem = prev.find((item) => item.menuItem.id === menuItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    setMenuItemsAndQuantities((prev) =>
      prev.map((item) =>
        item.menuItem.id === id ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setMenuItemsAndQuantities((prev) => prev.filter((item) => item.menuItem.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setMenuItemsAndQuantities([]);
  };

  return (
    <CartContext.Provider value={{ menuItemsAndQuantities, cartTotal, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
