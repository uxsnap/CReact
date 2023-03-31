import { ComponentDidMountTest } from './examples';
import { render, createElement } from './main/render';
import './style/index.scss';

/** @jsxRuntime classic */
/** @jsx createElement */

// render(<Todo />, document.getElementById('app'));
render(<ComponentDidMountTest />, document.getElementById('app'));