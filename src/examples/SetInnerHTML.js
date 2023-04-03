import { createElement } from '../main/render';

const createMarkup = () => ({ __html: 'First &middot; Second' });
  
export const SetInnerHTML = () => <div dangerouslySetInnerHTML={createMarkup()} />;