import type { TsDatetime } from "~/types/types";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export type Order = {
  id: number;
  status: OrderStatus;
  totalPrice: string;
  createdAt: TsDatetime;
  orderStatusId: number;
}

export type OrderItem = {
  id: number;
  quantity: number;
  orderId: number;
  order: OrderStatus;
  menuItemId: number;
  menuItem: MenuItem;
}

export type OrderStatus = {
  id: number;
  name: string;
}
