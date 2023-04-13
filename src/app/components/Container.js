import { createElement } from "../../main/render";

export const Container = ({ children, className = '', ref = undefined }) => {
  return (
    <div className={`container ${className}`} ref={ref}>{children}</div>
  );
};