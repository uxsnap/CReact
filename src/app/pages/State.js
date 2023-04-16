import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { 
  COMPONENT_2,
  HELPER_2,
  PURE_COMPONENT_1,
  RENDER_COMPONENT_2,
  GET_DERIVED_STATE_1,
  LIFECYCLE_1,
  RECONCILE_8,
  SET_PROP_2
} from "../code";

export const State = ({ lang }) => (
  <Fragment>
    <Title>{lang[0]}</Title>

    <Paragraph>
      {lang[1]}
    </Paragraph>


    <Paragraph>
      {lang[2]}
    </Paragraph>

    <CodeBlock code={COMPONENT_2} fileName="main/component.js" line="8-10,13-21,23-28"/>

    <List items={lang[3]} />

    <Paragraph>
      {lang[4]}
    </Paragraph>


    <Paragraph>
      {lang[5]}
    </Paragraph>

    <CodeBlock code={HELPER_2} fileName="helpers/utils.js" />
    <CodeBlock code={PURE_COMPONENT_1} fileName="main/pureComponent.js" />

    <Paragraph>{lang[6]}</Paragraph>

    <CodeBlock code={RENDER_COMPONENT_2} fileName="main/render.js" line="7,12"/>

    <List items={lang[7]}/>

    <Paragraph>{lang[8]}</Paragraph>

    <CodeBlock code={GET_DERIVED_STATE_1} fileName="helpers/lifecycle.js" />

    <Paragraph>
    {lang[9]}
    </Paragraph>

    <CodeBlock code={LIFECYCLE_1} fileName="main/reconcile.js" />

    <Paragraph>
    {lang[10]}
    </Paragraph>

    <CodeBlock code={RECONCILE_8} fileName="main/reconcile.js" line="6,11,13-15,19"/>

    <List items={lang[11]}/>

    <Paragraph>
    {lang[12]}
    </Paragraph>

    <CodeBlock code={SET_PROP_2} fileName="main/render.js" />

    <Paragraph>{lang[13]}</Paragraph>

    <Paragraph>{lang[14]}</Paragraph>

    <SandboxFrame n={4} />

    <Paragraph>
      {lang[15]}
    </Paragraph>
  </Fragment>
);