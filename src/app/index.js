import { Component } from "../main/component";
import { createRef } from "../main/ref";
import { createElement } from "../main/render";
import { 
  Introduction, 
  BasicRendering, 
  BasicReconciliation, 
  Props, 
  Components, 
  StartScreen,
  Hooks
} from './pages'; 
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
    const curChapter = localStorage.getItem('__CREACT_CHAPTER');
    const curLang = localStorage.getItem('__CREACT_LANG');

    if (!curChapter) {
      localStorage.setItem('__CREACT_CHAPTER', 0);
    } else this.setState({ chapter: +curChapter });

    if (!curLang) {
      localStorage.setItem('__CREACT_LANG', 'en');
    } else this.setState({ lang: curLang });

    this.setState({ ready: true });
  }

  getPageByChapterNum() {
    const chapters = [
      StartScreen,
      Introduction,
      BasicRendering,
      BasicReconciliation,
      Components,
      State,
      Props,
      Hooks
    ];
    
    return chapters[this.state.chapter];
  }

  onChange(chapter) {
    this.setState({
      chapter
    });

    this.ref.current.scrollTo(0, 0);

    localStorage.setItem('__CREACT_CHAPTER', chapter);
  }
  
  onLangChange(lang) {
    this.setState({ lang });

    localStorage.setItem('__CREACT_LANG', lang);
  }

  render() {
    if (!this.state.ready) return '';

    const lang = getLang(this.state.lang)[this.state.chapter];
    const Component = this.getPageByChapterNum(this.state.chapter);

    return (
      <div className="main">
        {
          this.state.chapter !== 0 && (
            <div className="left">
              <Sidebar lang={this.state.lang} chapter={this.state.chapter} onChange={this.onChange} />
            </div>
          )
        }

        <LangSwitch lang={this.state.lang} onChange={this.onLangChange}/>
        
        <div className="right">
          <Container ref={this.ref}>
            <Component lang={lang} onChange={this.onChange} />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;