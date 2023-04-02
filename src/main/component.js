import { reconcile } from "./reconcile";

export class Component {
  constructor(props) {
    this.__dom = null;
    
    this.props = props || {};
    this.state = null;
    
    this.__CALL_QUEUE = [];
  }

  __flush() {
    this.__CALL_QUEUE.forEach(qs => {
      this.state = Object.assign(this.state, qs);
    }); 
    this.__CALL_QUEUE = [];
    reconcile(this.render(), this.__dom);
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
}
