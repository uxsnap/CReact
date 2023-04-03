import { Todo } from './examples';
import { render, createElement } from './main/render';
import './style/index.scss';

render(<Todo />, document.getElementById('app'));