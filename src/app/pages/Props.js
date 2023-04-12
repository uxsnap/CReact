import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame } from "../components";
import { 
  SET_PROP_3,
  SET_PROP_4,
  SET_PROP_5,
  CREATE_REF_1,
  RECONCILE_4
} from "../code";

export const Props = () => (
  <Fragment>
    <Title>Handling props</Title>

    <Paragraph>
      In this chapter we will update our code
      to handle <CodeWrap>keys</CodeWrap>, <CodeWrap>refs</CodeWrap>,
       and e.t.c
    </Paragraph>

    <Paragraph>
      Let's start with infamous <CodeWrap>dangerouslySetInnerHTML</CodeWrap>
    </Paragraph>

    <CodeBlock code={SET_PROP_3} fileName="main/render.js" line="2-5" />

    <Paragraph>Simple stuff: we just need to validate <CodeWrap>__html</CodeWrap> field and assign it
    to <CodeWrap>innerHTML</CodeWrap></Paragraph>

    <SandboxFrame n={5} />

    <Paragraph>Then, let's add  specific props to be assigned to <CodeWrap>dom</CodeWrap>object. 
    Also, let's add <CodeWrap>ref</CodeWrap> - both callback and object versions.</Paragraph>

    <CodeBlock code={SET_PROP_4} fileName="main/render.js" line="13-26"/>

    <SandboxFrame n={6} />

    <Paragraph>And don't forget to create <CodeWrap>createRef</CodeWrap> function.</Paragraph>

    <CodeBlock code={CREATE_REF_1} fileName="main/ref.js" />

    <Paragraph>And finally, let's add <CodeWrap>key</CodeWrap> support. The <CodeWrap>key</CodeWrap>
    main purpose is to figure out the reconciliation of the children of the component. So we also update
    <CodeWrap>reconcile</CodeWrap> function.</Paragraph>

    <CodeBlock code={SET_PROP_5} fileName="main/render.js" line="22-25"/>

    <Paragraph>We also need to update <CodeWrap>reconcile</CodeWrap>.</Paragraph>

    <CodeBlock code={RECONCILE_4} fileName="main/reconcile.js" line="35,48-58,60-62"/>

    <Paragraph>Now our code supports specific props.</Paragraph>

    <SandboxFrame n={3} />
  </Fragment>
);