import api from './api.i18n';
import menu from './menu.i18n';
import orders from './orders.i18n';

const lang = 'es';

const messages = {
  es: {
    api: api.es,
    menu: menu.es,
    orders: orders.es,
  },
  en: {
    api: api.en,
    menu: menu.en,
    orders: orders.en,
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
