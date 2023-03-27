import { createElement, render } from "./render";
import { reconcile } from "./reconcile";
import { Component } from "./component";

/** @jsxRuntime classic */
/** @jsx createElement */

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
  // { from: "yes yes yes", to: "yes yes yes 2" },
  // { from: "yes yes yes", to: "yes yes yes" },
  // { from: "yes yes yes", to: null },
  // { from: "yes yes yes", to: undefined },
  // { from: "yes yes yes", to: 5 },
  // { from: 5, to: 5 },
  // { from: 5, to: 5 },
  // { from: true, to: false },
  // { from: true, to: true },
  // { from: null, to: undefined },
  // { from: <div>Test</div>, to: true },
  // { from: <div>Test</div>, to: "test" },
  // { from: <div>Test</div>, to: null },
  // {
  //   from: <div>Test</div>,
  //   to: (
  //     <i>
  //       <b>Test</b>
  //     </i>
  //   )
  // },
  // {
  //   from: (
  //     <TestClassComponent>
  //       <div>
  //         Test<b>Test</b>
  //       </div>
  //     </TestClassComponent>
  //   ),
  //   to: (
  //     <TestClassComponent title="heyy">
  //       <div>
  //         Test 2<b>Test</b>
  //       </div>
  //     </TestClassComponent>
  //   )
  // },
  { 
    from: <div onClick={() => console.log('here')} hell="no">Test</div>,
    to: <div>Test</div>,
  }
];

export const reconcileTestCallback = (test, index) => {
  const curElement = render(test.from, reconcileRoot);

  reconcile(test.to, curElement, reconcileRoot);
};
