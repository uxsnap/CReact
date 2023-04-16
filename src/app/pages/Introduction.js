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
    <Title>{lang[0]}</Title>

    <Paragraph>
      {lang[1]} -<CodeWrap>React</CodeWrap>.
    </Paragraph>

    <Paragraph>
      {lang[2]}
    </Paragraph>

    <Paragraph>
      {lang[3]}
    </Paragraph>

    <Paragraph>
      {lang[4]}
    </Paragraph>

    <CodeBlock code={PACKAGES_1} />

    <Paragraph>{lang[5]}</Paragraph>

    <CodeBlock code={WEBPACK_1} />
    <CodeBlock code={WEBPACK_2} />

    <Paragraph>{lang[6]} </Paragraph>

    <CodeBlock code={PACKAGES_2} />

    <Paragraph>{lang[7]}</Paragraph>

    <CodeBlock code={BABEL_1} />

    <Paragraph>{lang[8]}</Paragraph>

    <CodeBlock code={INDEX_HTML_1} langType="html" fileName="index.html" />

    <Paragraph>{lang[9]}</Paragraph>

    <CodeBlock code={DIR_1} langType="treeview" />

    <Paragraph>
      {lang[10]}
    </Paragraph>

    <CodeBlock code={CREATE_ELEMENT} fileName="main/render.js"  />

    <Paragraph>
     {lang[11]}
    </Paragraph>

    <CodeBlock code={DOM_1} langType="html" />

    <Paragraph>
      {lang[12]}
    </Paragraph>
    <CodeBlock code={VDOM_1} />

    <Paragraph>
      {lang[13]}
    </Paragraph>
    
    <CodeBlock code={DIR_2} langType="treeview"/>

    <Paragraph>{lang[14]}</Paragraph>
  </Fragment>
);