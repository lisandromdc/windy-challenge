import { z } from 'zod';
// i18n
import { defineI18n } from '@/i18n/i18n';

const i18n = defineI18n('orders');

const MenuItemIdsAndQuantities = z.object({
  quantity: z.number().min(0, { message: i18n('validateQuantity') }),
  menuItemId: z.number().min(0, { message: i18n('validateMenuItemId') }),
});
export const CreateOrderSchema = z.object({
  menuItemIdsAndQuantities: z.array(MenuItemIdsAndQuantities).nonempty({
    message: i18n('validateMenuItemIds'),
  }),
});
