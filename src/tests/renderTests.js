import { Component } from "../main/component";
import { render, createElement } from "../main/render";

 
 

export const renderRoot = document.getElementById("render");

function TestComponent(props) {
  return <p>{props.children}</p>;
}

class TestClassComponent extends Component {
  render() {
    return (
      <div>
        <div>Test</div>
        <p>{this.props.children}</p>
      </div>
    );
  }
}

export const renderTests = [
  5,
  6,
  123123,
  "hey there little fella",
  `nice to meet you too ${5555}`,
  null,
  undefined,
  true,
  false,
  { a: { b: { c: "d" } } },
  [1, 2, 3, 4, 5],
  <ul>
    <li>Hey</li>
    <li>there</li>
    <li>fella</li>
  </ul>,
  <ul>
    <li>{true}</li>
    <li>{false}</li>
    <li>{5673}</li>
    <li>{"Heheh"}</li>
    <li>{null}</li>
    <li>
      <p>Inner {5}</p>
    </li>
  </ul>,
  <TestComponent>Damn</TestComponent>,
  <TestClassComponent>Test class component</TestClassComponent>,
  <div onClick={() => console.log('here')}>Test</div>,
  <div key="key">Test</div>,
  <TestComponent key="key">Damn</TestComponent>,
  <TestClassComponent key="key">Test class component</TestClassComponent>,
];

export const renderTestCallback = (test, index) => {
  return render(
    <p style={{ fontSize: 12, fontWeight: 500 }}>
      {index} {test}
    </p>,
    renderRoot
  );
};
