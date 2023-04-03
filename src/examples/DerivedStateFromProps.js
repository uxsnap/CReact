import { Component } from '../main/component';
import { createElement } from '../main/render';
 
export class DerivedStateExample extends Component {
  render() {
    return (
      <div><Child title="test title"/></div>
    );
  }
}

export class Child extends Component{
	constructor(props){
		super(props);

		this.state = { title: 'test 1' };
	}

	static getDerivedStateFromProps(props, state) {
		if (props.title !== state.title) {
			return { title: props.title };
		}
		return null;
	}

	render(){
    return (
      <div>{this.state.title}</div>
    )
	}
}
