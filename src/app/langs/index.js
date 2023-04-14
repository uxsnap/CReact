import en from './en';
import ru from './ru';

const langMap = { en, ru };

export const getLang = (lang) => {
  return langMap[lang];
};