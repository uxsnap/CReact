import { escapeHtml } from '../utils';

export const RENDER_1 = escapeHtml(`render(<App />, document.getElementById('app'));`);
export const FROM_TO_TYPES = `number -> TextNode 
string -> TextNode 
boolean -> TextNode 
falsy value -> Empty string 
tag -> DomNode 
`;

export const MOUNT_1 = `const mount = (parent) => (dom) => {
  if (parent) parent.appendChild(dom);

  return dom;
};`;

export const RENDER_2 =
`export const render = (vdom, parent) => {
  const type = typeof vdom;
  
  const innerMount = mount(parent);

  if (vdom == null || Number.isNaN(vdom)) {
    return innerMount(document.createTextNode(""));
  }

  if (["string", "number", "boolean"].includes(type)) {
    const text = document.createTextNode(
      type === "boolean" && !vdom ? "" : vdom
    );

    return innerMount(text);
  }

  if (type === "object") {
    if (!vdom.type) {
      return innerMount(
        document.createTextNode(
          vdom.toString()
        )
      );
    }

    const dom = document.createElement(vdom.type);
      
    for (let prop in vdom.props) {
      setProp(dom, prop, vdom.props[prop]);
    }

    for (let child of vdom.children.flat()) {
      render(child, dom);
    }
    
    return innerMount(dom);
  }

  return document.createTextNode("Error");
};`;


export const SET_PROP_1 = `export const setProp = (dom, key, value) => {
  if (key === "style") {
    Object.assign(dom.style, value);
    return; 
  } 
  
  if (key.startsWith('on')) {
    setEventListener(dom, key, value);
    return; 
  }
  
  if (value !== undefined) {
    dom.setAttribute(key, value);
  }
};

const setEventListener = (dom, key, value) => {
  const event = key.slice(2,).toLowerCase();
  
  dom.__eventHandlers = dom.__eventHandlers || {};
  dom.__eventHandlers[event] = value;
  dom.addEventListener(event, dom.__eventHandlers[event]);
};
`;

export const RENDER_TEST_1 = escapeHtml(`export const renderTests = [
  5,
  6,
  123123,
  "hey there fella",
  \`template strings \${5555}\`,
  null,
  undefined,
  true,
  false,
  { a: { b: { c: "d" } } },
  [1, 2, 3, 4, 5],
  <ul>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ul>,
  <ul>
    <li>{true}</li>
    <li>{false}</li>
    <li>{5673}</li>
    <li>{"Heheh"}</li>
    <li>{null}</li>
    <li>
      <p>Inner {5}</p>
    </li>
  </ul>,
];`);