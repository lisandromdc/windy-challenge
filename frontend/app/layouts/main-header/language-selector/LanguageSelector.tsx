import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
// components
import { Button } from '~/components/ui/button';
// constants
import { ORDER_STATUS_IDS, ROUTES } from '~/constants/constants';
// hooks
import useOrderUpdates from '~/hooks/use-order-updates';
// i18n
import { defineI18n } from '~/i18n/i18n';

export type Lang = 'es' | 'en';

export default function RootLayout() {
const i18nGlobal = defineI18n('global');
const [selectedLanguage, setSelectedLanguage] = useState<Lang>('es');

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
      setSelectedLanguage(lang as Lang);
    } else {
      localStorage.setItem('lang', selectedLanguage);
    }
  }, []);

  const updateLang = (lang: Lang) => {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-gray-400 text-xs">
        {i18nGlobal('lang')}
      </span>
      {selectedLanguage === 'en' && <div onClick={() => updateLang('es')}>
        <img height={20} className="h-[1.5rem] rounded-md cursor-pointer" src="https://lisandrodc.com//images/languaje-english.jpg" />
      </div>}
      {selectedLanguage !== 'en' && <div onClick={() => updateLang('en')}>
        <img height={20} className="h-[1.5rem] rounded-md cursor-pointer" src="https://lisandrodc.com//images/languaje-spanish.jpg" />
      </div>}
    </div>
  )
}
