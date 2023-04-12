import { __SHALLOW_COMPARE } from "../helpers";
import { Component } from "./component";

export class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      __SHALLOW_COMPARE(this.props, nextProps) &&
      __SHALLOW_COMPARE(this.state, nextState)
    );
  }
}
