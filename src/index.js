import App from './app';
import { Todo } from './examples/Todo';
import { render, createElement } from './main/render';
import './app/style/index.scss';

render(<Todo />, document.getElementById('app'));
