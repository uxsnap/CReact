import { __SHOW_LOGS } from "./constants";

export const __RERENDER_HELPER = (dom, removeOutlineTime) => {
  if (dom && dom.style && removeOutlineTime) {
    const prevOutline = dom.style.outline || '';

    dom.style.outline = '1px solid #e3e4e0';
    setTimeout(() => {
        dom.style.outline = prevOutline; 
    }, removeOutlineTime);
  }
};


export const __LOG = (text) => {
  __SHOW_LOGS && console.log(text);
};

export const __SHALLOW_COMPARE = (a, b) => {
  for (let k in a) if (a[k] !== b[k]) return false;

  return true;
};

/**
 * @param {VDomObject[]} children
 * Helper function to set event listener
 */
export const prepareChildren = (children) => {
  let finalResult = [];

  for (let i = 0; i < children.length; i++) {
    if (children.type === '__fragment') {
      finalResult = finalResult.concat(vdom.children);
    } else finalResult.push(children[i]);
  }

  return finalResult;
};