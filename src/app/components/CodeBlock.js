import Prism from "prismjs";

import { createElement } from "../../main/render";

export const CodeBlock = ({ code, langType = "javascript", fileName = '' }) => {
  const highlightedCode = Prism.highlight(
    code,
    Prism.languages.javascript,
    langType
  );

  return (
    <div className={`code-block ${fileName && 'with-filename'}`}>
      {fileName && <div className="code-block__file">{fileName}</div>}

      <pre className={`language-${langType}`}>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
};