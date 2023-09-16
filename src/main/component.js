import { reconcile } from "./reconcile";
import 'requestidlecallback';

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
}
