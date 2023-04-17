export const RENDER_3 = `export const render = (vdom, parent) => {
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
    if (!vdom.type) return innerMount(document.createTextNode(vdom.toString()));

    if (typeof vdom.type === "function") {
      return innerMount(
        renderComponent(vdom, parent)
      );
    }

    const isFragment = vdom.type === "__fragment";
    const dom = isFragment
      ? document.createDocumentFragment()
      : document.createElement(vdom.type);

    if (!isFragment) {
      for (let prop in vdom.props) setProp(dom, prop, vdom.props[prop]);
    }

    for (let child of vdom.children.flat()) {
      render(child, dom);
    }
    
    return innerMount(dom);
  }

  return document.createTextNode("Error");
};`;

export const RENDER_COMPONENT_1 = `export const renderComponent = (vdom, parent) => {
  const props = Object.assign({}, vdom.props, { children: vdom.children.flat() });

  if (vdom.type.prototype instanceof Component) {
    const component = new vdom.type(props);

    component.__dom = render(component.render(), parent);
    component.__dom.__instance = component;
    
    return component.__dom;
  } else {
    const component = vdom.type(props);

    return render(component, parent);
  }
};`

export const FRAGMENT_1 = `export const Fragment = (props) => {
  const children = props.children;
  delete props.children;
  return createElement('__fragment', props, ...children);
}
`;
export const RECONCILE_4 = `export const reconcile = (vdom, dom, parent = dom.parentNode) => {
  const innerReplace = replace(parent);

  if (typeof vdom === "object" && typeof vdom.type === "function") {
    return reconcileComponent(vdom, dom, parent);
  }

  if (dom.nodeType === NODE_TYPES.TEXT) {`;

export const RECONCILE_5 = `export const reconcileComponent = (vdom, dom, parent) => {
  const props = Object.assign({}, vdom.props, {
    children: vdom.children.flat()
  });

  if (vdom.type.prototype instanceof Component) {
    return reconcileClassComponent(vdom, dom, parent, props);
  } else {
    return reconcile(vdom.type(props), dom, parent);
  }
};`;

export const RECONCILE_6 = `export const reconcileClassComponent = (vdom, dom, parent, newProps) => {
  if (
    dom.__instance &&
    dom.__instance.constructor === vdom.type.prototype.constructor
  ) {
    dom.__instance.props = newProps;

    const updated = reconcile(dom.__instance.render(), dom, parent);
    
    return updated;
  } else {
    return replace(parent)(dom, render(vdom, parent));
  }
};`

export const COMPONENT_1 = `export class Component {
  constructor(props) {
    this.__dom = null;
    
    this.props = props || {};
  }
}`