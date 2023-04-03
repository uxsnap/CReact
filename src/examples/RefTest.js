import { Component } from '../main/component';
import { createElement } from '../main/render';
import { createRef } from '../main/ref';

export class CustomTextInputWithRef extends Component {
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

export class CustomTextInputWithCallbackRef extends Component {
    constructor(props) {
      super(props);
  
      this.textInput = null;
  
      this.setTextInputRef = element => {
        this.textInput = element;
      };
  
      this.focusTextInput = () => {
        // Focus the text input using the raw DOM API
        if (this.textInput) this.textInput.focus();
      };
    }
  
    componentDidMount() {
      // autofocus the input on mount
      setTimeout(() => {
        this.focusTextInput();
      });
    }
  
    render() {
      // Use the `ref` callback to store a reference to the text input DOM
      // element in an instance field (for example, this.textInput).
      return (
        <div>
          <input
            type="text"
            ref={this.setTextInputRef}
          />
          <input
            type="button"
            value="Focus the text input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
  }
  
  