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

import { __LOG, getDerivedStateFromProps, NODE_TYPES } from "../helpers";
import { render, setProp } from "./render";
import { Component } from "./component";
import { currentlyRenderingComponent, INSTANCE_MAP } from './hooks';

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
export const reconcile = (vdom, dom, parent = dom.parentNode) => {
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
      __LOG("TO OBJECT: " + vdom);
      
      return innerReplace(dom, render(vdom, parent))
    }
  }

  if (dom.nodeType === NODE_TYPES.NODE) {
    if (vdom == null || !vdom.type || typeof vdom === 'string') {
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

      Array
      .from(dom.childNodes)
      .flat()
      .forEach((child, ind) => {
        const key = child && child.__key ? child.__key : `___key__${ind}__`;
        
        curChildNodes[key] = child
      });

      for (const attr of dom.getAttributeNames()) dom.removeAttribute(attr);
      for (const event in dom.__eventHandlers || {}) {
        dom.removeEventListener(event, dom.__eventHandlers[event]);
        dom.__eventHandlers[event] = null;
      }

      for (const prop in newProps) setProp(dom, prop, newProps[prop]);
      
      vdom.children.flat().forEach((child, ind) => {
        const props = child && child.props ? child.props : {};
        let key = props.key || `___key__${ind}__`;

        __LOG(curChildNodes, key);
        
        if (key in curChildNodes) {
          __LOG("RECONCILED OLD CHILD WITH THE SAME KEY", key);
          reconcile(child, curChildNodes[key]);
        } else {
          __LOG("INSERTED NEW CHILD TO DOM");
          dom.appendChild(render(child, dom));
        }
        
        delete curChildNodes[key];
      });
      
      for (let key in curChildNodes) {
        if (curChildNodes[key].__instance) {
          curChildNodes[key].__instance.componentWillUnmount();
        }

        if (curChildNodes[key].__funcInstance) {
          INSTANCE_MAP.delete(curChildNodes[key].__token);
        }

        curChildNodes[key].remove();
      }

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
    return reconcileFunctionComponent(vdom, dom, parent, props);
  }
};

export const reconcileFunctionComponent = (vdom, dom, parent, newProps) => {
  if (
    dom.__funcInstance &&
    dom.__funcInstance.type.prototype.constructor === vdom.type.prototype.constructor
    ) {
    currentlyRenderingComponent.stateHookIndex = 0;
    currentlyRenderingComponent.effectHookIndex = 0;
    currentlyRenderingComponent.current = dom.__token;

    dom.__funcInstance.props = newProps;

    return reconcile(dom.__funcInstance.type(newProps), dom, parent);
  } else {
    return replace(parent)(dom, render(vdom, parent));
  }
};

export const reconcileClassComponent = (vdom, dom, parent, newProps) => {
  if (
    dom.__instance &&
    dom.__instance.constructor === vdom.type.prototype.constructor
  ) {
    getDerivedStateFromProps(vdom, dom.__instance);
    
    const prevProps = dom.__instance.props;
    dom.__instance.props = newProps;

    const snapshot = dom.__instance.getSnapshotBeforeUpdate(prevProps, dom.__instance.state);
    
    if (!dom.__instance.shouldComponentUpdate(newProps, dom.__instance.state)) {
      return dom;
    }
    
    const updated = reconcile(dom.__instance.render(), dom, parent);
    
    dom.__instance.componentDidUpdate(prevProps, dom.__instance.state, snapshot);

    return updated;
  } else {
    return replace(parent)(dom, render(vdom, parent));
  }
};
