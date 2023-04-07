import { createElement } from "../../main/render";

export const List = ({ items }) => (
  <ol className="list">
    {items.map(item => (
      <li className="list__item">
        {item}
      </li>
    ))}
  </ol>
);

