import Prism from "prismjs";

import { createElement } from "../../main/render";

export const CodeBlock = ({ code, langType = "javascript" }) => {
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages.javascript,
    langType
  );

  return (
    <div className="code-block">
      <pre className={`language-${langType}`}>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }}>
        </code>
      </pre>
    </div>
  );
};