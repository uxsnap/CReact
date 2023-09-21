import { escapeHtml } from "../utils";

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

export const RECONCILE_10 = `export const reconcileComponent = (vdom, dom, parent) => {
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
  if (dom.__funcInstance && dom.__funcInstance.type === vdom.type) {
    currentlyRenderingComponent.stateHookIndex = 0;
    currentlyRenderingComponent.effectHookIndex = 0;
    currentlyRenderingComponent.current = dom.__token;

    dom.__funcInstance.props = newProps;

    return reconcile(dom.__funcInstance.type(newProps), dom, parent);
  } else {
    return replace(parent)(dom, render(vdom, parent));
  }
};`;

export const TODO_1 = escapeHtml(`export const Todo = () => {
  const [items, setItems] = useState([{ name: 'test', id: 0 }]);
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  
  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  }

  const onNameChange = (newName) => setName(newName);

  const addItem = () => {
    const curName = name.trim();
    if (!curName.length) return;

    setCount(count + 1);
    setItems([...items, { name: curName, id: count } ]);
    setName('');
  }

  return (
    <div>
      <Input 
        id="text" 
        title="Add item to todo:" 
        type="text" 
        value={name} 
        onChange={onNameChange}
      />
      <div>{count}</div>
      <TodoList items={items} onRemove={removeItem}/>
      <button onClick={addItem}>Add item</button>
    </div>
  );
}`);

export const HOOKS_2 = `export const INSTANCE_MAP = new Map();

export let currentlyRenderingComponent = { current: null, stateHookIndex: 0, effectHookIndex: 0 };

const getComponent = () => {
  let instanceToken = currentlyRenderingComponent.current;

  return INSTANCE_MAP.get(instanceToken);
};

export function useState(defValue) {
  const component = getComponent();
  
  if (component.__states[currentlyRenderingComponent.stateHookIndex] === undefined) {
    component.__states[currentlyRenderingComponent.stateHookIndex] = { 
      state: defValue
    };
  }
  
  let stateObj = component.__states[currentlyRenderingComponent.stateHookIndex];

  currentlyRenderingComponent.stateHookIndex++;

  return [
    stateObj.state,
    (newVal) => {    
      const { __dom } = component;
      const { __funcInstance } = __dom;
  
      stateObj.state = newVal;
      
      component.__dom = reconcile(__funcInstance, __dom);
      component.__dom.__funcInstance = __funcInstance;
    }
  ];
};`;

export const RECONCILE_11 = `for (let key in curChildNodes) {
  if (curChildNodes[key].__instance) {
    curChildNodes[key].__instance.componentWillUnmount();
  }

  if (curChildNodes[key].__funcInstance) {
    INSTANCE_MAP.delete(curChildNodes[key].__token);
  }

  curChildNodes[key].remove();
}
`;

export const HOOKS_3 = `export function useEffect(func, depArray) {
  const component = getComponent();
  
  if (component.__effects[currentlyRenderingComponent.effectHookIndex] === undefined) {
    component.__effects[currentlyRenderingComponent.effectHookIndex] = {
      func,
      depArray
    }
  }

  let effectsObj = component.__effects[currentlyRenderingComponent.effectHookIndex];

  if (!effectsObj.depArray.length && !effectsObj.called) {
    effectsObj.func();
    effectsObj.called = true;
  } else if (!__SHALLOW_COMPARE(effectsObj.depArray, depArray)) {
    effectsObj.func = func;
    effectsObj.depArray = depArray;

    effectsObj.func();
  }

  currentlyRenderingComponent.effectHookIndex++;
}`;
