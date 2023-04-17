import { createElement } from "../../main/render";
import { Icon } from "./Icon";

export const IconLink = ({ href, name }) => (
  <a href={href} className="icon-link">
    <Icon name={name} />
  </a>
);