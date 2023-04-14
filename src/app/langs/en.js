import { Fragment, createElement } from "../../main/render";
import { CodeWrap } from "../components";

export default [
  {
    title: "Introduction",
    
    hey: "Hey! You've probably become accustomed to the most popular frontend library",
    
    doYouWant: "Do you want to know how it works under the hood?",

    explanation: (
      <Fragment>
        This series of tutorials will help you
        create your own version of frontend library, similar to <CodeWrap>React</CodeWrap>.
        Real <CodeWrap>React</CodeWrap> uses things called <CodeWrap>fibers</CodeWrap> to control the flow of the app. 
        We won't be implementing it here.
        Instead, this series will focus on understanding the core concepts of the 
        library - <CodeWrap>render</CodeWrap> and <CodeWrap>reconciliation</CodeWrap>.
        After completing all chapters you can create your own decent <CodeWrap>Todo</CodeWrap>! 
      </Fragment>
    ),

    firstly: (
      "Firstly, we need to install required packages, create a folder and configure the environment: "
    ),

    webpackCli: (
      "Run the webpack-cli with this answers:"
    ),

    packagesJSX: (
      "We also need to install packages that will help us parse JSX:"
    ),

    babelRc: (
      <Fragment>
        Update<CodeWrap>.babelrc</CodeWrap>file:
      </Fragment>
    ),

    indexHTML: (
      <Fragment>
        Update<CodeWrap>index.html</CodeWrap>file:
      </Fragment>
    ),

    projectStructure: (
      "The overall project structure:"
    ),

    mainDir: (
      <Fragment>
        Then let's create directory named<CodeWrap>main</CodeWrap> 
        inside<CodeWrap>src</CodeWrap> folder.<br />
        There, we'll create a file named<CodeWrap>render.js</CodeWrap>
        where all of the rendering will be happening.
      </Fragment>
    ),

    createElement: (
      <Fragment>
        The main purpose of <CodeWrap>createElement</CodeWrap> is to provide 
        the ability of work with <CodeWrap>VDOM</CodeWrap> nodes.
        So the JSX like this:
      </Fragment>
    ),

    willBeTransformed: (
      "will be transformed to this:"
    ),

    projectStructure: (
      "The structure of the project right now looks like this: "
    ),


    thatsIt: "That's it for the lesson!"
  }
]