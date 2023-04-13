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
  INDEX_HTML_1,
  VDOM_1,
  DOM_1,
  DIR_2
} from "../code";

export const Introduction = () => (
  <Fragment>
    <Title>Introduction</Title>

    <Paragraph>
      Hey! You've probably become accustomed to 
      the most popular frontend library - <CodeWrap>React</CodeWrap>
    </Paragraph>

    <Paragraph>
      Do you want to know how it works under the hood?  
    </Paragraph>

    <Paragraph>
      This series of tutorials will help you
      create your own version of frontend library, similar to <CodeWrap>React</CodeWrap>.
      Real <CodeWrap>React</CodeWrap> uses things called <CodeWrap>fibers</CodeWrap> to control the flow of the app. 
      We won't be implementing it here.
      Instead, this series will focus on understanding the core concepts of the 
      library - <CodeWrap>render</CodeWrap> and <CodeWrap>reconciliation</CodeWrap>.
      After completing all chapters you can create your own decent <CodeWrap>Todo</CodeWrap>! 
    </Paragraph>

    <Paragraph />

    <Paragraph>
      Firstly, we need to install required packages, create a folder and configure the environment: 
    </Paragraph>

    <CodeBlock code={PACKAGES_1} />

    <Paragraph>Run the webpack-cli with this answers: </Paragraph>

    <CodeBlock code={WEBPACK_1} />
    <CodeBlock code={WEBPACK_2} />

    <Paragraph>We also need to install packages that will help us parse JSX: </Paragraph>

    <CodeBlock code={PACKAGES_2} />

    <Paragraph>Update <CodeWrap>.babelrc</CodeWrap> file: </Paragraph>

    <CodeBlock code={BABEL_1} />

    <Paragraph>Update <CodeWrap>index.html</CodeWrap> file: </Paragraph>

    <CodeBlock code={INDEX_HTML_1} langType="html" fileName="index.html" />

    <Paragraph>The overall project structure: </Paragraph>

    <CodeBlock code={DIR_1} langType="treeview" />

    <Paragraph>
      Then let's create directory named<CodeWrap>main</CodeWrap> 
      inside<CodeWrap>src</CodeWrap> folder.<br />
      There, we'll create a file named<CodeWrap>render.js</CodeWrap>
      where all of the rendering will be happening.
    </Paragraph>

    <CodeBlock code={CREATE_ELEMENT} fileName="main/render.js"  />

    <Paragraph>
      The main purpose of <CodeWrap>createElement</CodeWrap> is to provide 
      the ability of work with <CodeWrap>VDOM</CodeWrap> nodes.
      So the JSX like this:
    </Paragraph>
    <CodeBlock code={DOM_1} langType="html" />
    <Paragraph>
      will be transformed to this: 
    </Paragraph>
    <CodeBlock code={VDOM_1} />

    <Paragraph>
      The structure of the project right now looks like this: 
    </Paragraph>
    
    <CodeBlock code={DIR_2} langType="treeview"/>

    <Paragraph>That's it for the lesson!</Paragraph>
    <Title>Introduction</Title>

    <Paragraph>
      Hey! You probably already get accustomed to 
      the most popular frontend library - <CodeWrap>React</CodeWrap>
    </Paragraph>

    <Paragraph>
      Do you want to know how it works under the hood?  
    </Paragraph>

    <Paragraph>
      This series of tutorials will help you
      create your own version of frontend library, similar to <CodeWrap>React</CodeWrap>.
      Real <CodeWrap>React</CodeWrap> use things called <CodeWrap>fibers</CodeWrap> to control the flow of the app. 
      We won't be implementing it here.
      Instead, this series will focus on understanding the core concepts of the 
      library - <CodeWrap>render</CodeWrap> and <CodeWrap>reconciliation</CodeWrap>.
      After completing all chapters you can create yourself a decent <CodeWrap>Todo</CodeWrap>! 
    </Paragraph>

    <Paragraph />

    <Paragraph>
      Firstly, we need to install required packages, create a folder and configure the environment: 
    </Paragraph>

    <CodeBlock code={PACKAGES_1} />

    <Paragraph>Run the webpack-cli with this answers: </Paragraph>

    <CodeBlock code={WEBPACK_1} />
    <CodeBlock code={WEBPACK_2} />

    <Paragraph>We also need to install packages that will help us parse JSX: </Paragraph>

    <CodeBlock code={PACKAGES_2} />

    <Paragraph>Update <CodeWrap>.babelrc</CodeWrap> file: </Paragraph>

    <CodeBlock code={BABEL_1} />

    <Paragraph>Update <CodeWrap>index.html</CodeWrap> file: </Paragraph>

    <CodeBlock code={INDEX_HTML_1} langType="html" fileName="index.html" />

    <Paragraph>The overall project structure: </Paragraph>

    <CodeBlock code={DIR_1} langType="treeview" />

    <Paragraph>
      Then let's create directory<CodeWrap>main</CodeWrap> 
      in<CodeWrap>src</CodeWrap>.<br />
      There we create file<CodeWrap>render.js</CodeWrap>
      where all of the rendering will be happening.
    </Paragraph>

    <CodeBlock code={CREATE_ELEMENT} fileName="main/render.js"  />

    <Paragraph>
      The main purpose of <CodeWrap>createElement</CodeWrap> is to give 
      the ability of work with <CodeWrap>VDOM</CodeWrap> nodes.
      So the JSX like this:
    </Paragraph>
    <CodeBlock code={DOM_1} langType="html" />
    <Paragraph>
      Will be transformed to this: 
    </Paragraph>
    <CodeBlock code={VDOM_1} />

    <Paragraph>
      The structure of the project right now looks like this: 
    </Paragraph>
    
    <CodeBlock code={DIR_2} langType="treeview"/>

    <Paragraph>That's it for the lesson!</Paragraph>
  </Fragment>
);