import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { 
  RENDER_3,
  RENDER_COMPONENT_1,
  RECONCILE_4,
  RECONCILE_5,
  RECONCILE_6,
  FRAGMENT_1,
  COMPONENT_1
} from "../code";

export const Components = ({ lang }) => (
  <Fragment>
    <Title>{lang[0]}</Title>

    <Paragraph>
    {lang[1]}
    </Paragraph>

    <Paragraph>
    {lang[2]}
    </Paragraph>

    <CodeBlock code={RENDER_3} fileName="main/render.js" line="21-25,27-34" />

    <List items={lang[3]} />

    <Paragraph>
    {lang[4]}
    </Paragraph>

    <CodeBlock code={RENDER_COMPONENT_1} fileName="main/render.js" line="2,4-10,12-15"/>

    <List items={lang[5]}/>

    <Paragraph>{lang[6]}</Paragraph>

    <CodeBlock code={FRAGMENT_1} fileName="main/render.js"/>
  
    <Paragraph>{lang[7]}</Paragraph>
    
    <CodeBlock code={RECONCILE_4} fileName="main/reconcile.js" line="4-6"/>
    <CodeBlock code={RECONCILE_5} fileName="main/reconcile.js" />
    <CodeBlock code={RECONCILE_6} fileName="main/reconcile.js" />

    <Paragraph>{lang[8]}</Paragraph>

    <Paragraph>{lang[9]}</Paragraph>

    <CodeBlock code={COMPONENT_1} fileName="main/component.js" />

    <Paragraph>{lang[10]}</Paragraph>

    <Paragraph>{lang[11]}</Paragraph>

    <SandboxFrame n={3} />
  </Fragment>
);