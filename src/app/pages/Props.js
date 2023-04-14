import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { 
  SET_PROP_3,
  SET_PROP_4,
  SET_PROP_5,
  CREATE_REF_1,
  RENDER_4,
  RECONCILE_9,
  SET_EVENT_LISTENER_1
} from "../code";

export const Props = () => (
  <Fragment>
    <Title>Handling props</Title>

    <Paragraph>
      In this chapter we will update our code
      to handle <CodeWrap>keys</CodeWrap>,<CodeWrap>refs</CodeWrap>,
      and other props that our components cannot handle yet"
    </Paragraph>

    <Paragraph>
      Let's start with infamous<CodeWrap>dangerouslySetInnerHTML</CodeWrap>
    </Paragraph>

    <CodeBlock code={SET_PROP_3} fileName="main/render.js" line="2-5" />

    <Paragraph>Simple stuff: we just need to validate<CodeWrap>__html</CodeWrap>field and assign it
    to<CodeWrap>innerHTML</CodeWrap></Paragraph>

    <SandboxFrame n={5} />

    <Paragraph>Then, let's add  specific props to be assigned to<CodeWrap>dom</CodeWrap>object. 
    Also, let's add the<CodeWrap>ref</CodeWrap>prop - both callback and object versions.</Paragraph>

    <CodeBlock code={SET_PROP_4} fileName="main/render.js" line="13-16,18-26"/>

    <List items={[
      <Paragraph>On the lines<CodeWrap>13-16</CodeWrap>, we add a<CodeWrap>className</CodeWrap>
      prop as a field of a dom object because there are no attributes like<CodeWrap>className</CodeWrap>
      so it must be handled differently.</Paragraph>,
      <Paragraph>On the lines<CodeWrap>18-26</CodeWrap>, we add a<CodeWrap>ref</CodeWrap>
      prop. First, we check if the<CodeWrap>value</CodeWrap> is a<CodeWrap>function</CodeWrap>and 
      we call it if it does. Otherwise, we assign dom to the<CodeWrap>current</CodeWrap>field.</Paragraph>
    ]}/>

    <SandboxFrame n={6} />

    <Paragraph>And don't forget to create<CodeWrap>createRef</CodeWrap>function.</Paragraph>

    <CodeBlock code={CREATE_REF_1} fileName="main/ref.js" />

    <Paragraph>
      Finally, let's add <CodeWrap>key</CodeWrap> support. The main purpose of the<CodeWrap>key</CodeWrap>
      is to help with the reconciliation of a component's children. So, we also need to update
      the<CodeWrap>reconcile</CodeWrap>function.</Paragraph>

    <CodeBlock code={SET_PROP_5} fileName="main/render.js" line="7-9"/>

    <Paragraph>We also need to update other functions to handle keys.</Paragraph>

    <CodeBlock code={RENDER_4} fileName="main/render.js" line="10,19-21"/>
    <CodeBlock code={RECONCILE_9} fileName="main/reconcile.js" line="39-41,52-62,64-69"/>

    <List items={[
      <Paragraph>
        On the lines <CodeWrap>39-41</CodeWrap>, child in the dom is stored in the <CodeWrap>curChildNodes</CodeWrap> by the key prop.
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>52-62</CodeWrap>, we check if the new child is in the <CodeWrap>curChildNodes</CodeWrap>. If it's not, we render it, 
        otherwise we need to update it
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>64-69</CodeWrap>, unchecked children are removed from the dom.
      </Paragraph>,
    ]}/>

    <Paragraph>
      Also,<CodeWrap>React</CodeWrap>tends to treat<CodeWrap>onChange</CodeWrap>differently - 
      as an<CodeWrap>input</CodeWrap>event.
    </Paragraph>

    <CodeBlock code={SET_EVENT_LISTENER_1} fileName="main/render.js"/>

    <Paragraph>Codesandbox:</Paragraph>

    <SandboxFrame n={7} />

    <Paragraph>Now our code supports specific props and Todo works as expected.</Paragraph>
  </Fragment>
);