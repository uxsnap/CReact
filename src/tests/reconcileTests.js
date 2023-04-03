import { createElement, render } from "../main/render";
import { reconcile } from "../main/reconcile";
import { Component } from "../main/component";

 
 

export const reconcileRoot = document.getElementById("reconcile");

function TestComponent(props) {
  return <p>{props.children}</p>;
}

class TestClassComponent extends Component {
  render() {
    return (
      <p>
        {this.props.title} {this.props.children}
      </p>
    );
  }
}

export const reconcileTests = [
  { from: "yes yes yes", to: "yes yes yes 2" },
  { from: "yes yes yes", to: "yes yes yes" },
  { from: "yes yes yes", to: null },
  { from: "yes yes yes", to: undefined },
  { from: "yes yes yes", to: 5 },
  { from: 5, to: 5 },
  { from: 5, to: 5 },
  { from: true, to: false },
  { from: true, to: true },
  { from: null, to: undefined },
  { from: <div>Test</div>, to: true },
  { from: <div>Test</div>, to: "test" },
  { from: <div>Test</div>, to: null },
  {
    from: <div>Test</div>,
    to: (
      <i>
        <b>Test</b>
      </i>
    )
  },
  {
    from: (
      <TestClassComponent>
        <div>
          Test<b>Test</b>
        </div>
      </TestClassComponent>
    ),
    to: (
      <TestClassComponent title="heyy">
        <div>
          Test 2<b>Test</b>
        </div>
      </TestClassComponent>
    )
  },
  { 
    from: <div onClick={() => console.log('here')} hell="no">Test</div>,
    to: <div>Test</div>,
  },
  { 
    from: <div onClick={() => console.log('here')} hell="no">Test</div>,
    to: <div>Test</div>,
  },
  { 
    from: (
      <TestComponent>
        <div>
          <li key="#1">Test #1</li>
          <li key="#2">Test #2</li>
          <li key="#3">Test #3</li>
          <li key="#4">Test #3</li>
          <li key="#5">Test #3</li>
          <li key="#6">Test #3</li>
        </div>
      </TestComponent>
    ),
    to: (
      <TestComponent>
        <div>
          <li key="#1">Test #1</li>
          <li key="#2">Test #2</li>
          <li key="#3">Test #3</li>
          <li key="#4">Test #3</li>
          <li key="#5">Test #3</li>
          <li key="#6">Test #3</li>
        </div>
    </TestComponent>
    ),
  }
];

export const reconcileTestCallback = (test, index) => {
  const curElement = render(test.from, reconcileRoot);

  reconcile(test.to, curElement, reconcileRoot);
};
