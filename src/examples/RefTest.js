import { Component } from '../main/component';
import { createElement } from '../main/render';
import { createRef } from '../main/ref';

/** @jsxRuntime classic */
/** @jsx createElement */

export class CustomTextInput extends Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    render() {
        // tell React that we want to associate the <input> ref
        // with the `textInput` that we created in the constructor
        return (
            <div>
            <input
                type="text"
                ref={this.textInput} />
            <input
                type="button"
                value="Focus the text input"
                onClick={this.focusTextInput}
            />
            </div>
        );
    }
}
  
  