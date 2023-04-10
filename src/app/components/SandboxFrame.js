import { createElement } from "../../main/render";

const LINKS = [
  null,
  {
    src: "https://codesandbox.io/embed/basic-rendering-721pjg?fontsize=14&hidenavigation=1&theme=dark",
    title: "Basic rendering"
  },
  {
    src: "https://codesandbox.io/embed/basic-reconciliation-qeo3w1?fontsize=14&hidenavigation=1&theme=dark",
    title: "Basic reconciliation"
  },
  {
    src: "https://codesandbox.io/embed/components-8871e1?fontsize=14&hidenavigation=1&theme=dark",
    title: "Handling components"
  }
];


export const SandboxFrame = ({ chapter = 1 }) => (
  <iframe 
    {...LINKS[chapter]}
    style={{ width: "100%", height: "500px" }}
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
);