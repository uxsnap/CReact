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
  },
  { 
    src: "https://codesandbox.io/embed/state-tn10ll?fontsize=14&hidenavigation=1&theme=dark",
    title: "Adding state"
  },
  {
    src: "https://codesandbox.io/embed/props-1-7p7c7g?fontsize=14&hidenavigation=1&theme=dark",
    title: "props_1"
  },
  {
    src: "https://codesandbox.io/embed/props-2-encyc7?fontsize=14&hidenavigation=1&theme=dark",
    title: "props_2"
  },
  {
    src: "https://codesandbox.io/embed/props-3-y14vdb?fontsize=14&hidenavigation=1&theme=dark",
    title: "props_3"
  }
];


export const SandboxFrame = ({ n = 1 }) => (
  <iframe 
    {...LINKS[n]}
    style={{ width: "100%", height: "500px" }}
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
);