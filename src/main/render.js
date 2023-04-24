import { Component } from "./component";
import { __RERENDER_HELPER, getDerivedStateFromProps } from '../helpers';
import { currentlyRenderingComponent, INSTANCE_MAP } from './hooks';

export const createElement = (type, props, ...children) => ({
  type,
  props: props || {},
  children
});

export const Fragment = (props) => {
  const children = props.children;
  delete props.children;
  return createElement('__fragment', props, ...children);
}

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

export let RENDER_INDEX = 0;

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
export const renderComponent = (vdom, parent, removeOutlineTime = 100) => {
  const props = Object.assign({}, vdom.props, { children: vdom.children.flat() });

  if (vdom.type.prototype instanceof Component) {
    const component = new vdom.type(props);

    getDerivedStateFromProps(vdom, component);

    component.__dom = render(component.render(), parent, removeOutlineTime);
    component.__dom.__key = (props && props.key) || undefined;
    component.__dom.__instance = component;
    
    component.componentDidMount();

    return component.__dom;
  } else {
    const instanceToken = (vdom.type.name || 'Anonymous') + RENDER_INDEX++;

    currentlyRenderingComponent.current = instanceToken;
    currentlyRenderingComponent.stateHookIndex = 0;
    currentlyRenderingComponent.effectHookIndex = 0;

    if (!INSTANCE_MAP.has(instanceToken)) {
      INSTANCE_MAP.set(instanceToken, {
        __states: [],
        __effects: []
      });
    }

    const curInstanceItem = INSTANCE_MAP.get(instanceToken);

    const component = vdom.type(props);
    
    curInstanceItem.__dom = render(component, parent, removeOutlineTime);
    curInstanceItem.__dom.__funcInstance = vdom;
    curInstanceItem.__dom.__token = instanceToken;
    curInstanceItem.__dom.__key = (props && props.key) || undefined;

    return curInstanceItem.__dom;
  }
};

/**
 * @param {VDomObject} vdom - node to be rendered
 * @param {DomNode} parent - node to be applied
 * @param {Object} options
 * All the creations of the elements will go
 * in render function
 */
export const render = (vdom, parent, removeOutlineTime = undefined) => {
  const type = typeof vdom;
  const newRemoveOutline = removeOutlineTime ? removeOutlineTime + 100 : 0;
  
  const innerMount = mount(parent);

  if (vdom == null || Number.isNaN(vdom)) {
    return innerMount(document.createTextNode(""));
  }

  if (["string", "number", "boolean"].includes(type)) {
    const text = document.createTextNode(
      type === "boolean" && !vdom ? "" : vdom
    );

    return innerMount(text, newRemoveOutline);
  }

  if (type === "object") {
    if (!vdom.type) return innerMount(document.createTextNode(vdom.toString()), newRemoveOutline);

    if (typeof vdom.type === "function") {
      return innerMount(
        renderComponent(vdom, parent, newRemoveOutline), newRemoveOutline
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
      render(child, dom, newRemoveOutline);
    }
    
    return innerMount(dom, newRemoveOutline);
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
  if (key === 'dangerouslySetInnerHTML' && !!value && !!value.__html) {
    dom.innerHTML = value.__html;
    return;
  }

  if (key === 'value') {
    dom[key] = value;
    dom.setAttribute(key, value);
    return;
  }

  if (['checked', 'className'].includes(key)) {
    dom[key] = value;
    return;
  }

  if (key === 'ref' && value) {
    if (typeof value === "function") {
      value(dom);
      return;
    }

    value.current = dom;
    return;
  }

  if (key === "key") {
    dom.__key = value;
    return; 
  }

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

/**
 *
 * @param {DomNode} dom
 * @param {string} key
 * @param {any} value
 * Helper function to set event listener
 */
const setEventListener = (dom, key, value) => {
  let event = key.slice(2,).toLowerCase();

  if (event === 'change') {
    event = 'input';
  }
  
  dom.__eventHandlers = dom.__eventHandlers || {};
  dom.__eventHandlers[event] = value;
  dom.addEventListener(event, dom.__eventHandlers[event]);
};