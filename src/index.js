import { Todo } from './examples/Todo';
import { render, createElement } from './main/render';
import './style/index.scss';

/** @jsxRuntime classic */
/** @jsx createElement */

render(<Todo />, document.getElementById('app'));