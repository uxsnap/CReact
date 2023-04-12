import { createElement, render } from "./main/render";
import { Component } from "./main/component";
import React from "react";

React.createElement = createElement;

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ value: !this.state.value });
  }

  render() {
    return (
      <li
        key={this.props.key}
        style={{ textDecoration: this.state.value ? "line-through" : "" }}
      >
        <span>{this.props.children}</span>
        <button onClick={this.props.onClick} href={"#" + this.props.children}>
          Click
        </button>
      </li>
    );
  }
}
class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => (
          <TodoItem key={item} onClick={() => this.props.onRemove(item)}>
            {item}
          </TodoItem>
        ))}
      </ul>
    );
  }
}

class Input extends Component {
  render() {
    const { type, value, onChange, id, title } = this.props;

    return (
      <label for={id || ""}>
        {title && <span>{title}</span>}
        <input
          id={id || ""}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }
}

export class Todo extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      name: ""
    };

    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  removeItem(item) {
    this.setState({
      items: this.state.items.filter((i) => i !== item)
    });
  }

  onNameChange(name) {
    this.setState({ name });
  }

  addItem() {
    this.setState({
      items: this.state.items.concat(this.state.name),
      name: ""
    });
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          id="text"
          title="Add item to todo:"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <TodoList items={this.state.items} onRemove={this.removeItem} />
        <button onClick={this.addItem}>Add item</button>
      </div>
    );
  }
}

render(<Todo />, document.getElementById("app"));
