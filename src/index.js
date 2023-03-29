import { Component } from './component';
import { render, createElement } from './render';
import { testMain } from './tests';

/** @jsxRuntime classic */
/** @jsx createElement */

testMain('reconcile');
// class TodoList extends Component {
//     render() {
//         return (
//             <ul>
//                 <li>1</li>    
//                 <li>2</li>    
//                 <li>3</li>    
//                 <li>4</li>    
//             </ul>
//         );
//     }
// }

// render(<TodoList />, document.getElementById('app'),  { removeOutlineTime: 0 });