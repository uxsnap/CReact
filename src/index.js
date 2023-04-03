import { SetInnerHTML } from './examples';
import { render, createElement } from './main/render';
import './style/index.scss';

/** @jsxRuntime classic */
/** @jsx createElement */

render(<SetInnerHTML />, document.getElementById('app'));