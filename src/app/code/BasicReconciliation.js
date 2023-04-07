export const SCHEMA_1 = `The schema for it:
Text -> Text == rerender if differ 
Text -> Any == full rerender`

export const SCHEMA_2 = `The schema:
Tag -> Same Tag == reconciliation of props and children
Tag -> Another Tag or Other any type == full rerender
Tag -> Something Else == full rerender`;

export const RECONCILE_1 = `const replace = (parent) => {
  return parent
    ? (oldN, newN) => {
        parent.replaceChild(newN, oldN);
        return newN;
      }
    : (_, newN) => {
        return newN;
      };
};`

export const RECONCILE_2 = `export const reconcile = (vdom, dom, parent = dom.parentNode) => {
  const innerReplace = replace(parent);

  if (dom.nodeType === NODE_TYPES.TEXT) {
    if (vdom != null && vdom.toString() === dom.textContent) {
      return dom;
    } else {
      return innerReplace(dom, render(vdom, parent))
    }
  }
};`

export const HELPER_1 = `export const NODE_TYPES = {
  NODE: 1,
  TEXT: 3
};`

export const RECONCILE_3 = `export const reconcile = (vdom, dom, parent = dom.parentNode) => {
  const innerReplace = replace(parent);

  if (dom.nodeType === NODE_TYPES.TEXT) {
    if (vdom != null && vdom.toString() === dom.textContent) {
      return dom;
    } else {
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
        .forEach((child, ind) => 
          curChildNodes[\`\${ind}__\${child.nodeType}\`] = child
        );

      for (const attr of dom.getAttributeNames()) dom.removeAttribute(attr);
      for (const event in dom.__eventHandlers || {}) {
        dom.removeEventListener(event, dom.__eventHandlers[event]);
        dom.__eventHandlers[event] = null;
      }

      for (const prop in newProps) setProp(dom, prop, newProps[prop]);

      vdom.children.flat().forEach((child, ind) => {
        if (\`\${ind}__\${child.nodeType}\` in curChildNodes) {
          reconcile(child, curChildNodes[ind], dom);
          delete curChildNodes[ind];
        } else {
          dom.insertBefore(render(child, dom), dom.childNodes[ind]);
        }
      });

      for (let ind in curChildNodes) {
        curChildNodes[ind].remove();
      }

      return dom;
    }
  }
};`