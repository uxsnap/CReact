import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap } from "../components";
import { 
  RENDER_1
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
  </Fragment>
);