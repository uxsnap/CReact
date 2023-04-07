import { createElement } from "../../main/render";

export const Paragraph = ({ children, className = '', noMargin = false }) => (
  <p className={`paragraph ${className} ${noMargin ? 'no-margin' : ''}`}>{children}</p>
);