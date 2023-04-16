import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { 
  RENDER_1,
  RENDER_2,
  FROM_TO_TYPES,
  MOUNT_1,
  SET_PROP_1,
  RENDER_TEST_1
} from "../code";

export const BasicRendering = ({ lang }) => (
  <Fragment>
    <Title>{lang[0]}</Title>

    <Paragraph>
      {lang[1]}
    </Paragraph> 

    <CodeBlock code={RENDER_1} fileName="index.js" />

    <Paragraph>
      {lang[2]}
    </Paragraph>

    <CodeBlock code={FROM_TO_TYPES}/>

    <Paragraph>{lang[3]}</Paragraph>

    <Paragraph>{lang[4]}</Paragraph>

    <CodeBlock code={MOUNT_1} fileName="main/render.js" />

    <Paragraph>{lang[5]}</Paragraph>

    <Paragraph>
      {lang[6]}
    </Paragraph>

    <CodeBlock code={RENDER_2} fileName="main/render.js" line="6,10,18,19,27,30" />

    <List items={lang[7]}/>


    <CodeBlock code={SET_PROP_1} fileName="main/render.js" />

    <Paragraph>
      {lang[8]}
    </Paragraph>

    <Paragraph>{lang[9]}</Paragraph>

    <CodeBlock code={RENDER_TEST_1} />

    <Paragraph>{lang[10]}</Paragraph>

    <SandboxFrame />

    <Paragraph>
      {lang[11]}
    </Paragraph>
  </Fragment>
);