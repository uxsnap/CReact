import { reconcile } from "./reconcile";

export class Component {
  constructor(props) {
    this.props = props || {};
    this.state = null;
  }

  setState(newState) {
    if (!this.__dom) return;
    this.state = newState;
    reconcile(this.render(), this.__dom);
  }
}
