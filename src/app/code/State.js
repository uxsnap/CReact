export const COMPONENT_2 = `import { reconcile } from "./reconcile";

export class Component {
  constructor(props) {
    this.__dom = null;
    
    this.props = props || {};
    this.state = null;
    
    this.__CALL_QUEUE = [];
  }

  __flush() {
    this.__CALL_QUEUE.forEach(qs => {
      this.state = Object.assign({}, this.state, qs);
    }); 
    this.__CALL_QUEUE = [];
    const prevComponent = this.__dom.__instance;
    this.__dom = reconcile(this.render(), this.__dom);
    this.__dom.__instance = prevComponent;
  }

  setState(newState) {
    if (this.__dom && this.shouldComponentUpdate(this.props, newState)) {
      this.__CALL_QUEUE.push(newState);
      requestIdleCallback(() => this.__flush());
    }
  }

  shouldComponentUpdate(nextProps, nextState) { return true; }

  componentDidMount() {}

  getSnapshotBeforeUpdate(prevProps, prevState) { return null; }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {}
};`

export const HELPER_2 = `export const __SHALLOW_COMPARE = (a, b) => {
  for (let k in a) if (a[k] !== b[k]) return false;

  return true;
};`

export const PURE_COMPONENT_1 = `import { __SHALLOW_COMPARE } from "../helpers";
import { Component } from "./component";

export class PureComponent extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return __SHALLOW_COMPARE(this.props, nextProps) && __SHALLOW_COMPARE(this.state, nextState);
    }
}`

export const RENDER_COMPONENT_2 = `export const renderComponent = (vdom, parent) => {
  const props = Object.assign({}, vdom.props, { children: vdom.children.flat() });

  if (vdom.type.prototype instanceof Component) {
    const component = new vdom.type(props);

    getDerivedStateFromProps(vdom, component);
    
    component.__dom = render(component.render(), parent);
    component.__dom.__instance = component;
    
    component.componentDidMount();

    return component.__dom;
  } else {
    const component = vdom.type(props);

    return render(component, parent);
  }
};`

export const GET_DERIVED_STATE_1 = `export const getDerivedStateFromProps = (vdom, component) => {
  if (!vdom.type.getDerivedStateFromProps) return;

  const newState = vdom.type.getDerivedStateFromProps(component.props, component.state);
  
  if (newState !== null) component.setState(newState);
};`

export const LIFECYCLE_1 = `for (let key in curChildNodes) {
  if (curChildNodes[key].__instance) {
    curChildNodes[key].__instance.componentWillUnmount();
  }
  curChildNodes[key].remove();
}

return dom;`

export const RECONCILE_8 = `export const reconcileClassComponent = (vdom, dom, parent, newProps) => {
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
    return render(vdom, parent);
  }
};`;