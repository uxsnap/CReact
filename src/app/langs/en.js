import { Fragment, createElement } from "../../main/render";
import { CodeWrap, Paragraph } from "../components";
import { INSPIRED_BY } from '../utils';

export default [
  [
    "CReact",
    "Create your own frontend library from scratch!",
    "Get stared"
  ],
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
    "Reconciliation", 

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
  ],
  [
    "Components",

    <Fragment>
      In this chapter, we will learn how to handle components in the <CodeWrap>JSX</CodeWrap>.
    </Fragment>,

    <Fragment>
      The components can be instances of<CodeWrap>Function</CodeWrap>or<CodeWrap>Class</CodeWrap>.
      <CodeWrap>JSX</CodeWrap> parser can handle both types as functions. Firstly,
      we need to handle functions in a<CodeWrap>render</CodeWrap> function.
    </Fragment>,

    [
      <Paragraph>On the lines <CodeWrap>21-25</CodeWrap>, we call separate function to handle components - <CodeWrap>renderComponent</CodeWrap>.</Paragraph>,
      <Paragraph>On the lines<CodeWrap>27-34</CodeWrap>, we're handling<CodeWrap>Fragments</CodeWrap>. 
        The <CodeWrap>Fragment</CodeWrap> doesn't have attributes so we need to skip <CodeWrap>setProp</CodeWrap>
        if the element is fragment.
      </Paragraph>
    ],

    <Fragment>
      In function<CodeWrap>renderComponent</CodeWrap>, we check if the component is an
      instance of <CodeWrap>Component</CodeWrap> class - the class that will handle stateful components.
      If it's not, we call function with the props as a functional component. Also, there is a specific prop of the components -
      <CodeWrap>children</CodeWrap>. It can be added through adding<CodeWrap>vdom.children</CodeWrap>to the <CodeWrap>props</CodeWrap> 
      of the component. 
    </Fragment>,

   [
      <Paragraph>On the line <CodeWrap>2</CodeWrap>, we add <CodeWrap>children</CodeWrap> to the other props</Paragraph>,
      <Paragraph>On the lines <CodeWrap>4-10</CodeWrap>, we create instance of the class component 
        and add specific fields to the instance. It's very expensive to recreate class components all the time
        so this fields will help us<CodeWrap>reconcile</CodeWrap>class components without recreation of the instance.</Paragraph>,
      <Paragraph>On the lines <CodeWrap>12-15</CodeWrap>, we create functional components. It's simple - we just need to pass 
      props as the arguments of the function.</Paragraph>
    ],

    <Fragment>Also, let's not forget to add specific functional component - <CodeWrap>Fragment</CodeWrap>.</Fragment>,

    <Fragment>Then we need to update <CodeWrap>reconcile</CodeWrap> function to handle components.
    We also create helper function - <CodeWrap>reconcileComponent</CodeWrap> - to handle reconciliation of the components.</Fragment>,

    <Fragment>Here we check if the instances of the<CodeWrap>dom</CodeWrap>and<CodeWrap>vdom</CodeWrap>are the same.
      If they're not, we need to render a new one. If the instances are the same, we have to reconcile old one with the new props.
    </Fragment>,

    <Fragment>And finally, we need to add <CodeWrap>Component</CodeWrap> class. The code of the file is pretty simple.
      We only need to assign <CodeWrap>props</CodeWrap> to the coming props and <CodeWrap>__dom</CodeWrap> to <CodeWrap>null</CodeWrap>. 
    </Fragment>,

    <Fragment>With all that, we can now update our tests of <CodeWrap>render</CodeWrap> and <CodeWrap>reconcile</CodeWrap>.</Fragment>,

    <Fragment>Codesandbox:</Fragment>
  ],
  [
    "State",

    <Fragment>
      In this chapter, we will add<CodeWrap>state</CodeWrap> and 
      <CodeWrap>lifecycle hooks</CodeWrap>to our components, 
      so we can finally write a<CodeWrap>Todo</CodeWrap>!
    </Fragment>,


    <Fragment>
      The<CodeWrap>state</CodeWrap>of the component will be handled in the<CodeWrap>Component</CodeWrap>class.
    </Fragment>,

    [
      <Paragraph>
        On the lines <CodeWrap>8-10</CodeWrap>, 
        we add the<CodeWrap>state</CodeWrap>field and the special field <CodeWrap>__CALL_QUEUE</CodeWrap>. 
        The<CodeWrap>__CALL_QUEUE</CodeWrap>field's main purpose is 
        to contain all the<CodeWrap>state</CodeWrap>changes 
        that are fired within the component.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>23-28</CodeWrap>, 
        we add new<CodeWrap>state</CodeWrap>changes to the queue. The <CodeWrap>requestIdleCallback</CodeWrap> will fire its callback when the main thread is idle.
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>13-21</CodeWrap>, 
        the <CodeWrap>state</CodeWrap>will be updated with all the changes that were contained in the 
        <CodeWrap>__CALL_QUEUE</CodeWrap>. Following that, 
        we will reconcile the component and reassign necessary special fields.
      </Paragraph>
    ],

    <Fragment>
      Now the class components are stateful. Inside the<CodeWrap>class</CodeWrap>
      lifecycle methods were added. Most of them do nothing as they should. We only need to specify
      <CodeWrap>return</CodeWrap>value of<CodeWrap>shouldComponentUpdate</CodeWrap>and 
      <CodeWrap>getSnapshotBeforeUpdate</CodeWrap>as<CodeWrap>React</CodeWrap>documentation insists. 
    </Fragment>,


    <Fragment>
      Let's also create<CodeWrap>PureComponent</CodeWrap>. The main difference between a classic component and
      a pure one is in the<CodeWrap>shouldComponentUpdate</CodeWrap> method.
      A <CodeWrap>PureComponent</CodeWrap>makes shallow comparison 
      of the old and new props, old and new state, and reconciles if the objects are not the same.
    </Fragment>,


    <Fragment>The last thing we have to do is to add lifecycle method calls to the<CodeWrap>render</CodeWrap>
    and the<CodeWrap>reconcile</CodeWrap>functions.</Fragment>,

    [
      <Paragraph>
        On the line<CodeWrap>7</CodeWrap>, we call<CodeWrap>getDerivedStateFromProps</CodeWrap>to 
        create<CodeWrap>state</CodeWrap>through the<CodeWrap>props</CodeWrap>object.
      </Paragraph>,
      <Paragraph>
        On the line<CodeWrap>12</CodeWrap>, we call<CodeWrap>componentDidMount</CodeWrap>after 
        our freshly created component has been mounted to the<CodeWrap>DOM</CodeWrap>.
      </Paragraph>,
    ],

    <Fragment>The code for the<CodeWrap>getDerivedStateFromProps</CodeWrap>:</Fragment>,

    <Fragment>
      In<CodeWrap>reconcile</CodeWrap>
      we need to call<CodeWrap>componentWillUnmount</CodeWrap>before destroying components:
    </Fragment>,

    <Fragment>
      In<CodeWrap>reconcileClassComponent</CodeWrap>function:
    </Fragment>,

    [
      <Paragraph>
        On the line<CodeWrap>6</CodeWrap>, we call<CodeWrap>getDerivedStateFromProps</CodeWrap>.
      </Paragraph>,
      <Paragraph>
        On the line<CodeWrap>11</CodeWrap>, we call<CodeWrap>getSnapshotBeforeUpdate</CodeWrap>. 
        Method returns<CodeWrap>null</CodeWrap>or<CodeWrap>snapshot</CodeWrap>
        of the previous props and state.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>13-15</CodeWrap>, we call<CodeWrap>shouldComponentUpdate</CodeWrap>. 
        Method returns<CodeWrap>boolean</CodeWrap>value and is used mostly to optimize rerendering.
      </Paragraph>,
      <Paragraph>
        On the line<CodeWrap>19</CodeWrap>, we call<CodeWrap>componentDidUpdate</CodeWrap>. 
        If the method<CodeWrap>shouldComponentUpdate</CodeWrap>returns <CodeWrap>true</CodeWrap>,
        the component will call the<CodeWrap>componentDidUpdate</CodeWrap>method after the reconciliation.
      </Paragraph>,
    ],

    <Fragment>
      Also, we need to update<CodeWrap>setProp</CodeWrap>function so the<CodeWrap>input</CodeWrap>components can handle <CodeWrap>value</CodeWrap>
      prop properly.
    </Fragment>,

    <Fragment>With all the changes, the<CodeWrap>Todo</CodeWrap>can finally be created.</Fragment>,

    "Codesandbox:",

    <Fragment>
      P.S. There are still props that our components can't handle right now and some bugs left to fix.
      We'll do it in the next chapter.<CodeWrap>onChange</CodeWrap>is working unexpectedly (it's working when<CodeWrap>input</CodeWrap>loses focus) 
      but the desired behavior 
      will be implemented in the next chapter.
    </Fragment>
  ],
  [
    "Handling props",

    <Fragment>
      In this chapter we will update our code
      to handle <CodeWrap>keys</CodeWrap>,<CodeWrap>refs</CodeWrap>,
      and other props that our components cannot handle yet"
    </Fragment>,
    
    <Fragment>
      Let's start with infamous<CodeWrap>dangerouslySetInnerHTML</CodeWrap>
    </Fragment>,

    <Fragment>Simple stuff: we just need to validate<CodeWrap>__html</CodeWrap>field and assign it
    to<CodeWrap>innerHTML</CodeWrap></Fragment>,

    <Fragment>Then, let's add  specific props to be assigned to<CodeWrap>dom</CodeWrap>object. 
    Also, let's add the<CodeWrap>ref</CodeWrap>prop - both callback and object versions.</Fragment>,

    [
      <Paragraph>On the lines<CodeWrap>13-16</CodeWrap>, we add a<CodeWrap>className</CodeWrap>
      prop as a field of a dom object because there are no attributes like<CodeWrap>className</CodeWrap>
      so it must be handled differently.</Paragraph>,
      <Paragraph>On the lines<CodeWrap>18-26</CodeWrap>, we add a<CodeWrap>ref</CodeWrap>
      prop. First, we check if the<CodeWrap>value</CodeWrap> is a<CodeWrap>function</CodeWrap>and 
      we call it if it does. Otherwise, we assign dom to the<CodeWrap>current</CodeWrap>field.</Paragraph>
    ],

    <Fragment>And don't forget to create<CodeWrap>createRef</CodeWrap>function.</Fragment>,

    <Fragment>
      Finally, let's add <CodeWrap>key</CodeWrap> support. The main purpose of the<CodeWrap>key</CodeWrap>
      is to help with the reconciliation of a component's children. So, we also need to update
      the<CodeWrap>reconcile</CodeWrap>function.</Fragment>,

    <Fragment>We also need to update other functions to handle keys.</Fragment>,

    [
      <Paragraph>
        On the lines <CodeWrap>39-41</CodeWrap>, child in the dom is stored in the <CodeWrap>curChildNodes</CodeWrap> by the key prop.
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>52-62</CodeWrap>, we check if the new child is in the <CodeWrap>curChildNodes</CodeWrap>. If it's not, we render it, 
        otherwise we need to update it
      </Paragraph>,
      <Paragraph>
        On the lines <CodeWrap>64-69</CodeWrap>, unchecked children are removed from the dom.
      </Paragraph>,
    ],

    <Fragment>
      Also,<CodeWrap>React</CodeWrap>tends to treat<CodeWrap>onChange</CodeWrap>differently - 
      as an<CodeWrap>input</CodeWrap>event.
    </Fragment>,

    "Codesandbox:",

    "Now our code supports specific props and Todo works as expected."
  ],
  [
    "Hooks",

    <Fragment>
      In this chapter, we will add support for <CodeWrap>hooks</CodeWrap> and <CodeWrap>state</CodeWrap> to <CodeWrap>Functional</CodeWrap> components. Nevertheless, while the main concept of<CodeWrap>hooks</CodeWrap>seems different from that of<CodeWrap>class</CodeWrap>components, you will find many similarities between them. The contents of this chapter are heavily inspired by this <a style={{ marginLeft: '5px' }} target="_blank" href={INSPIRED_BY}>post</a>.
    </Fragment>,

    <Fragment>
      First, let's add the file where hooks will be implemented.
    </Fragment>,

    <Fragment>,
      The<CodeWrap>INSTANCE_MAP</CodeWrap>object contains all<CodeWrap>states</CodeWrap>and<CodeWrap>effects</CodeWrap>of the components.<CodeWrap>currentlyRenderingComponent</CodeWrap>is a helper object that will help us figure out which<CodeWrap>useState</CodeWrap>or<CodeWrap>useEffect</CodeWrap>needs to be called at that moment. It also contains the<CodeWrap>token</CodeWrap>of the current component being rendered.
    </Fragment>,

    <Fragment>
      Our next step is to update the<CodeWrap>renderComponent</CodeWrap>function to handle<CodeWrap>Functional</CodeWrap>components with hooks.   
    </Fragment>,

    [
      <Paragraph>
        On line<CodeWrap>17</CodeWrap>, we create the token for the current component.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>19-21</CodeWrap>, we update<CodeWrap>currentlyRenderingComponent</CodeWrap>
        with the<CodeWrap>token</CodeWrap>and initialize indexes.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>64-69</CodeWrap>, we remove unchecked children from the DOM.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>23-28</CodeWrap>, we check if we already have the necessary record
        and create a new one if needed.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>34-39</CodeWrap>, we assign special fields just as we did in
        <CodeWrap>class</CodeWrap>components.
      </Paragraph>,
    ],

    <Fragment>
      Next, we update <CodeWrap>reconcile</CodeWrap>function to handle stateful<CodeWrap>Functional</CodeWrap>
      components.
    </Fragment>,

    [
      <Paragraph>
        On the line<CodeWrap>9</CodeWrap>, we call a new function instead of just rendering the
        <CodeWrap>Functional</CodeWrap> component.
      </Paragraph>,
      <Paragraph>
        On the line<CodeWrap>14</CodeWrap>, we check if the component is the same, just like we did 
        with<CodeWrap>class</CodeWrap>components. If it's not, we replace old component with the new one on the 
        line<CodeWrap>23</CodeWrap>.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>15-21</CodeWrap>, we reinitialize indexes and assign our currently reconciling
        component's token to the<CodeWrap>current</CodeWrap>field. Just before the reconciliation, we update
        our component's props on the line<CodeWrap>22</CodeWrap>.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>6-8</CodeWrap>, during the stage of children reconciliation, we delete the state 
        of the removed component from<CodeWrap>INSTANCE_MAP</CodeWrap>.
      </Paragraph>,
    ],

    <Fragment>
      Before we dive into the implementation of hooks, we need to explain how hooks work in the first place and why we
      need to update fields of the<CodeWrap>currentlyRenderingComponent</CodeWrap>all the time. 
    </Fragment>,

    <Fragment>
      Let's take a look at the renewed<CodeWrap>Todo</CodeWrap>component:
    </Fragment>,

    <Fragment>
      First, the component is rendered by the<CodeWrap>render</CodeWrap>function. 
      All the required fields are updated,
      and the component function is called. 
      When the function executes its code, it calls<CodeWrap>useState</CodeWrap>.
    </Fragment>,

    <Fragment>
      Then, inside<CodeWrap>useState</CodeWrap>, we get the currently rendering component using the
      <CodeWrap>currentlyRenderingComponent</CodeWrap>helper. Here's the code:
    </Fragment>,

    [
      <Paragraph>
        On the lines<CodeWrap>14-18</CodeWrap>, we assign default<CodeWrap>state</CodeWrap> to the
        <CodeWrap>hook</CodeWrap> if it's empty.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>20-22</CodeWrap>, we get the current<CodeWrap>state</CodeWrap>object of 
        the hook and we increment<CodeWrap>stateHookIndex</CodeWrap>so the next hook of the component 
        will get its state.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>27-33</CodeWrap>, we get component's<CodeWrap>instance</CodeWrap>
        and<CodeWrap>dom</CodeWrap>element, then we update the<CodeWrap>state</CodeWrap>of the component
        and reconcile it with the new state.
      </Paragraph>,
    ],

    <Fragment>
      That's the whole code for<CodeWrap>useState</CodeWrap>. 
      Let's now implement<CodeWrap>useEffect</CodeWrap>.
    </Fragment>,

    [
      <Paragraph>
        On the lines<CodeWrap>2-11</CodeWrap>, we again get the state of the current hook, but now from 
        the other object,<CodeWrap>__effects</CodeWrap>.
      </Paragraph>,
      <Paragraph>
        On the line<CodeWrap>22</CodeWrap>, we increment<CodeWrap>effectHookIndex</CodeWrap> so 
        the next hook of the component will get its effect state.
      </Paragraph>,
      <Paragraph>
        On the lines<CodeWrap>13-20</CodeWrap>, we first check if it's a special case of the
        <CodeWrap>useEffect</CodeWrap>hook (empty dependency array) and call its callback function 
        right away. Otherwise, we compare the previous and new dependency values and call the callback if they're
        not the same.
      </Paragraph>,
    ],

    <Fragment>
      And that's it for the hooks! You can check the updated version of the<CodeWrap>Todo</CodeWrap>
      here: 
    </Fragment>
  ]
]