import { Component } from "./component";
import { getDerivedStateFromProps } from "../helpers";

export const createElement = (type, props, ...children) => ({
  type,
  props: props || {},
  children
});

export const Fragment = (props) => {
  const children = props.children;
  delete props.children;
  return createElement("__fragment", props, ...children);
};

const mount = (parent) => (dom) => {
  if (parent) parent.appendChild(dom);

  return dom;
};

export const render = (vdom, parent) => {
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
      return innerMount(renderComponent(vdom, parent));
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
};

export const renderComponent = (vdom, parent) => {
  const props = Object.assign({}, vdom.props, {
    children: vdom.children.flat()
  });

  if (vdom.type.prototype instanceof Component) {
    const component = new vdom.type(props);

    getDerivedStateFromProps(vdom, component);

    component.__dom = render(component.render(), parent);
    component.__dom.__instance = component;

    component.componentDidMount();

    return component.__dom;
  } else {
    const component = vdom.type(props);

    return render(component, parent);
  }
};

export const setProp = (dom, key, value) => {
  if (key === "value") {
    dom[key] = value;
    return;
  }

  if (key === "style") {
    Object.assign(dom.style, value);
    return;
  }

  if (key.startsWith("on")) {
    setEventListener(dom, key, value);
    return;
  }

  if (value !== undefined) {
    dom.setAttribute(key, value);
  }
};

const setEventListener = (dom, key, value) => {
  const event = key.slice(2).toLowerCase();

  dom.__eventHandlers = dom.__eventHandlers || {};
  dom.__eventHandlers[event] = value;
  dom.addEventListener(event, dom.__eventHandlers[event]);
};
