import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap, SandboxFrame } from "../components";
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
      Let's make our app actually render things. <br />
      React uses ReactDOM to render the main component of the application <br/>
      We write something like this:      
    </Paragraph> 

    <CodeBlock code={RENDER_1} fileName="index.js" />

    <Paragraph>
      So let's create our version of render function. But first we
      need to understand how to handle different types:
    </Paragraph>

    <CodeBlock code={FROM_TO_TYPES}/>

    <Paragraph>We won't be bothering trying to render components right now</Paragraph>

    <Paragraph>Let's create helper function <CodeWrap>mount</CodeWrap></Paragraph>

    <CodeBlock code={MOUNT_1} fileName="render.js" />

    <Paragraph>It help us handle components without parent component</Paragraph>

    <Paragraph>
      Then we create <CodeWrap>render</CodeWrap> function: < br />
    </Paragraph>

    <CodeBlock code={RENDER_2} fileName="render.js" line="6,10,18,19,27,30,40" />

    <Paragraph>
      First condition is handling <CodeWrap>undefined</CodeWrap>,
      <CodeWrap>null</CodeWrap>, <CodeWrap>NaN</CodeWrap> and renders
      empty string to the parent component
    </Paragraph>

    <Paragraph>
      Second condition is handling <CodeWrap>string</CodeWrap>,
      <CodeWrap>number</CodeWrap>, <CodeWrap>boolean</CodeWrap> and renders
      empty string if the value is boolean and equal to <CodeWrap>false</CodeWrap>.
      Otherwise, the value is rendered
    </Paragraph>

    <Paragraph>
      Third condition is handling tags render. Here we also check if the 
      <CodeWrap>vdom</CodeWrap>  is object 
      (line 19) and if so, we render string representation of the object.
    </Paragraph>

    <Paragraph>
      On line 27, we're creating <CodeWrap>dom</CodeWrap> element through 
      <CodeWrap>document.createElement</CodeWrap>. Then we're iterating through props
      and set each of them to out newly created node. Then, we iterate through children
      and render them too.
    </Paragraph>

    <Paragraph>
      On the line setProp 30, we're using helper function <CodeWrap>setProp</CodeWrap> function. 
      Here's the code of it: 
    </Paragraph>

    <CodeBlock code={SET_PROP_1} fileName="render.js" />

    <Paragraph>
      Right now this function handles styles, events and basic attributes.  
      Handling of keys, refs and other specific props will be implemented in the next chapters.
      We also create <CodeWrap>setEventListener</CodeWrap> to encapsulate 
      handling event listeners
    </Paragraph>

    <Paragraph>
      If nothing is sufficient to our conditions, we render string "Error"
    </Paragraph>

    <Paragraph>Right now the function can render everything from this list </Paragraph>

    <CodeBlock code={RENDER_TEST_1} />

    <Paragraph>I'll leave writing tests to the reader. That's now for this lesson!</Paragraph>

    <Paragraph>P.S. Don't forget to import <CodeWrap>createElement</CodeWrap>
      in other files to handle JSX!
    </Paragraph>

    <Paragraph>You can check the result on Codesandbox: </Paragraph>

    <SandboxFrame />
  </Fragment>
);