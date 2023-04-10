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

export const Components = () => (
  <Fragment>
    <Title>Handling components</Title>

    <Paragraph>
      In this chapter we will learn how to handle components in our apps.
    </Paragraph>

    <Paragraph>
      The components can be instances of<CodeWrap>Function</CodeWrap> and <CodeWrap>Class</CodeWrap>.
      <CodeWrap>JSX</CodeWrap> parser parses both types as a functions so firstly we need to handle 
      functions in <CodeWrap>render</CodeWrap> function.
    </Paragraph>

    <CodeBlock code={RENDER_3} fileName="main/render.js" line="21-25,27-34" />

    <List items={[
      <Paragraph>We create separate function to handle components - <CodeWrap>renderComponent</CodeWrap>.</Paragraph>,
      <Paragraph>On lines <CodeWrap>27-34</CodeWrap> we're handling <CodeWrap>Fragments</CodeWrap>. 
        The <CodeWrap>Fragment</CodeWrap> doesn't have attributes so we need to skip <CodeWrap>setProp</CodeWrap>
        if the element is fragment.
      </Paragraph>
    ]} />

    <Paragraph>
      In function <CodeWrap>renderComponent</CodeWrap> we check if the component is an
      instance of <CodeWrap>Component</CodeWrap> class - the class that will handle stateful components.
      Otherwise, we call function with the props as it's functional component. Also, there is specific prop of the components
      <CodeWrap>children</CodeWrap> - it can be added through adding <CodeWrap>vdom.children</CodeWrap> to the <CodeWrap>props</CodeWrap> 
      of the component. 
    </Paragraph>

    <CodeBlock code={RENDER_COMPONENT_1} fileName="main/render.js" line="2,4-10,12-15"/>

    <List items={[
      <Paragraph>On line <CodeWrap>2</CodeWrap> we add <CodeWrap>children</CodeWrap> to the other props</Paragraph>,
      <Paragraph>On lines <CodeWrap>4-10</CodeWrap> we create instance of the class component 
        and add specific fields to the instance. It's very expensive to recreate class components all the time
        so this fields will help us <CodeWrap>reconcile</CodeWrap> class components without recreation of the instance.</Paragraph>,
      <Paragraph>On lines <CodeWrap>12-15</CodeWrap> we create functional components. It's simple - we just need to pass 
      props as the arguments of the function</Paragraph>
    ]}/>

    <Paragraph>Also, let's not forget adding specific functional component - <CodeWrap>Fragment</CodeWrap></Paragraph>

    <CodeBlock code={FRAGMENT_1} fileName="main/render.js"/>
  
    <Paragraph>Then we need to update <CodeWrap>reconcile</CodeWrap> function to handle components.
    We also create helper function - <CodeWrap>reconcileComponent</CodeWrap>, to handle reconciliation.</Paragraph>
    
    <CodeBlock code={RECONCILE_4} fileName="main/reconcile.js" line="4-6"/>
    <CodeBlock code={RECONCILE_5} fileName="main/reconcile.js" />
    <CodeBlock code={RECONCILE_6} fileName="main/reconcile.js" />

    <Paragraph>Here we check if the instances of the <CodeWrap>dom</CodeWrap> and <CodeWrap>vdom</CodeWrap> are the same.
      If they're not, we need to render a new one. If the instances are the same, we have to reconcile old one with the new props
    </Paragraph>

    <Paragraph>And finally, we need to add <CodeWrap>Component</CodeWrap> class. The code of the file is pretty simple.
      We only need to assign <CodeWrap>props</CodeWrap> to coming props and <CodeWrap>__dom</CodeWrap> to <CodeWrap>null</CodeWrap>. 
    </Paragraph>

    <CodeBlock code={COMPONENT_1} fileName="main/component.js" />

    <Paragraph>With all that, we can now update our tests of <CodeWrap>render</CodeWrap> and <CodeWrap>reconciliation</CodeWrap>.</Paragraph>

    <SandboxFrame chapter={3} />
  </Fragment>
);