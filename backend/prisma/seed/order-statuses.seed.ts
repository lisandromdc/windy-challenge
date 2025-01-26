// constants
import { ORDER_STATUS_IDS } from '@/constants/constants';

export const orderStatusesSeed = [
  {
    id: ORDER_STATUS_IDS.PENDING,
    name: 'Pendiente',
  },
  {
    id: ORDER_STATUS_IDS.IN_PROGRESS,
    name: 'En preparación',
  },
  {
    id: ORDER_STATUS_IDS.DELIVERED,
    name: 'Listo',
  },
];
