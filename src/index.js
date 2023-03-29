import { Component } from './main/component';
import { render, createElement } from './main/render';
import { testMain } from './tests';

/** @jsxRuntime classic */
/** @jsx createElement */

// testMain('reconcile');

const TodoItem = ({ children, onClick }) => {
    return (
        <li>
            <span>{children}</span>
            <a onClick={onClick} href="#">Click</a>
        </li>
    );
};
class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            items: [1,2,3,4],
        };
    }

    removeItem(item) {
        console.log(item);
        this.setState({
            items: this.state.items.filter(i => i !== item)
        })
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