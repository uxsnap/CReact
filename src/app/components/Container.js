import { createElement } from "../../main/render";

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`container ${className}`}>{children}</div>
  );
};