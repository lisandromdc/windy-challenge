import { z } from 'zod';
// i18n
import { defineI18n } from '@/i18n/i18n';

const i18n = defineI18n('menu');

export const CreateMenuItemSchema = z.object({
  name: z.string().min(1, { message: i18n('validateName') }),
  description: z.string().min(1, { message: i18n('validateDescription') }),
  price: z.number().min(0, { message: i18n('validatePrice') }),
  image: z.string().url({ message: i18n('validateImage') }),
});
