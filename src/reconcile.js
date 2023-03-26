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
        console.log("REPLACED IN PARENT: ", parent);
        return newN;
      }
    : (_, newN) => {
        console.log("RETURNED: ", newN);
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
      console.log("RECONCILIATION OF TEXT WITH SAME VALUE: " + dom.nodeValue);
      return dom;
    } else {
      console.log("RECONCILIATION OF TEXT: " + dom.nodeValue);
      console.log("TO TEXT: " + vdom);
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

      const curChildNodes = [];

      Array.from(dom.childNodes)
        .flat()
        .forEach((child, ind) => {
          curChildNodes[ind] = child;
        });

      for (const attr of dom.attributes) {
        dom.removeAttribute(attr);
      }
      for (const prop in newProps) {
        setProp(dom, prop, newProps[prop]);
      }

      vdom.children.flat().forEach((child, ind) => {
        if (curChildNodes[ind]) {
          reconcile(child, curChildNodes[ind], dom);
          // dom.childNodes[ind] = childNode;
        } else {
          dom.appendChild(render(child, dom));
        }
      });

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
    dom.__instance.props = newProps;
    return reconcile(dom.__instance.render(), dom, parent);
  } else {
    return render(vdom, parent);
  }
};
