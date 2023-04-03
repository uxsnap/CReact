import { Component } from '../main/component';
import { createElement } from '../main/render';

export class ComponentDidMountTest extends Component {
  constructor() {
    super();
    this.state = {
        items: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        items: [1, 2, 3, 4]
      });
    }, 1000);
  }

  render() {
    return (
      <ul>
        {this.state.items.map(item => (
          <li>
            {item}
          </li>
        ))}
      </ul>
    );
  }
}