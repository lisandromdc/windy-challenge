import cart from './messages/cart.i18n';
import footer from './messages/footer.i18n';
import global from './messages/global.i18n';
import menu from './messages/menu.i18n';
import myLastOrder from './messages/my-last-order.i18n';
import notFound from './messages/not-found.i18n';
import notificationStatus from './messages/notification-status.i18n';
import routes from './messages/routes.i18n';

let lang = 'es';
if (typeof window !== "undefined") {
  lang = localStorage.getItem('lang') || 'es';
}


const messages = {
  es: {
    cart: cart.es,
    footer: footer.es,
    global: global.es,
    menu: menu.es,
    myLastOrder: myLastOrder.es,
    notFound: notFound.es,
    notificationStatus: notificationStatus.es,
    routes: routes.es,
  },
  en: {
    cart: cart.en,
    footer: footer.en,
    global: global.en,
    menu: menu.en,
    myLastOrder: myLastOrder.en,
    notFound: notFound.en,
    notificationStatus: notificationStatus.en,
    routes: routes.en,
  },
} as const;

export type I18nFile = keyof typeof messages.en ;

export type I18nProp = {
  [key in I18nFile]: keyof (typeof messages.en)[key];
};

export function defineI18n<F extends I18nFile>(file: F) {
  return (prop: I18nProp[F]) => getMessage(file, prop);
}

function getMessage<F extends I18nFile>(file: F, prop: I18nProp[F]) {
  return messages[lang][file][prop];
}
