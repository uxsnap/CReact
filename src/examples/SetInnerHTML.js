import { createElement } from '../main/render';

/** @jsxRuntime classic */
/** @jsx createElement */

const createMarkup = () => ({ __html: 'First &middot; Second' });
  
export const SetInnerHTML = () => <div dangerouslySetInnerHTML={createMarkup()} />;