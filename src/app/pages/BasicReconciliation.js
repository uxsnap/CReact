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

export const BasicReconciliation = () => (
  <Fragment>
    <Title>
      Basic reconciliation 
    </Title>

    <Paragraph>Our next step is to write a function to update the<CodeWrap>DOM</CodeWrap>
      reflecting on the changes in the<CodeWrap>VDOM</CodeWrap></Paragraph>
    <Paragraph>Firstly, we need to figure out the behavior of the reconciliation of the different types</Paragraph>
    <Paragraph>There are 2 types of nodes we can find in<CodeWrap>DOM</CodeWrap>right now: 
      <CodeWrap>Text</CodeWrap>and<CodeWrap>HTML tags</CodeWrap>.
    </Paragraph>
    <Paragraph>If the node is a type of text, we need to check if it's the same text, and rerender if it's not</Paragraph>

    <CodeBlock code={SCHEMA_1} />

    <Paragraph>Let's start with the helper function with the functionality of replacing old nodes and a constant to check node types.</Paragraph>

    <CodeBlock code={RECONCILE_1} fileName="main/reconcile.js" />
    <CodeBlock code={HELPER_1} fileName="helpers/constants.js" />

    <Paragraph>First iteration of the<CodeWrap>reconcile</CodeWrap>function:</Paragraph>

    <CodeBlock code={RECONCILE_2} fileName="main/reconcile.js"></CodeBlock>

    <Paragraph>As you can see, we check if the<CodeWrap>textContent</CodeWrap>of the nodes
      is the same. Then rerender it if it's not.
     </Paragraph>

    <Paragraph>For tags, we need to check if they're the same tags. If not - rerender</Paragraph>

    <Paragraph>If the<CodeWrap>DOM</CodeWrap>node is not a tag, 
      then replace it with the<CodeWrap>VDOM</CodeWrap>node.</Paragraph>

    <Paragraph>
      If the tags are the same, we need to update props by using function <CodeWrap>setProp</CodeWrap>
      and reconcile children due to their position. <br /> We add<CodeWrap>keys</CodeWrap>in further lessons.
    </Paragraph>

    <CodeBlock code={SCHEMA_2} />

    <Paragraph>Second iteration of the <CodeWrap>reconcile</CodeWrap> function: </Paragraph>

    <CodeBlock code={RECONCILE_3} fileName="main/reconcile.js" line="13-15,17-19,24-27,31-36,46-52,38,39-42,44,55-57" />
    
    <List items={[
      <Paragraph noMargin>
        On the lines<CodeWrap>13-15</CodeWrap>, we replace srting-node and everything <CodeWrap>falsy</CodeWrap>.
      </Paragraph>,
      <Paragraph noMargin>
        On the lines<CodeWrap>17-19</CodeWrap>, we handle replacing different tags.
      </Paragraph>,
      <Paragraph noMargin>
        On the lines<CodeWrap>24-27</CodeWrap>, we handle reconciliation of the same tags.
      </Paragraph>,
      <Paragraph noMargin>
        On the lines<CodeWrap>31-36</CodeWrap>, we store previous children to reconcile them on lines <CodeWrap>46-52</CodeWrap>
        by checking their "<CodeWrap>keys</CodeWrap>" ( we add the support of the normal keys in the future chapters). On the lines <CodeWrap>55-57</CodeWrap>
        we remove old children.
      </Paragraph>,
      <Paragraph noMargin>
        On line <CodeWrap>38</CodeWrap>we remove old node attributes to set new one on line <CodeWrap>44</CodeWrap>.
      </Paragraph>,
      <Paragraph noMargin>
        On line <CodeWrap>39-42</CodeWrap>we remove old event listeners.
      </Paragraph>,
    ]} />

    <Paragraph>Right now our code can correlate the<CodeWrap>DOM</CodeWrap>to the changes made in the <CodeWrap>VDOM</CodeWrap></Paragraph>
    
    <Paragraph>Tests for reconciliation:</Paragraph>

    <CodeBlock code={RECONCILE_TESTS_1} />

    <Paragraph>Codesandbox:</Paragraph>

    <SandboxFrame n={2}/>
  </Fragment>
);