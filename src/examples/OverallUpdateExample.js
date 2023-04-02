import { Component } from '../main/component';
import { createElement } from '../main/render';
import { createRef } from '../main/ref';

/** @jsxRuntime classic */
/** @jsx createElement */

class ScrollList extends Component {
  constructor(props) {
    super(props);

    this.listRef = createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.list.length > 105) return false;
    return true;
  }

  addItem() {
    this.setState({ 
      list: this.state.list.concat(Math.random())
    });
  }

  render() {
    return (
      <div ref={this.listRef} style={{ overflow: 'auto', maxHeight: '500px' }}>
        <ul>
          {this.props.list.map(item => {
            return <li key={item}>{item}</li>
          })}
        </ul>
      </div>
    );
  }
}

export class OverallUpdateExample extends Component {
  constructor() {
    super();

    const list = [];
    for (let i = 0; i < 100; i++) list.push(i);

    this.state = { list };

    this.addItem = this.addItem.bind(this);
  }

  addItem() {
    this.setState({ 
      list: this.state.list.concat(Math.random())
    });
  }
  
  render() {
    return (
      <div>
        <button style={{ position: 'fixed', right: '20px' }} onClick={this.addItem}>Add new</button>
  
        <ScrollList list={this.state.list} />
      </div>
    );
  }
}