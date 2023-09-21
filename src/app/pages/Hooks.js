import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { 
  HOOKS_1, 
  HOOKS_2, 
  RENDER_COMPONENT_3, 
  RECONCILE_10, 
  TODO_1, 
  RECONCILE_11, 
  HOOKS_3
} from "../code";

export const Hooks = ({ lang }) => (
  <Fragment>
    <Title>{lang[0]}</Title>

    <Paragraph>{lang[1]}</Paragraph>

    <Paragraph>{lang[2]}</Paragraph>

    <CodeBlock code={HOOKS_1} fileName="main/hooks.js" />

    <Paragraph>{lang[3]}</Paragraph>

    <Paragraph>{lang[4]}</Paragraph>

    <CodeBlock code={RENDER_COMPONENT_3} fileName="main/render.js" line="17,19-21,23-28,34-39"/>

    <List items={lang[5]}/>
    
    <Paragraph>{lang[6]}</Paragraph>

    <CodeBlock code={RECONCILE_10} fileName="main/reconcile.js" line="9,14,15-21,23"/>

    <CodeBlock code={RECONCILE_11} fileName="main/reconcile.js" line="6-8"/>
    
    <List items={lang[7]}/>

    <Paragraph>{lang[8]}</Paragraph>

    <Paragraph>{lang[9]}</Paragraph>

    <CodeBlock code={TODO_1} />

    <Paragraph>{lang[10]}</Paragraph>

    <Paragraph>{lang[11]}</Paragraph>

    <CodeBlock code={HOOKS_2} fileName="main/hooks.js" line="14-18,20-22,27-33"/>

    <List items={lang[12]}/>

    <Paragraph>{lang[13]}</Paragraph>

    <CodeBlock code={HOOKS_3} fileName="main/hooks.js" line="2-11,13-21"/>

    <List items={lang[14]}/>

    <Paragraph>{lang[15]}</Paragraph>

    <SandboxFrame n={8} />
  </Fragment>
);