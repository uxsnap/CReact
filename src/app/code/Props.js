export const SET_PROP_4 = `export const setProp = (dom, key, value) => {
  if (key === 'dangerouslySetInnerHTML' && !!value && !!value.__html) {
    dom.innerHTML = value.__html;
    return;
  }

  if (['checked', 'className'].includes(key)) {
    dom[key] = value;
    return;
  }

  if (key === 'ref') {
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
};`

export const SET_PROP_2 = `export const setProp = (dom, key, value) => {
  if (key === 'dangerouslySetInnerHTML' && !!value && !!value.__html) {
    dom.innerHTML = value.__html;
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
};`

export const SET_PROP_3 = `export const setProp = (dom, key, value) => {
  if (key === 'dangerouslySetInnerHTML' && !!value && !!value.__html) {
    dom.innerHTML = value.__html;
    return;
  }

  if (['checked', 'className'].includes(key)) {
    dom[key] = value;
    return;
  }

  if (key === 'ref') {
    if (typeof value === "function") {
      value(dom);
      return;
    }

    value.current = dom;
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
};`

export const CREATE_REF_1 = `export const createRef = () => {
  return { current: null };
};`;

export const RECONCILE_4 = `export const reconcile = (vdom, dom, parent = dom.parentNode) => {
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
        .forEach((child, ind) => {
          const key = child && child.__key ? child.__key : \`___key__\${ind}__\`;
          
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
        let key = props.key || \`___key__\${ind}__\`;
        
        if (key in curChildNodes) {
          reconcile(child, curChildNodes[key], dom);
          delete curChildNodes[key];
        } else {
          dom.insertBefore(render(child, dom), dom.childNodes[ind]);
        }
      });

      for (let key in curChildNodes) {
        curChildNodes[key].remove();
      }

      return dom;
    }
  }
};`