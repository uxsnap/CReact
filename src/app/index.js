import { Component } from "../main/component";
import { createElement } from "../main/render";
import { Introduction } from './pages'; 
import { Sidebar } from "./components";

class App extends Component {
  constructor() {
    super();
    this.state = {
      chapter: 0
    };

    this.getPageByChapterNum = this.getPageByChapterNum.bind(this);
    this.onChange = this.onChange.bind(this); 
  }

  getPageByChapterNum() {
    switch (this.state.chapter) {
      case 0:
        return <Introduction />;
    }
  }

  onChange(chapter) {
    this.setState({
      chapter
    })
  }

  render() {
    return (
      <div className="main">
        <div className="left">
          <Sidebar active={this.state.chapter} onChange={this.onChange} />
        </div>
        
        <div className="right">
          {this.getPageByChapterNum(this.state.chapter)}
        </div>
      </div>
    );
  }
}

export default App;