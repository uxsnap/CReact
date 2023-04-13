import { escapeHtml } from "../utils";

export const SCHEMA_1 = `Schema:
Text -> Text == rerender if differ 
Text -> Any == full rerender`

export const SCHEMA_2 = `Schema:
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
          curChildNodes[\`\${ind}__\${child ? child.nodeType : child}\`] = child
        );

      for (const attr of dom.getAttributeNames()) dom.removeAttribute(attr);
      for (const event in dom.__eventHandlers || {}) {
        dom.removeEventListener(event, dom.__eventHandlers[event]);
        dom.__eventHandlers[event] = null;
      }

      for (const prop in newProps) setProp(dom, prop, newProps[prop]);

      vdom.children.flat().forEach((child, ind) => {
        if (\`\${ind}__\${child ? child.nodeType : child}\` in curChildNodes) {
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

export const RECONCILE_TESTS_1 = escapeHtml(`export const reconcileTests = [
  { type: "text", from: "test", to: "test 2" },
  { type: "text", from: "test", to: "test" },
  { type: "text", from: "test", to: null },
  { type: "text", from: "test", to: undefined },
  { type: "text", from: "test", to: 5 },
  { type: "text", from: 5, to: 5 },
  { type: "text", from: 1203912, to: 5 },
  { type: "text", from: true, to: false },
  { type: "text", from: true, to: true },
  { type: "text", from: false, to: true },
  { type: "falsy", from: null, to: false },
  { type: "falsy", from: null, to: <div>Test</div> },
  { type: "falsy", from: undefined, to: <div>Test</div> },
  { type: "falsy", from: 5, to: NaN },
  { type: "tag", from: <div>Test</div>, to: true },
  { type: "tag", from: <div>Test</div>, to: "test" },
  { type: "tag", from: <div>Test</div>, to: null },
  {
    type: "tag",
    from: <div>Test</div>,
    to: (
      <i>
        <b>Test</b>
      </i>
    )
  },
  {
    type: "tag",
    from: (
      <div onClick={() => console.log("here")} yes="no">
        Test
      </div>
    ),
    to: <div>Test</div>
  },
  {
    type: "tag",
    from: (
      <div onClick={() => console.log("here")} yes="no">
        Test
      </div>
    ),
    to: <div>Test</div>
  }
];`);