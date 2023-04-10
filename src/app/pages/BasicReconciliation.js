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

    <Paragraph>Okay our next step is to write a function to update DOM due to the changes in the VDOM</Paragraph>
    <Paragraph>First we need to figure out the behaviour of reconciliation of different types</Paragraph>
    <Paragraph>There are 2 types of nodes we can find in our dom right now: Text and HTML tags</Paragraph>
    <Paragraph>If the node is the text, we need to check if it’s the same text, and rerender if the text has changed</Paragraph>

    <CodeBlock code={SCHEMA_1} />

    <Paragraph>Let's again start with the helper function to replace old nodes and constant to check node types</Paragraph>

    <CodeBlock code={RECONCILE_1} fileName="main/reconcile.js" />
    <CodeBlock code={HELPER_1} fileName="helpers/constants.js" />

    <Paragraph>And create our first iteration of the <CodeWrap>reconcile</CodeWrap> function</Paragraph>

    <CodeBlock code={RECONCILE_2} fileName="main/reconcile.js"></CodeBlock>

    <Paragraph>As you can see, we're checking if the <CodeWrap>textContent</CodeWrap> of the nodes
      is the same. Then rerender if it's not.
     </Paragraph>

    <Paragraph>For tags, we need to check if they’re the same tags. If not - rerender</Paragraph>

    <Paragraph>If the DOM node is not a tag, then replace it with the vdom</Paragraph>

    <Paragraph>
      If the tags are the same, we need to update props by using function setProp
      and reconcile children due to their position. We add keys in further lessons
    </Paragraph>

    <CodeBlock code={SCHEMA_2} />

    <Paragraph>Our second iteration of the <CodeWrap>reconcile</CodeWrap> function: </Paragraph>

    <CodeBlock code={RECONCILE_3} fileName="main/reconcile.js" line="13-15,17-19,24-27,31-36,46-52,38,39-42,44,55-57" />
    
    <List items={[
      <Paragraph noMargin>
        On lines <CodeWrap>13-15</CodeWrap> we handle replacing node with everything <CodeWrap>falsy</CodeWrap> and <CodeWrap>strings</CodeWrap>.
      </Paragraph>,
      <Paragraph noMargin>
        On lines <CodeWrap>17-19</CodeWrap> we handle replacing different tags.
      </Paragraph>,
      <Paragraph noMargin>
        On lines <CodeWrap>24-27</CodeWrap> we handle reconciliation of the same tags.
      </Paragraph>,
      <Paragraph noMargin>
        On lines <CodeWrap>31-36</CodeWrap> we store previous children to reconcile them on lines <CodeWrap>46-52</CodeWrap>
        by checking their "keys" ( we add the support of the normal keys in the future chapters). On lines <CodeWrap>55-57</CodeWrap>
        we remove old children
      </Paragraph>,
      <Paragraph noMargin>
        On line <CodeWrap>38</CodeWrap>we remove old element attributes to set new one on line <CodeWrap>44</CodeWrap>
      </Paragraph>,
      <Paragraph noMargin>
        On line <CodeWrap>39-42</CodeWrap>we remove old event listeners
      </Paragraph>,
    ]} />

    <Paragraph>Right now our code can correlate the dom to the changes made in the vdom</Paragraph>
    
    <Paragraph>Tests for reconciliation: </Paragraph>

    <CodeBlock code={RECONCILE_TESTS_1} />

    <SandboxFrame chapter={2}/>
  </Fragment>
);