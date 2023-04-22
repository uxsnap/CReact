import App from './app';
import { Todo, Test } from './examples/Todo';
import { render, createElement } from './main/render';
import './app/style/index.scss';

render(<Test />, document.getElementById('app'));
