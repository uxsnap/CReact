export const HOOKS_1 = `export const INSTANCE_MAP = new Map();

export let currentlyRenderingComponent = { current: null, stateHookIndex: 0, effectHookIndex: 0 };

const getComponent = () => {
  let instanceToken = currentlyRenderingComponent.current;

  return INSTANCE_MAP.get(instanceToken);
};`;

export const RENDER_COMPONENT_3 = `export const renderComponent = (vdom, parent, removeOutlineTime = 100) => {
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
`;