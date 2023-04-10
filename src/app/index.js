import { Component } from "../main/component";
import { createElement } from "../main/render";
import { Introduction, BasicRendering, BasicReconciliation, Props, Components } from './pages'; 
import { Sidebar } from "./components";

class App extends Component {
  constructor() {
    super();
    this.state = {
      chapter: 0,
      ready: false,
    };

    this.getPageByChapterNum = this.getPageByChapterNum.bind(this);
    this.onChange = this.onChange.bind(this); 
  }

  componentDidMount() {
    const curChapter = localStorage.getItem('__MY_REACT_CHAPTER');

    if (!curChapter) {
      localStorage.setItem('__MY_REACT_CHAPTER', 0);
    } else this.setState({ chapter: +curChapter });

    this.setState({ ready: true });
  }

  getPageByChapterNum() {
    switch (this.state.chapter) {
      case 0:
        return <Introduction />;
      case 1:
        return <BasicRendering />;
      case 2:
        return <BasicReconciliation />;
      case 3:
        return <Components />;
      case 4:
        return <Props />;
    }
  }

  onChange(chapter) {
    this.setState({
      chapter
    });

    localStorage.setItem('__MY_REACT_CHAPTER', chapter);
  }

  render() {
    if (!this.state.ready) return '';

    return (
      <div className="main">
        <div className="left">
          <Sidebar chapter={this.state.chapter} onChange={this.onChange} />
        </div>
        
        <div className="right">
          <div className="container">
            {this.getPageByChapterNum(this.state.chapter)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;