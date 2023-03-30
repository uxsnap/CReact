import { Component } from './main/component';
import { render, createElement } from './main/render';
import { testMain } from './tests';

/** @jsxRuntime classic */
/** @jsx createElement */

// testMain('reconcile');

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.todoClick = this.todoClick.bind(this);
    }

    todoClick() {
        this.props.onClick();
        console.log('todo item ' + this.props.children)
    }

    render() {
        return (
            <li>
                <span>{this.props.children}</span>
                <a onClick={this.todoClick} href={"#" + this.props.children}>Click</a>
            </li>
        );
    }
};
class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            items: [1,2,3,4],
        };

        this.removeItem = this.removeItem.bind(this);
    }

    removeItem() {
        this.setState({
            items: this.state.items.filter(i => i !== 1)
        });
        this.setState({
            items: this.state.items.filter(i => i !== 2)
        });
        this.setState({
            items: this.state.items.filter(i => i !== 3)
        });
        this.setState({
            items: this.state.items.filter(i => i !== 4)
        });
    }

    render() {
        return (
            <ul>
                {this.state.items.map(item => (
                    <TodoItem key={item} onClick={() => this.removeItem(item)}>{item}</TodoItem>    
                ))}  
            </ul>
        );
    }
}

render(<TodoList />, document.getElementById('app'));