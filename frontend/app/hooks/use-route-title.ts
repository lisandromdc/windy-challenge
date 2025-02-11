import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// i18n
import { defineI18n } from "~/i18n/i18n";

const i18n = defineI18n('routes');
const i18nGlobal = defineI18n('global');

const useRouteTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const i18nKeyMap = {
      '/menu': 'menu',
      '/cart': 'cart',
      '/my-last-order': 'myLastOrder',
    } as const;
    const routeTitle = i18nKeyMap[location.pathname as keyof typeof i18nKeyMap];
    document.title = `${i18n(routeTitle)} | ${i18nGlobal('appName')}`;
  }, [location.pathname]);
};

export default useRouteTitle;
