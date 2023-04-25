import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { HOOKS_1, RENDER_COMPONENT_3 } from "../code";

export const Hooks = ({ lang }) => (
  <Fragment>
    <Title>{lang[0]}</Title>

    <Paragraph>{lang[1]}</Paragraph>

    <Paragraph>{lang[2]}</Paragraph>

    <CodeBlock code={HOOKS_1} fileName="main/hooks.js" />

    <Paragraph>{lang[3]}</Paragraph>

    <Paragraph>{lang[4]}</Paragraph>

    <CodeBlock code={RENDER_COMPONENT_3} fileName="main/render.js" line="17,19-21"/>

    <List items={lang[5]}/>

    {/* <List items={lang[5]}/>

    <SandboxFrame n={6} />

    <Paragraph>{lang[6]}</Paragraph>

    <CodeBlock code={CREATE_REF_1} fileName="main/ref.js" />

    <Paragraph>{lang[7]}</Paragraph>

    <CodeBlock code={SET_PROP_5} fileName="main/render.js" line="7-9"/>

    <Paragraph>{lang[8]}</Paragraph>

    <CodeBlock code={RENDER_4} fileName="main/render.js" line="10,19-21"/>
    <CodeBlock code={RECONCILE_9} fileName="main/reconcile.js" line="39-41,52-62,64-69"/>

    <List items={lang[9]}/>

    <Paragraph>{lang[10]}</Paragraph>

    <CodeBlock code={SET_EVENT_LISTENER_1} fileName="main/render.js"/>

    <Paragraph>{lang[11]}</Paragraph>

    <SandboxFrame n={7} />

    <Paragraph>{lang[12]}</Paragraph> */}
  </Fragment>
);