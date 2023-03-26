import { reconcileComponent } from "./reconcile";

export class Component {
  constructor(props) {
    this.props = props || {};
    this.state = null;
  }

  setState(newState) {
    if (!this.__dom) return;
    this.state = newState;
    reconcileComponent(this.render(), this.__dom);
  }
}
