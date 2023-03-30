import { Component } from "./component";
import { __RERENDER_HELPER } from '../helpers';

export const createElement = (type, props, ...children) => ({
  type,
  props: props || {},
  children
});

// what we want to render
/**
 *
 * number - 5, 6
 * string - "What a wonderful day"
 * boolean - true or false
 * undefined, null - empty string
 * jsx - recursive with children
 * functional components
 * class components
 */

/**
 *
 * @param {DomNode} parent
 * We just need to append child to the dom when it has parent
 * When it doesn't have one it appears that the child itself is a parent (root component)
 */
const mount = (parent) => (dom, removeOutlineTime) => {
    if (parent) {
      __RERENDER_HELPER(dom, removeOutlineTime);

      parent.appendChild(dom);
    }

    return dom;
  };

/**
 *
 * @param {VDomObject} vdom
 * @param {DomNode} parent
 */
export const renderComponent = (vdom, parent) => {
  const props = Object.assign({}, vdom.props, { children: vdom.children });

  if (vdom.type.prototype instanceof Component) {
    const component = new vdom.type(props);
    component.__dom = render(component.render(), parent);
    component.__dom.__key = props.key || undefined;
    component.__dom.__instance = component;

    return component.__dom;
  } else {
    const component = new vdom.type(props);
    component.props.key = props.key || undefined;
    return render(component, parent);
  }
};

/**
 * @param {VDomObject} vdom - node to be rendered
 * @param {DomNode} parent - node to be applied
 * @param {Object} options
 * All the creations of the elements will go
 * in render function
 */
export const render = (vdom, parent, removeOutlineTime = 300) => {
  const type = typeof vdom;

  const innerMount = mount(parent);

  if (vdom == null) {
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

    if (typeof vdom.type === "function") return innerMount(renderComponent(vdom, parent));
      
    const dom = document.createElement(vdom.type);
      
    for (let prop in vdom.props) setProp(dom, prop, vdom.props[prop]);

    for (let child of vdom.children.flat()) render(child, dom, removeOutlineTime * 2);
    
    return innerMount(dom, removeOutlineTime);
  }

  return document.createTextNode("Error");
};

/**
 *
 * @param {DomNode} dom
 * @param {string} key
 * @param {any} value
 * Helper function to set attributes and stuff to the dom
 * We start with the simple things and then add keys, refs, and other stuff
 */
export const setProp = (dom, key, value) => {
  if (key === "key") {
    return dom.__key = value;
  }
  if (key === "style") {
    return Object.assign(dom.style, value);
  } 
  if (key.startsWith('on')) {
    return setEventListener(dom, key, value);
  }
  
  return dom.setAttribute(key, value);
};

/**
 *
 * @param {DomNode} dom
 * @param {string} key
 * @param {any} value
 * Helper function to set event listener
 */
const setEventListener = (dom, key, value) => {
  const event = key.slice(2,).toLowerCase();
  
  dom.__eventHandlers = dom.__eventHandlers || {};
  dom.__eventHandlers[event] = value;
  dom.addEventListener(event, dom.__eventHandlers[event]);
};