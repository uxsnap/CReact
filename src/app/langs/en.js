import { Fragment, createElement } from "../../main/render";
import { CodeWrap, Paragraph } from "../components";

export default [
  [
    "Introduction",
    
    "Hey! You've probably become accustomed to the most popular frontend library",
    
    "Do you want to know how it works under the hood?",

    (
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

    (
      "Firstly, we need to install required packages, create a folder and configure the environment: "
    ),

    (
      "Run the webpack-cli with this answers:"
    ),

    (
      "We also need to install packages that will help us parse JSX:"
    ),

    (
      <Fragment>
        Update<CodeWrap>.babelrc</CodeWrap>file:
      </Fragment>
    ),

    (
      <Fragment>
        Update<CodeWrap>index.html</CodeWrap>file:
      </Fragment>
    ),

    (
      "The overall project structure:"
    ),

    (
      <Fragment>
        Then let's create directory named<CodeWrap>main</CodeWrap> 
        inside<CodeWrap>src</CodeWrap> folder.<br />
        There, we'll create a file named<CodeWrap>render.js</CodeWrap>
        where all of the rendering will be happening.
      </Fragment>
    ),

    (
      <Fragment>
        The main purpose of <CodeWrap>createElement</CodeWrap> is to provide 
        the ability of work with <CodeWrap>VDOM</CodeWrap> nodes.
        So the JSX like this:
      </Fragment>
    ),

    (
      "will be transformed to this:"
    ),

    (
      "The structure of the project right now looks like this: "
    ),


    "That's it for the lesson!"
  ],
  [
    'Basic rendering',

    <Fragment>
      Let's teach our library render things.
      <CodeWrap>React</CodeWrap>uses<CodeWrap>ReactDOM</CodeWrap>
      to render the main component of the application <br/>
      We usually write something like this:
    </Fragment>,

    <Fragment>
      Basically, we need to create our version of <CodeWrap>render</CodeWrap> function. But first we
      need to understand how to handle different types:
    </Fragment>,

    "We won't render components right now. It'll be implemented later.",
    
    <Fragment>
      Let's create helper function <CodeWrap>mount</CodeWrap>
    </Fragment>,

    "Without it we would have to check if the component has a parent or not all the time.",

    <Fragment>
      Then we create <CodeWrap>render</CodeWrap> function: < br />
    </Fragment>,

    [
      <Paragraph>
        On the line <CodeWrap>6</CodeWrap>, we handle<CodeWrap>undefined</CodeWrap>,
        <CodeWrap>null</CodeWrap>,<CodeWrap>NaN</CodeWrap>and render
        empty string.
      </Paragraph>,
      <Paragraph>
        On the line<CodeWrap>10</CodeWrap>, we handle<CodeWrap>string</CodeWrap>,
        <CodeWrap>number</CodeWrap>, <CodeWrap>boolean</CodeWrap> and render an
        empty string if the value is a boolean and equal to <CodeWrap>false</CodeWrap>.
        Otherwise, the value is rendered.
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>18-19</CodeWrap>, we handle <CodeWrap>tags</CodeWrap>. Here we also check if the
        <CodeWrap>VDOM</CodeWrap>is an object 
        (line <CodeWrap>19</CodeWrap>) and if it is, we render the string representation of the object.
      </Paragraph>,
      <Paragraph>
        On the line <CodeWrap>27</CodeWrap>, we create<CodeWrap>dom</CodeWrap>element through 
        <CodeWrap>document.createElement</CodeWrap>.Then, we iterate through props
        and set each prop to newly created node. Then, we iterate through children
        and render them too.
      </Paragraph>,
      <Paragraph>
        On the line <CodeWrap>30</CodeWrap>, we use helper function <CodeWrap>setProp</CodeWrap>. 
        Here's the code of it: 
      </Paragraph>,
    ],

    <Fragment>
      Right now this function handles styles, events and basic attributes.  
      <CodeWrap>keys</CodeWrap>,<CodeWrap>refs</CodeWrap>
      and other specific props will be implemented later.
      We also create <CodeWrap>setEventListener</CodeWrap> function to encapsulate 
      event listeners functionality.
    </Fragment>,

    "Right now the function can render everything from this list",

    "You can check the result on Codesandbox:",

    <Fragment>
      P.S. Don't forget to import <CodeWrap>createElement</CodeWrap>in all files with<CodeWrap>JSX</CodeWrap>.
      Without the function, the application wouldn't know how to handle<CodeWrap>JSX</CodeWrap>properly!
    </Fragment>
  ],
  [
    "Basic reconciliation", 

    <Fragment>
      Our next step is to write a function to update the<CodeWrap>DOM</CodeWrap> reflecting on the changes in the<CodeWrap>VDOM</CodeWrap>
    </Fragment>,

    "Firstly, we need to figure out the behavior of the reconciliation of the different types",

    <Fragment>
      There are 2 types of nodes we can find in<CodeWrap>DOM</CodeWrap>right now: <CodeWrap>Text</CodeWrap>and<CodeWrap>HTML tags</CodeWrap>.
    </Fragment>,

    "If the node is a type of text, we need to check if it's the same text, and rerender if it's not",

    "Let's start with the helper function with the functionality of replacing old nodes and a constant to check node types.",

    <Fragment>
      First iteration of the<CodeWrap>reconcile</CodeWrap>function:
    </Fragment>,

    <Fragment>
      As you can see, we check if the<CodeWrap>textContent</CodeWrap>of the nodes is the same. Then rerender it if it's not.
    </Fragment>,

    "For tags, we need to check if they're the same tags. If not - rerender",

    <Fragment>
      If the<CodeWrap>DOM</CodeWrap>node is not a tag, then replace it with the<CodeWrap>VDOM</CodeWrap>node.
    </Fragment>,

    <Fragment>
      If the tags are the same, we need to update props by using function <CodeWrap>setProp</CodeWrap> and reconcile children due to their position. <br /> We add<CodeWrap>keys</CodeWrap>in further lessons.
    </Fragment>,

    <Fragment>
      Second iteration of the <CodeWrap>reconcile</CodeWrap> function:
    </Fragment>,

    [
      <Paragraph noMargin>
        On the lines<CodeWrap>13-15</CodeWrap>, we replace srting-node and everything <CodeWrap>falsy</CodeWrap>.
      </Paragraph>,
      <Paragraph noMargin>
        On the lines<CodeWrap>17-19</CodeWrap>, we handle replacing different tags.
      </Paragraph>,
      <Paragraph noMargin>
        On the lines<CodeWrap>24-27</CodeWrap>, we handle reconciliation of the same tags.
      </Paragraph>,
      <Paragraph noMargin>
        On the lines<CodeWrap>31-36</CodeWrap>, we store previous children to reconcile them on lines <CodeWrap>46-52</CodeWrap>
        by checking their "<CodeWrap>keys</CodeWrap>" ( we add the support of the normal keys in the future chapters). On the lines <CodeWrap>55-57</CodeWrap>
        we remove old children.
      </Paragraph>,
      <Paragraph noMargin>
        On line <CodeWrap>38</CodeWrap>we remove old node attributes to set new one on line <CodeWrap>44</CodeWrap>.
      </Paragraph>,
      <Paragraph noMargin>
        On line <CodeWrap>39-42</CodeWrap>we remove old event listeners.
      </Paragraph>,
    ],

    <Fragment>
      Right now our code can correlate the<CodeWrap>DOM</CodeWrap>to the changes made in the <CodeWrap>VDOM</CodeWrap>
    </Fragment>,

    "Tests for reconciliation:",
    "Codesandbox:",
  ]
]