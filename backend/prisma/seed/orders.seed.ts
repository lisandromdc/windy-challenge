// constants
import { ORDER_STATUS_IDS } from '@/constants/constants';

export const ordersSeed = [
  {
    id: 1,
    totalPrice: 52000,
    createdAt: '2025-01-20',
    orderStatusId: ORDER_STATUS_IDS.DELIVERED,
    menuItems: [
      { quantity: 1, menuItemId: 1 },
      { quantity: 4, menuItemId: 2 },
      { quantity: 1, menuItemId: 3 },
      { quantity: 2, menuItemId: 4 },
    ],
  },
  {
    id: 2,
    totalPrice: 33000,
    createdAt: '2025-01-22',
    orderStatusId: ORDER_STATUS_IDS.IN_PROGRESS,
    menuItems: [
      { quantity: 2, menuItemId: 1 },
      { quantity: 3, menuItemId: 4 },
    ],
  },
  {
    id: 3,
    totalPrice: 5200,
    createdAt: '2025-01-25',
    orderStatusId: ORDER_STATUS_IDS.PENDING,
    menuItems: [
      { quantity: 1, menuItemId: 3 },
    ],
  },
];
