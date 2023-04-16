import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame, List } from "../components";
import { 
  SCHEMA_2,
  SCHEMA_1,
  RECONCILE_1,
  RECONCILE_2,
  HELPER_1,
  RECONCILE_3,
  RECONCILE_TESTS_1
} from "../code";

export const BasicReconciliation = ({ lang }) => (
  <Fragment>
    <Title>
      {lang[0]} 
    </Title>

    <Paragraph>{lang[1]}</Paragraph>

    <Paragraph>{lang[2]}</Paragraph>
    
    <Paragraph>{lang[3]}</Paragraph>
    
    <Paragraph>{lang[4]}</Paragraph>

    <CodeBlock code={SCHEMA_1} />

    <Paragraph>{lang[5]}</Paragraph>

    <CodeBlock code={RECONCILE_1} fileName="main/reconcile.js" />
    <CodeBlock code={HELPER_1} fileName="helpers/constants.js" />

    <Paragraph>{lang[6]}</Paragraph>

    <CodeBlock code={RECONCILE_2} fileName="main/reconcile.js"></CodeBlock>

    <Paragraph>{lang[7]}</Paragraph>

    <Paragraph>{lang[8]}</Paragraph>

    <Paragraph>{lang[9]}</Paragraph>

    <Paragraph>{lang[10]}</Paragraph>

    <CodeBlock code={SCHEMA_2} />

    <Paragraph>{lang[11]}</Paragraph>

    <CodeBlock code={RECONCILE_3} fileName="main/reconcile.js" line="13-15,17-19,24-27,31-36,46-52,38,39-42,44,55-57" />
    
    <List items={lang[12]} />

    <Paragraph>{lang[13]}</Paragraph>
    
    <Paragraph>{lang[14]}</Paragraph>

    <CodeBlock code={RECONCILE_TESTS_1} />

    <Paragraph>{lang[15]}</Paragraph>

    <SandboxFrame n={2}/>
  </Fragment>
);