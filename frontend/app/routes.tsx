import { type RouteConfig, route, layout } from "@react-router/dev/routes";
// constants
import { ROUTES } from './constants/constants';

export default [
  layout("./layouts/MainLayout.tsx", [
    route(ROUTES.MENU, './routes/Menu.tsx'),
    route(ROUTES.CART, './routes/Cart.tsx'),
    route(ROUTES.MY_LAST_ORDER, './routes/MyLastOrder.tsx'),
    route('/*', './routes/NotFound.tsx'),
  ]),
] satisfies RouteConfig;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
