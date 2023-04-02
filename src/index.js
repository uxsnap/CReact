import { OverallUpdateExample } from './examples';
import { render, createElement } from './main/render';
import './style/index.scss';

/** @jsxRuntime classic */
/** @jsx createElement */

render(<OverallUpdateExample />, document.getElementById('app'));