import { Fragment, createElement } from "../../main/render";
import { CodeWrap, Paragraph } from "../components";

export default [
  [
    "Введение",
    
    "Привет! Вы, наверное, уже знакомы с самой популярной библиотеке для фронтенда",

    "Хотите узнать, как она работает изнутри?",
    
    (
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
    
    (
      "В первую очередь нам нужно установить необходимые пакеты, создать папку и настроить окружение:"
    ),
    
    (
      "Запустите webpack-cli с этими ответами:"
    ),
    
    (
      "Также нам нужно установить пакеты, которые помогут нам парсить JSX:"
    ),
    
    (
      <Fragment>
        Обновленный<CodeWrap>.babelrc</CodeWrap>:
      </Fragment>
    ),
    
    (
      <Fragment>
        Обновленный<CodeWrap>index.html</CodeWrap>:
      </Fragment>
    ),
    
    (
      "Общая структура проекта:"
    ),
    
    (
      <Fragment>
        Затем создадим каталог<CodeWrap>main</CodeWrap> 
        внутри папки<CodeWrap>src</CodeWrap>.<br />
        Там создадим файл<CodeWrap>render.js</CodeWrap>, 
        где будет происходить весь рендеринг.
      </Fragment>
    ),
    
    (
      <Fragment>
        Основная цель <CodeWrap>createElement</CodeWrap> - обеспечить возможность работы с узлами 
        <CodeWrap>VDOM</CodeWrap>. 
        Таким образом, JSX, подобный этому:
      </Fragment>
    ),
    
    (
      "будет преобразован в это:"
    ),
    
    (
      "Структура проекта в данный момент выглядит так: "
    ),
    
    
    "На этом пока все!"
  ],
  [
    'Базовый рендеринг',

    <Fragment>
      Давайте научим нашу библиотеку рендерить элементы.
      <CodeWrap>React</CodeWrap>использует<CodeWrap>ReactDOM</CodeWrap>,
      чтобы отрисовать главный компонент приложения.<br/>
      Обычно мы пишем что-то вроде этого:
    </Fragment>,

    <Fragment>
      Нам нужно создать нашу версию функции <CodeWrap>render</CodeWrap>. Но прежде чем мы это сделаем,
      нужно понять, как обрабатывать различные типы:
    </Fragment>,

    "Пока мы не будем рендерить компоненты. Это будет реализовано позже.",

    <Fragment>
      Давайте создадим вспомогательную функцию <CodeWrap>mount</CodeWrap>
    </Fragment>,

    "Без нее нам пришлось бы все время проверять, имеет ли компонент родительский элемент или нет.",

    <Fragment>
      Затем мы создаем функцию <CodeWrap>render</CodeWrap>:<br/>
    </Fragment>,

    [
      <Paragraph>
        В строке <CodeWrap>6</CodeWrap> мы обрабатываем<CodeWrap>undefined</CodeWrap>,
        <CodeWrap>null</CodeWrap>,<CodeWrap>NaN</CodeWrap>и отрисовываем пустую строку.
      </Paragraph>,
      <Paragraph>
        В строке<CodeWrap>10</CodeWrap> мы обрабатываем<CodeWrap>string</CodeWrap>,
        <CodeWrap>number</CodeWrap>,<CodeWrap>boolean</CodeWrap>и отрисовываем пустую строку,
        если значение является типом <CodeWrap>boolean</CodeWrap> и равно <CodeWrap>false</CodeWrap>. Иначе значение отрисовывается.
      </Paragraph>,
      <Paragraph>
        В строках <CodeWrap>18-19</CodeWrap> мы обрабатываем <CodeWrap>тэги</CodeWrap>. Здесь мы также проверяем, является ли
        <CodeWrap>VDOM</CodeWrap>объектом (строка <CodeWrap>19</CodeWrap>), и если это так, то отрисовываем строковое представление объекта.
      </Paragraph>,
      <Paragraph>
        В строке <CodeWrap>27</CodeWrap> мы создаем элемент<CodeWrap>dom</CodeWrap>через
        <CodeWrap>document.createElement</CodeWrap>.Затем мы перебираем атрибуты и устанавливаем каждое атрибут для
        вновь созданной ноды. Затем мы перебираем дочерние элементы и также рендерим их.
      </Paragraph>,
      <Paragraph>
        В строке <CodeWrap>30</CodeWrap> мы используем вспомогательную функцию <CodeWrap>setProp</CodeWrap>.
        Вот ее код:
      </Paragraph>,
    ],

    <Fragment>
      В данный момент эта функция обрабатывает стили, события и основные атрибуты. 
      <CodeWrap>keys</CodeWrap>, <CodeWrap>refs</CodeWrap> и другие специальные пропы будут реализованы позже.
      Мы также создали функцию <CodeWrap>setEventListener</CodeWrap>, чтобы инкапсулировать функциональность обработки событий.
    </Fragment>,

    "На данный момент функция может рендерить все, что есть в этом списке:",

    "Вы можете проверить результат на Codesandbox:",

    <Fragment>
      P.S. Не забудьте импортировать <CodeWrap>createElement</CodeWrap> во всех файлах с <CodeWrap>JSX</CodeWrap>.
      Без этой функции приложение не будет знать, как правильно обрабатывать <CodeWrap>JSX</CodeWrap>!
    </Fragment>
  ],
  [
    "Согласование",

    <Fragment>
      Наш следующий шаг - написать функцию для обновления<CodeWrap>DOM</CodeWrap>, отражающую изменения в<CodeWrap>VDOM</CodeWrap>.
    </Fragment>,

    "Во-первых, нам нужно выяснить поведение согласования разных типов",

    <Fragment>
      Сейчас в<CodeWrap>DOM</CodeWrap> есть 2 типа узлов: <CodeWrap>Текстовые узлы</CodeWrap>и<CodeWrap>HTML-теги</CodeWrap>.
    </Fragment>,

    "Если узел является текстовым типом, нам нужно проверить, эквивалентен ли текст в VDOM, и перерендерить узел, если это не так",

    "Давайте начнем со вспомогательной функции с функциональностью замены старых узлов и константы для проверки типов узлов.",

    <Fragment>
      Первая итерация функции<CodeWrap>reconcile</CodeWrap>:
    </Fragment>,

    <Fragment>
      Как вы можете видеть, мы проверяем, является ли<CodeWrap>textContent</CodeWrap>узлов таким же. Затем ререндерим узел, если это не так.
    </Fragment>,

    "Для тегов нам нужно проверить, являются ли они одними и теми же тегами. Если нет - перерендер",

    <Fragment>
      Если узел<CodeWrap>DOM</CodeWrap>не является тегом, то заменяем его узлом<CodeWrap>VDOM</CodeWrap>.
    </Fragment>,

    <Fragment>
      Если теги одинаковы, мы должны обновить свойства, используя функцию <CodeWrap>setProp</CodeWrap> и согласовать детей в соответствии с их позицией. <br /> Мы добавим <CodeWrap>ключи</CodeWrap> в дальнейших уроках.
    </Fragment>,

    <Fragment>
      Вторая итерация функции<CodeWrap>reconcile</CodeWrap>:
    </Fragment>,

    [
      <Paragraph noMargin>
        В строках<CodeWrap>13-15</CodeWrap> мы заменяем строковый узел и все <CodeWrap>falsy</CodeWrap> значения.
      </Paragraph>,
      <Paragraph noMargin>
        В строках<CodeWrap>17-19</CodeWrap> мы обрабатываем замену разных тегов.
      </Paragraph>,
      <Paragraph noMargin>
        В строках<CodeWrap>24-27</CodeWrap> мы обрабатываем согласование одинаковых тегов.
      </Paragraph>,
      <Paragraph noMargin>
        В строках<CodeWrap>31-36</CodeWrap> мы сохраняем предыдущие дочерние элементы, чтобы согласовать их на строках <CodeWrap>46-52</CodeWrap>
        путем проверки их <CodeWrap>ключей</CodeWrap> (мы добавим поддержку ключей в будущих главах). На строках <CodeWrap>55-57</CodeWrap>
        мы удаляем старые дочерние элементы.
      </Paragraph>,
      <Paragraph noMargin>
        В строке <CodeWrap>38</CodeWrap> мы удаляем атрибуты старого узла, чтобы установить новые на строке <CodeWrap>44</CodeWrap>.
      </Paragraph>,
      <Paragraph noMargin>
        В строках <CodeWrap>39-42</CodeWrap> мы удаляем старые обработчики событий.
      </Paragraph>,
    ],
    
    <Fragment>
      В данный момент наш код может связывать<CodeWrap>DOM</CodeWrap>с изменениями, внесенными в <CodeWrap>VDOM</CodeWrap>.
    </Fragment>,

    "Тесты:",
    "Codesandbox:",
  ]
]