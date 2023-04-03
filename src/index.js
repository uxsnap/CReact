import { render, createElement } from './main/render';
import App from './app';
import './app/style/index.scss';

render(<App />, document.getElementById('app'));