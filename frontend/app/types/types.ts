import type { MenuItem } from './models';

export type TsDate = string | null;
export type TsDatetime = string | null;
export type MenuItemAndQuantity = {
  menuItem: MenuItem;
  quantity: number;
}