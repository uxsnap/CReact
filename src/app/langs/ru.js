import { Fragment, createElement } from "../../main/render";
import { CodeWrap } from "../components";

export default [
  {
    title: "Введение",
    
    hey: "Привет! Вы, наверное, уже знакомы с самой популярной библиотеке для фронтенда",

    doYouWant: "Хотите узнать, как она работает изнутри?",
    
    explanation: (
      <Fragment>
        Эта серия уроков поможет вам создать свою собственную версию библиотеки для фронтенда, 
        подобную<CodeWrap>React</CodeWrap>. 
        Настоящий<CodeWrap>React</CodeWrap>использует<CodeWrap>fibers</CodeWrap>, 
        чтобы контролировать поток приложения. 
        Мы не будем это реализовывать. 
        Вместо этого эта серия будет сосредоточена на понимании основных концепций библиотеки - 
        <CodeWrap>render</CodeWrap>и<CodeWrap>reconciliation</CodeWrap>. 
        После завершения всех глав вы сможете создать свой собственный<CodeWrap>Todo</CodeWrap>!
      </Fragment>
    ),
    
    firstly: (
      "В первую очередь нам нужно установить необходимые пакеты, создать папку и настроить окружение:"
    ),
    
    webpackCli: (
      "Запустите webpack-cli с этими ответами:"
    ),
    
    packagesJSX: (
      "Также нам нужно установить пакеты, которые помогут нам парсить JSX:"
    ),
    
    babelRc: (
      <Fragment>
        Обновленный<CodeWrap>.babelrc</CodeWrap>:
      </Fragment>
    ),
    
    indexHTML: (
      <Fragment>
        Обновленный<CodeWrap>index.html</CodeWrap>:
      </Fragment>
    ),
    
    projectStructure: (
      "Общая структура проекта:"
    ),
    
    mainDir: (
      <Fragment>
        Затем создадим каталог<CodeWrap>main</CodeWrap> 
        внутри папки<CodeWrap>src</CodeWrap>.<br />
        Там создадим файл<CodeWrap>render.js</CodeWrap>, 
        где будет происходить весь рендеринг.
      </Fragment>
    ),
    
    createElement: (
      <Fragment>
        Основная цель <CodeWrap>createElement</CodeWrap> - обеспечить возможность работы с узлами 
        <CodeWrap>VDOM</CodeWrap>. 
        Таким образом, JSX, подобный этому:
      </Fragment>
    ),
    
    willBeTransformed: (
      "будет преобразован в это:"
    ),
    
    projectStructure: (
      "Структура проекта в данный момент выглядит так: "
    ),
    
    
    thatsIt: "На этом пока все!"
  }    
]