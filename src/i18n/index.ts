import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';

import en from './resources/en.json';
import ru from './resources/ru.json';

export const resources = {
  en,
  ru,
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    //lng: 'en',
    lowerCaseLng: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'en',
  });

export default i18n;

export const languageList = {
  en: 'EN – English',
  ru: 'RU – Русский',
};
