import { Todo } from './examples/Todo';
import { CustomTextInput } from './examples/RefTest';
import { render, createElement } from './main/render';
import './style/index.scss';

/** @jsxRuntime classic */
/** @jsx createElement */

// render(<Todo />, document.getElementById('app'));
render(<CustomTextInput />, document.getElementById('app'));