export const ROUTES = {
  MENU: '/menu',
  CART: '/cart',
  MY_LAST_ORDER: '/my-last-order',
} as const;

export const ORDER_STATUS_IDS = {
  PENDING: 1,
  IN_PROGRESS: 2,
  DELIVERED: 3,
};

export const BACKEND_API = 'http://localhost:3000/api';
export const BACKEND_WEB_SOCKETS = 'http://localhost:4000';
