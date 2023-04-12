import { render, setProp } from "./render";
import { NODE_TYPES } from "../helpers";
import { Component } from "./component";
import { getDerivedStateFromProps } from "../helpers";

function replace(parent) {
  return parent
    ? (oldN, newN) => {
        parent.replaceChild(newN, oldN);
        return newN;
      }
    : (_, newN) => {
        return newN;
      };
}

export const reconcile = (vdom, dom, parent = dom.parentNode) => {
  const innerReplace = replace(parent);

  if (typeof vdom === "object" && typeof vdom.type === "function") {
    return reconcileComponent(vdom, dom, parent);
  }

  if (dom.nodeType === NODE_TYPES.TEXT) {
    if (vdom != null && vdom.toString() === dom.textContent) {
      return dom;
    } else {
      return innerReplace(dom, render(vdom, parent));
    }
  }

  if (dom.nodeType === NODE_TYPES.NODE) {
    if (vdom == null || !vdom.type || typeof vdom === "string") {
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

      Array.from(dom.childNodes)
        .flat()
        .forEach(
          (child, ind) =>
            (curChildNodes[`${ind}__${child ? child.nodeType : child}`] = child)
        );

      for (const attr of dom.getAttributeNames()) dom.removeAttribute(attr);
      for (const event in dom.__eventHandlers || {}) {
        dom.removeEventListener(event, dom.__eventHandlers[event]);
        dom.__eventHandlers[event] = null;
      }

      for (const prop in newProps) setProp(dom, prop, newProps[prop]);

      vdom.children.flat().forEach((child, ind) => {
        if (`${ind}__${child ? child.nodeType : child}` in curChildNodes) {
          reconcile(child, curChildNodes[ind], dom);
          delete curChildNodes[ind];
        } else {
          dom.insertBefore(render(child, dom), dom.childNodes[ind]);
        }
      });

      for (let ind in curChildNodes) {
        if (curChildNodes[ind].__instance) {
          curChildNodes[ind].__instance.componentWillUnmount();
        }
        curChildNodes[ind].remove();
      }

      return dom;
    }
  }
};

export const reconcileComponent = (vdom, dom, parent) => {
  const props = Object.assign({}, vdom.props, {
    children: vdom.children.flat()
  });

  if (vdom.type.prototype instanceof Component) {
    return reconcileClassComponent(vdom, dom, parent, props);
  } else {
    return reconcile(vdom.type(props), dom, parent);
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

    const snapshot = dom.__instance.getSnapshotBeforeUpdate(
      prevProps,
      dom.__instance.state
    );

    if (!dom.__instance.shouldComponentUpdate(newProps, dom.__instance.state)) {
      return dom;
    }

    const updated = reconcile(dom.__instance.render(), dom, parent);

    dom.__instance.componentDidUpdate(
      prevProps,
      dom.__instance.state,
      snapshot
    );

    return updated;
  } else {
    return render(vdom, parent);
  }
};
