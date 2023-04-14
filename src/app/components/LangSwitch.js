import { createElement } from "../../main/render";

const LANGS = {
  ru: 'RU',
  en: 'EN',
};

export const LangSwitch = ({ lang, onChange }) => (
  <div className="lang-switch">
    {Object.keys(LANGS).map(langKey => (
      <div 
        className={`lang-switch__lang ${langKey === lang ? 'active' : ''}`}
        onClick={() => onChange(langKey)}
      >{LANGS[langKey]}</div>
    ))}
  </div>
);