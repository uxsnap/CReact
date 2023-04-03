import { createElement } from "../../main/render";

export const Paragraph = ({ children, className = '' }) => <p className={`paragraph ${className}`}>{children}</p>