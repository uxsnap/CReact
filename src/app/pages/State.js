import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { 
  COMPONENT_2,
  HELPER_2,
  PURE_COMPONENT_1,
  RENDER_COMPONENT_2,
  GET_DERIVED_STATE_1,
  LIFECYCLE_1,
  RECONCILE_8
} from "../code";

export const State = () => (
  <Fragment>
    <Title>Adding state</Title>

    <Paragraph>
      In this chapter we will add <CodeWrap>state</CodeWrap> to our components and 
      <CodeWrap>lifecycle hooks</CodeWrap> so we can finally write yourself a <CodeWrap>Todo</CodeWrap>!.
    </Paragraph>


    <Paragraph>The state of the component will be handled in the <CodeWrap>Component</CodeWrap> class.
    </Paragraph>

    <CodeBlock code={COMPONENT_2} fileName="main/component.js" line="8-10,13-21,23-28"/>

    <List items={[
      <Paragraph>On the lines <CodeWrap>8-10</CodeWrap>, 
      we added the <CodeWrap>state</CodeWrap> field and the special field <CodeWrap>__CALL_QUEUE</CodeWrap>. 
      This field is created to contain all the state changes that are fired within the component.</Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>23-28</CodeWrap>, 
        we are adding new state changes to the queue. The <CodeWrap>requestIdleCallback</CodeWrap> will fire its callback when the main thread is idle.
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>13-21</CodeWrap>, 
        our state will be updated with all the changes that were contained in the 
        <CodeWrap>__CALL_QUEUE</CodeWrap>. Following that, 
        we will reconcile the component and reassign necessary special fields."
      </Paragraph>
    ]} />

    <Paragraph>
      Now the class components are stateful. Inside the <CodeWrap>class</CodeWrap>
      lifecycle methods were created. Most of them do nothing as they should. We only need to specify
      <CodeWrap>return</CodeWrap> value of <CodeWrap>shouldComponentUpdate</CodeWrap> and 
      <CodeWrap>getSnapshotBeforeUpdate</CodeWrap> as React documentation insists. 
    </Paragraph>


    <Paragraph>
      Let's also create <CodeWrap>PureComponent</CodeWrap>. The main difference between classic component and
      pure one is in <CodeWrap>shouldComponentUpdate</CodeWrap>. <CodeWrap>PureComponent</CodeWrap>
      makes shallow comparison of the old and new props; old and new state, and updates if the objects are not the same 
    </Paragraph>

    <CodeBlock code={HELPER_2} fileName="helpers/utils.js" />
    <CodeBlock code={PURE_COMPONENT_1} fileName="main/pureComponent.js" />

    <Paragraph>The last thing we have to do, is to add lifecycle methods calls to <CodeWrap>render</CodeWrap>
    and <CodeWrap>reconcile</CodeWrap> functions.</Paragraph>

    <CodeBlock code={RENDER_COMPONENT_2} fileName="main/render.js" line="7,12"/>

    <List items={[
      <Paragraph>
        On the line <CodeWrap>7</CodeWrap> we call <CodeWrap>getDerivedStateFromProps</CodeWrap> to 
        create <CodeWrap>state</CodeWrap> through <CodeWrap>props</CodeWrap> object.
      </Paragraph>,
      <Paragraph>
      On the line <CodeWrap>12</CodeWrap> we call <CodeWrap>componentDidMount</CodeWrap> as 
      our freshly created component has been mounted to the <CodeWrap>DOM</CodeWrap>
    </Paragraph>,
    ]}/>

    <Paragraph>The code for the <CodeWrap>getDerivedStateFromProps</CodeWrap>:</Paragraph>

    <CodeBlock code={GET_DERIVED_STATE_1} fileName="helpers/lifecycle.js" />

    <Paragraph>
      In <CodeWrap>reconcile</CodeWrap>, before destroying components
      we need to call <CodeWrap>componentWillUnmount</CodeWrap>:
    </Paragraph>

    <CodeBlock code={LIFECYCLE_1} fileName="main/reconcile.js" />


    <Paragraph>
      In <CodeWrap>reconcileClassComponent</CodeWrap>:
    </Paragraph>

    <CodeBlock code={RECONCILE_8} fileName="main/reconcile.js" line="6,11,13-15,19"/>

    <List items={[
      <Paragraph>
        On the line <CodeWrap>6</CodeWrap> we call <CodeWrap>getDerivedStateFromProps</CodeWrap>.
      </Paragraph>,
      <Paragraph>
        On the line <CodeWrap>11</CodeWrap> we call <CodeWrap>getSnapshotBeforeUpdate</CodeWrap>. 
        Method is returning <CodeWrap>null</CodeWrap> or <CodeWrap>snapshot</CodeWrap> 
        of the previous props and state.
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>13-15</CodeWrap> we call <CodeWrap>shouldComponentUpdate</CodeWrap>. 
        Method is returning <CodeWrap>boolean</CodeWrap> value and is used mostly to optimize rerendering.
      </Paragraph>,
      <Paragraph>
        On the line <CodeWrap>19</CodeWrap> we call <CodeWrap>componentDidUpdate</CodeWrap>. 
        If the method <CodeWrap>shouldComponentUpdate</CodeWrap> returns <CodeWrap>true</CodeWrap>,
        the component will call <CodeWrap>componentDidUpdate</CodeWrap> method after the reconciliation.
      </Paragraph>,
    ]}/>

    <Paragraph>With all the changes, the <CodeWrap>Todo</CodeWrap> can finally be created.</Paragraph>


    {/* <SandboxFrame chapter={4} /> */}
  </Fragment>
);