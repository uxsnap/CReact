import { createElement } from "../../main/render";

const LINKS = [
  null,
  {
    src: "https://codesandbox.io/embed/basic-rendering-721pjg?fontsize=14&hidenavigation=1&theme=dark",
    title: "Basic rendering"
  }
];

export const SandboxFrame = ({ chapter = 1 }) => (
  <iframe 
    {...LINKS[chapter]}
    style={{ width: "100%", height: "500px" }}
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
);