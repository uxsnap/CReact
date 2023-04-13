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

export const BasicRendering = () => (
  <Fragment>
    <Title>Basic rendering</Title>

    <Paragraph>
      Let's teach our library render things.
      <CodeWrap>React</CodeWrap>uses<CodeWrap>ReactDOM</CodeWrap>
      to render the main component of the application <br/>
      We usually write something like this:      
    </Paragraph> 

    <CodeBlock code={RENDER_1} fileName="index.js" />

    <Paragraph>
      Basically, we need to create our version of <CodeWrap>render</CodeWrap> function. But first we
      need to understand how to handle different types:
    </Paragraph>

    <CodeBlock code={FROM_TO_TYPES}/>

    <Paragraph>We won't render components right now. It'll be implemented later.</Paragraph>

    <Paragraph>Let's create helper function <CodeWrap>mount</CodeWrap></Paragraph>

    <CodeBlock code={MOUNT_1} fileName="main/render.js" />

    <Paragraph>Without it we would have to check if the component has a parent or not all the time.</Paragraph>

    <Paragraph>
      Then we create <CodeWrap>render</CodeWrap> function: < br />
    </Paragraph>

    <CodeBlock code={RENDER_2} fileName="main/render.js" line="6,10,18,19,27,30" />

    <List items={[
      <Paragraph>
        On the line <CodeWrap>6</CodeWrap>, we handle<CodeWrap>undefined</CodeWrap>,
        <CodeWrap>null</CodeWrap>,<CodeWrap>NaN</CodeWrap>and render
        empty string.
      </Paragraph>,
      <Paragraph>
        On the line<CodeWrap>10</CodeWrap>, we handle<CodeWrap>string</CodeWrap>,
        <CodeWrap>number</CodeWrap>, <CodeWrap>boolean</CodeWrap> and render an
        empty string if the value is a boolean and equal to <CodeWrap>false</CodeWrap>.
        Otherwise, the value is rendered.
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>18-19</CodeWrap>, we handle <CodeWrap>tags</CodeWrap>. Here we also check if the
        <CodeWrap>VDOM</CodeWrap>is an object 
        (line <CodeWrap>19</CodeWrap>) and if it is, we render the string representation of the object.
      </Paragraph>,
      <Paragraph>
        On the line <CodeWrap>27</CodeWrap>, we create<CodeWrap>dom</CodeWrap>element through 
        <CodeWrap>document.createElement</CodeWrap>.Then, we iterate through props
        and set each prop to newly created node. Then, we iterate through children
        and render them too.
      </Paragraph>,
      <Paragraph>
        On the line <CodeWrap>30</CodeWrap>, we use helper function <CodeWrap>setProp</CodeWrap>. 
        Here's the code of it: 
      </Paragraph>,
    ]}/>


    <CodeBlock code={SET_PROP_1} fileName="main/render.js" />

    <Paragraph>
      Right now this function handles styles, events and basic attributes.  
      <CodeWrap>keys</CodeWrap>,<CodeWrap>refs</CodeWrap>
      and other specific props will be implemented later.
      We also create <CodeWrap>setEventListener</CodeWrap> function to encapsulate 
      event listeners functionality.
    </Paragraph>

    <Paragraph>Right now the function can render everything from this list </Paragraph>

    <CodeBlock code={RENDER_TEST_1} />

    <Paragraph>You can check the result on Codesandbox: </Paragraph>

    <SandboxFrame />

    <Paragraph>
      P.S. Don't forget to import <CodeWrap>createElement</CodeWrap>in all files with<CodeWrap>JSX</CodeWrap>.
      Without the function, the application wouldn't know how to handle<CodeWrap>JSX</CodeWrap>properly!
    </Paragraph>
  </Fragment>
);