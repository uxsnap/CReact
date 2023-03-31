/**
 * we need to update dom according to the changes
 * made in vdom
 * Here we list all the possible scenarios of
 * reconciliation
 * text/node -> null/undefined/false - full rerender
 * text -> text - need to check if the texts
 * are same or not, then rerender or not
 * node -> text - full rerender
 * node -> node - need to check if the nodes
 * are tags. If they're not - full rerender
 * of the node and all of its children (can be optimized)
 * component -> component - it will handled with another function
*/

import { __LOG, getDerivedStateFromProps } from "../helpers";
import { render, setProp } from "./render";
import { Component } from "./component";

const NODE_TYPES = {
  NODE: 1,
  TEXT: 3
};

const replace = (parent) => {
  return parent
    ? (oldN, newN) => {
        parent.replaceChild(newN, oldN);
        __LOG("REPLACED IN PARENT: ", parent);
        return newN;
      }
    : (_, newN) => {
        __LOG("RETURNED: ", newN);
        return newN;
      };
};

/**
 *
 * @param {VDomObject} vdom
 * @param {DomNode} dom
 * @param {DomNode} parent
 */
export const reconcile = (vdom, dom, parent) => {
  const innerReplace = replace(parent);

  if (typeof vdom === "object" && typeof vdom.type === "function") {
    return reconcileComponent(vdom, dom, parent);
  }

  if (dom.nodeType === NODE_TYPES.TEXT) {
    if (vdom != null && vdom.toString() === dom.textContent) {
      __LOG("RECONCILIATION OF TEXT WITH SAME VALUE: " + dom.nodeValue);
      return dom;
    } else {
      __LOG("RECONCILIATION OF TEXT: " + dom.nodeValue);
      __LOG("TO TEXT: " + vdom);
    }
    return innerReplace(dom, render(vdom, parent));
  }

  if (dom.nodeType === NODE_TYPES.NODE) {
    if (vdom == null || !vdom.type) {
      return innerReplace(dom, render(vdom, parent));
    }

    if (
      typeof vdom.type === "string" &&
      dom.tagName.toLowerCase() !== vdom.type
    ) {
      return innerReplace(dom, render(vdom, parent));
    }

    if (
      typeof vdom.type === "string" &&
      dom.tagName.toLowerCase() === vdom.type
    ) {
      const newProps = vdom.props;
      const curChildNodes = {};

      Array.from(dom.childNodes).flat().forEach((child, ind) => curChildNodes[child.__key || `___key__${ind}__`] = child);

      for (const attr of dom.getAttributeNames()) dom.removeAttribute(attr);
      for (const event in dom.__eventHandlers || {}) {
        dom.removeEventListener(event, dom.__eventHandlers[event]);
        dom.__eventHandlers[event] = null;
      }

      for (const prop in newProps) setProp(dom, prop, newProps[prop]);
      
      vdom.children.flat().forEach((child, ind) => {
        let key = (child && child.props || {}).key || `___key__${ind}__`;
        __LOG(curChildNodes, key);

        if (key in curChildNodes) {
          reconcile(child, curChildNodes[key], dom);
          __LOG("RECONCILED OLD CHILD WITH THE SAME KEY", key);
          delete curChildNodes[key];
        }
        else {
          dom.insertBefore(render(child, dom), dom.childNodes[ind]);
          __LOG("INSERTED NEW CHILD TO DOM");
        }
      });

      for (let key in curChildNodes) curChildNodes[key].remove();

      return dom;
    }
  }
};

/**
 *
 * @param {VDomObject} vdom
 * @param {DomNode} dom
 * @param {DomNode} parent
 */
export const reconcileComponent = (vdom, dom, parent) => {
  const props = Object.assign({}, vdom.props, {
    children: vdom.children.flat()
  });
  if (vdom.type.prototype instanceof Component) {
    return reconcileClassComponent(vdom, dom, parent, props);
  } else {
    return reconcile(new vdom.type(props), dom, parent);
  }
};

export const reconcileClassComponent = (vdom, dom, parent, newProps) => {
  if (
    dom.__instance &&
    dom.__instance.constructor === vdom.type.prototype.constructor
  ) {
    getDerivedStateFromProps(vdom, dom.__instance);
    dom.__instance.props = newProps;

    if (!dom.__instance.shouldComponentUpdate(newProps, dom.__instance.state)) {
      return dom;
    }

    return reconcile(dom.__instance.render(), dom, parent);
  } else {
    return render(vdom, parent);
  }
};
