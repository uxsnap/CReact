import { Fragment, createElement } from "../../main/render";
import { Title, Paragraph, CodeBlock, CodeWrap } from "../components";
import { 
  CREATE_ELEMENT, 
  PACKAGES_1, 
  PACKAGES_2, 
  DIR_1, 
  WEBPACK_1, 
  WEBPACK_2, 
  BABEL_1, 
  INDEX_HTML_1
} from "../code";

export const Introduction = () => (
  <Fragment>
    <Title>Introduction</Title>

    <Paragraph>
      Hey! You probably already get accustomed to 
      the most popular frontend library - React
    </Paragraph>

    <Paragraph>
      Do you want to know how it works under the   hood?  
    </Paragraph>

    <Paragraph>
      This series of tutorials will help you
      create your own version of "React" - a simple one
    </Paragraph>

    <Paragraph>
      Real React uses things called fibers to control the flow of the app. 
      We won't be implementing it here
    </Paragraph>

    <Paragraph>
      Instead, this series will focus on understanding the core concepts of the 
      library - render process and reconciliation process
    </Paragraph>

    <Paragraph>
      After completing all chapters you can create your copy of this library and write 
      yourself decent Todo! 
    </Paragraph>

    <Paragraph />

    <Paragraph>Let's start! 
      Firstly, we need to create a folder and set the environment and install required packages: 
    </Paragraph>

    <CodeBlock code={PACKAGES_1} />

    <Paragraph>And run the webpack-cli with this answers: </Paragraph>

    <CodeBlock code={WEBPACK_1} />
    <CodeBlock code={WEBPACK_2} />

    <Paragraph>We also need to install packages that will help us parse JSX: </Paragraph>

    <CodeBlock code={PACKAGES_2} />

    <Paragraph>And update our <CodeWrap>.babelrc</CodeWrap> file: </Paragraph>

    <CodeBlock code={BABEL_1} />

    <Paragraph>Update <CodeWrap>index.html</CodeWrap> file: </Paragraph>

    <CodeBlock code={INDEX_HTML_1} langType="html" fileName="index.html" />

    <Paragraph>The overall project structure: </Paragraph>

    <CodeBlock code={DIR_1} langType="treeview" />

    <Paragraph>
      Then let's create the directory <CodeWrap>main</CodeWrap> 
      in <CodeWrap>src</CodeWrap>.<br />
      There we create file <CodeWrap>render.js</CodeWrap>
      Where all of our rendering will be.
    </Paragraph>

    <CodeBlock code={CREATE_ELEMENT} fileName="render.js"  />
  </Fragment>
);