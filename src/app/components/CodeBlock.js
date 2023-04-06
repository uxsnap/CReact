import Prism from "prismjs";

import { createElement } from "../../main/render";
import { Component } from "../../main/component";

export class CodeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: ''
    };
  }

  componentDidMount() {
    requestIdleCallback(() => {
      Prism.highlightAll();
    });
  }

  render() {
    const { code, langType = "javascript", fileName = '', line = undefined } = this.props;

    return (
      <div className={`code-block ${fileName && 'with-filename'}`}>
        {fileName && <div className="code-block__file">{fileName}</div>}

        <pre data-line={line} className={`language-${langType}`}>
          <code dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      </div>
    );
  }
};