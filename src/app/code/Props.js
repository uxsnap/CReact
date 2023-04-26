export const SET_PROP_5 = `export const setProp = (dom, key, value) => {
  if (key === 'dangerouslySetInnerHTML' && !!value && !!value.__html) {
    dom.innerHTML = value.__html;
    return;
  }

  if (key === 'key') {
    dom.__key = value;
  }
 
  if (key === 'value') {
    dom[key] = value;
    dom.setAttribute(key, value);
    return;
  }

  if (key === 'className') {
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

  if (key === 'value') {
    dom[key] = value;
    dom.setAttribute(key, value);
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

export const SET_PROP_4 = `export const setProp = (dom, key, value) => {
  if (key === 'dangerouslySetInnerHTML' && !!value && !!value.__html) {
    dom.innerHTML = value.__html;
    return;
  }

  if (key === 'value') {
    dom[key] = value;
    dom.setAttribute(key, value);
    return;
  }

  if (key === 'className') {
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



export const RENDER_4 = `export const renderComponent = (vdom, parent, removeOutlineTime = 100) => {
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
    const component = vdom.type(props);

    if (component.props) {
      component.props.key = (props && props.key) || undefined;
    }

    return render(component, parent, removeOutlineTime);
  }
};`;

export const RECONCILE_9 = `export const reconcile = (vdom, dom, parent = dom.parentNode) => {
  const innerReplace = replace(parent);

  if (typeof vdom === "object" && typeof vdom.type === "function") {
    return reconcileComponent(vdom, dom, parent);
  }

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
          dom.appendChild(render(child, dom));
        }
      });

      for (let key in curChildNodes) {
        if (curChildNodes[key].__instance) {
          curChildNodes[key].__instance.componentWillUnmount();
        }
        curChildNodes[key].remove();
      }

      return dom;
    }
  }
};`;

export const SET_EVENT_LISTENER_1 = `const setEventListener = (dom, key, value) => {
  let event = key.slice(2,).toLowerCase();

  if (event === 'change') {
    event = 'input';
  }
  
  dom.__eventHandlers = dom.__eventHandlers || {};
  dom.__eventHandlers[event] = value;
  dom.addEventListener(event, dom.__eventHandlers[event]);
};`;