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
  { type: "text", from: "test", to: "test 2" },
  { type: "text", from: "test", to: "test" },
  { type: "text", from: "test", to: null },
  { type: "text", from: "test", to: undefined },
  { type: "text", from: "test", to: 5 },
  { type: "text", from: 5, to: 5 },
  { type: "text", from: 1203912, to: 5 },
  { type: "text", from: true, to: false },
  { type: "text", from: true, to: true },
  { type: "text", from: false, to: true },
  { type: "falsy", from: null, to: false },
  { type: "falsy", from: null, to: <div>Test</div> },
  { type: "falsy", from: undefined, to: <div>Test</div> },
  { type: "falsy", from: 5, to: NaN },
  { type: "tag", from: <div>Test</div>, to: true },
  { type: "tag", from: <div>Test</div>, to: "test" },
  { type: "tag", from: <div>Test</div>, to: null },
  {
    type: "tag",
    from: <div>Test</div>,
    to: (
      <i>
        <b>Test</b>
      </i>
    )
  },
  {
    type: "tag",
    from: (
      <div onClick={() => console.log("here")} hell="no">
        Test
      </div>
    ),
    to: <div>Test</div>
  },
  {
    type: "tag",
    from: (
      <div onClick={() => console.log("here")} hell="no">
        Test
      </div>
    ),
    to: <div>Test</div>
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
