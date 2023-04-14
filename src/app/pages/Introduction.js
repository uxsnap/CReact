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

export const Introduction = ({ lang }) => (
  <Fragment>
    <Title>{lang.title}</Title>

    <Paragraph>
      {lang.hey} -<CodeWrap>React</CodeWrap>.
    </Paragraph>

    <Paragraph>
      {lang.doYouWant}
    </Paragraph>

    <Paragraph>
      {lang.explanation}
    </Paragraph>

    <Paragraph>
      {lang.firstly}
    </Paragraph>

    <CodeBlock code={PACKAGES_1} />

    <Paragraph>{lang.webpackCli}</Paragraph>

    <CodeBlock code={WEBPACK_1} />
    <CodeBlock code={WEBPACK_2} />

    <Paragraph>{lang.packagesJSX} </Paragraph>

    <CodeBlock code={PACKAGES_2} />

    <Paragraph>{lang.babelRc}</Paragraph>

    <CodeBlock code={BABEL_1} />

    <Paragraph>{lang.indexHTML}</Paragraph>

    <CodeBlock code={INDEX_HTML_1} langType="html" fileName="index.html" />

    <Paragraph>{lang.projectStructure}</Paragraph>

    <CodeBlock code={DIR_1} langType="treeview" />

    <Paragraph>
      {lang.mainDir}
    </Paragraph>

    <CodeBlock code={CREATE_ELEMENT} fileName="main/render.js"  />

    <Paragraph>
     {lang.createElement}
    </Paragraph>

    <CodeBlock code={DOM_1} langType="html" />

    <Paragraph>
      {lang.willBeTransformed}
    </Paragraph>
    <CodeBlock code={VDOM_1} />

    <Paragraph>
      {lang.projectStructure}
    </Paragraph>
    
    <CodeBlock code={DIR_2} langType="treeview"/>

    <Paragraph>{lang.thatsIt}</Paragraph>
  </Fragment>
);