import { Component } from "../main/component";
import { createRef } from "../main/ref";
import { createElement } from "../main/render";
import { Introduction, BasicRendering, BasicReconciliation, Props, Components } from './pages'; 
import { Container, LangSwitch, Sidebar } from "./components";
import { State } from "./pages/State";
import { getLang } from './langs';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chapter: 0,
      ready: false,
      lang: 'en',
    };

    this.getPageByChapterNum = this.getPageByChapterNum.bind(this);
    this.onChange = this.onChange.bind(this); 
    this.onLangChange = this.onLangChange.bind(this); 
    this.ref = createRef();
  }

  componentDidMount() {
    const curChapter = localStorage.getItem('__MY_REACT_CHAPTER');
    const curLang = localStorage.getItem('__MY_REACT_LANG');

    if (!curChapter) {
      localStorage.setItem('__MY_REACT_CHAPTER', 0);
    } else this.setState({ chapter: +curChapter });

    if (!curLang) {
      localStorage.setItem('__MY_REACT_LANG', 'en');
    } else this.setState({ lang: curLang });

    this.setState({ ready: true });
  }

  getPageByChapterNum() {
    switch (this.state.chapter) {
      case 0:
        return Introduction;
      case 1:
        return BasicRendering;
      case 2:
        return BasicReconciliation;
      case 3:
        return Components;
      case 4:
        return State;
      case 5:
        return Props;
    }
  }

  onChange(chapter) {
    this.setState({
      chapter
    });

    this.ref.current.scrollTo(0, 0);

    localStorage.setItem('__MY_REACT_CHAPTER', chapter);
  }
  
  onLangChange(lang) {
    this.setState({ lang });

    localStorage.setItem('__MY_REACT_LANG', lang);
  }

  render() {
    if (!this.state.ready) return '';

    const lang = getLang(this.state.lang)[this.state.chapter];
    const Component = this.getPageByChapterNum(this.state.chapter);


    return (
      <div className="main">
        <div className="left">
          <Sidebar chapter={this.state.chapter} onChange={this.onChange} />
        </div>

        <LangSwitch lang={this.state.lang} onChange={this.onLangChange}/>
        
        <div className="right">
          <Container ref={this.ref}>
            <Component lang={lang} />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;