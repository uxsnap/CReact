import { Fragment, createElement } from "../../main/render";
import { CodeWrap, Paragraph } from "../components";

export default [
  [
    "CReact",
    "Создай собственную фронтенд библиотеку с нуля!",
    "Начать"
  ],
  [
    "Введение",
    
    "Привет! Вы, наверное, уже знакомы с самой популярной библиотекой для фронтенда",

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
        На строке <CodeWrap>6</CodeWrap> мы обрабатываем<CodeWrap>undefined</CodeWrap>,
        <CodeWrap>null</CodeWrap>,<CodeWrap>NaN</CodeWrap>и отрисовываем пустую строку.
      </Paragraph>,
      <Paragraph>
        На строке<CodeWrap>10</CodeWrap> мы обрабатываем<CodeWrap>string</CodeWrap>,
        <CodeWrap>number</CodeWrap>,<CodeWrap>boolean</CodeWrap>и отрисовываем пустую строку,
        если значение является типом <CodeWrap>boolean</CodeWrap> и равно <CodeWrap>false</CodeWrap>. Иначе значение отрисовывается.
      </Paragraph>,
      <Paragraph>
        На строках <CodeWrap>18-19</CodeWrap> мы обрабатываем <CodeWrap>тэги</CodeWrap>. Здесь мы также проверяем, является ли
        <CodeWrap>VDOM</CodeWrap>объектом (строка <CodeWrap>19</CodeWrap>), и если это так, то отрисовываем строковое представление объекта.
      </Paragraph>,
      <Paragraph>
        На строке <CodeWrap>27</CodeWrap> мы создаем элемент<CodeWrap>dom</CodeWrap>через
        <CodeWrap>document.createElement</CodeWrap>.Затем мы перебираем атрибуты и устанавливаем каждое атрибут для
        вновь созданной ноды. Затем мы перебираем дочерние элементы и также рендерим их.
      </Paragraph>,
      <Paragraph>
        На строке <CodeWrap>30</CodeWrap> мы используем вспомогательную функцию <CodeWrap>setProp</CodeWrap>.
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
        На строках<CodeWrap>13-15</CodeWrap> мы заменяем строковый узел и все <CodeWrap>falsy</CodeWrap> значения.
      </Paragraph>,
      <Paragraph noMargin>
        На строках<CodeWrap>17-19</CodeWrap> мы обрабатываем замену разных тегов.
      </Paragraph>,
      <Paragraph noMargin>
        На строках<CodeWrap>24-27</CodeWrap> мы обрабатываем согласование одинаковых тегов.
      </Paragraph>,
      <Paragraph noMargin>
        На строках<CodeWrap>31-36</CodeWrap> мы сохраняем предыдущие дочерние элементы, чтобы согласовать их на строках <CodeWrap>46-52</CodeWrap>
        путем проверки их <CodeWrap>ключей</CodeWrap> (мы добавим поддержку ключей в будущих главах). На строках <CodeWrap>55-57</CodeWrap>
        мы удаляем старые дочерние элементы.
      </Paragraph>,
      <Paragraph noMargin>
        На строке <CodeWrap>38</CodeWrap> мы удаляем атрибуты старого узла, чтобы установить новые на строке <CodeWrap>44</CodeWrap>.
      </Paragraph>,
      <Paragraph noMargin>
        На строках <CodeWrap>39-42</CodeWrap> мы удаляем старые обработчики событий.
      </Paragraph>,
    ],
    
    <Fragment>
      В данный момент наш код может связывать<CodeWrap>DOM</CodeWrap>с изменениями, внесенными в <CodeWrap>VDOM</CodeWrap>.
    </Fragment>,

    "Тесты:",
    "Codesandbox:",
  ],
  [
    "Компоненты",
    <Fragment>
      В этой главе мы научимся обрабатывать компоненты в <CodeWrap>JSX</CodeWrap>.
    </Fragment>,

    <Fragment>
      Компоненты могут быть экземплярами<CodeWrap>Function</CodeWrap>или<CodeWrap>Class</CodeWrap>.
      Парсер<CodeWrap>JSX</CodeWrap>обрабатывает оба типа как функции. Сначала будем обрабатывать компоненты в<CodeWrap>render</CodeWrap>.
    </Fragment>,

    [
      <Paragraph>На строках<CodeWrap>21-25</CodeWrap>мы вызываем отдельную функцию для обработки компонентов -<CodeWrap>renderComponent</CodeWrap>.</Paragraph>,
      <Paragraph>На строках<CodeWrap>27-34</CodeWrap>мы обрабатываем<CodeWrap>Fragments</CodeWrap>. 
        <CodeWrap>Fragment</CodeWrap> не имеет атрибутов, поэтому мы должны пропустить установку новых аттрибутов, 
        если элемент является фрагментом.
      </Paragraph>
    ],

    <Fragment>
      В функции<CodeWrap>renderComponent</CodeWrap>мы проверяем, является ли компонент экземпляром класса<CodeWrap>Component</CodeWrap> -
      класс, который будет обрабатывать компоненты с состоянием. В ином случае, мы вызываем функцию с пропами как функциональный компонент. 
      Также есть определенный проп компонентов -<CodeWrap>children</CodeWrap>. Его можно обрабатывать, добавив<CodeWrap>vdom.children</CodeWrap>к<CodeWrap>props</CodeWrap>компонента.
    </Fragment>,

    [
      <Paragraph>На строке<CodeWrap>2</CodeWrap>мы добавляем<CodeWrap>children</CodeWrap>к другим пропам</Paragraph>,
      <Paragraph>На строках<CodeWrap>4-10</CodeWrap>мы создаем экземпляр классового компонента и добавляем специальные поля в экземпляр.
      Очень затратно пересоздавать классовые компоненты постоянно, поэтому эти поля помогут нам согласовывать классовые компоненты без пересоздания экземпляра.</Paragraph>,
      <Paragraph>На строках<CodeWrap>12-15</CodeWrap>мы создаем функциональные компоненты.</Paragraph>
    ],
  
    <Fragment>Также добавим определенный функциональный компонент -<CodeWrap>Fragment</CodeWrap>.</Fragment>,

    <Fragment>Затем нам нужно обновить функцию <CodeWrap>reconcile</CodeWrap>для обработки компонентов.
    Также мы создадим вспомогательную функцию - <CodeWrap>reconcileComponent</CodeWrap> - для согласования компонентов.</Fragment>,

    <Fragment>Здесь мы проверяем, совпадают ли экземпляры в <CodeWrap>dom</CodeWrap>и<CodeWrap>vdom</CodeWrap>.
    Если они не совпадают, нам нужно создать новый экземпляр. Если экземпляры совпадают, мы должны согласовать старый экземпляр с новыми пропами.
    </Fragment>,

    <Fragment>И, наконец, нам нужно добавить класс <CodeWrap>Component</CodeWrap>. Код файла довольно простой.
    Нам просто нужно присвоить <CodeWrap>props</CodeWrap> передаваемые свойства и <CodeWrap>__dom</CodeWrap> значение <CodeWrap>null</CodeWrap>.
    </Fragment>,

    <Fragment>Со всем этим мы можем обновить наши тесты <CodeWrap>render</CodeWrap>и<CodeWrap>reconcile</CodeWrap>.</Fragment>,

    <Fragment>Codesandbox:</Fragment>

  ],
  [
    "Cостояние",

    <Fragment>
      В этой главе мы добавим<CodeWrap>состояние</CodeWrap>и 
      <CodeWrap>хуки жизненного цикла</CodeWrap>в наши компоненты, 
      чтобы мы наконец смогли написать<CodeWrap>Todo</CodeWrap>!
    </Fragment>,


    <Fragment>
      <CodeWrap>Состояние</CodeWrap>компонента будет обрабатываться в классе<CodeWrap>Component</CodeWrap>.
    </Fragment>,

    [
      <Paragraph>
        На строках <CodeWrap>8-10</CodeWrap>мы добавляем поле<CodeWrap>state</CodeWrap>и специальное поле<CodeWrap>__CALL_QUEUE</CodeWrap>. 
        Основная цель поля<CodeWrap>__CALL_QUEUE</CodeWrap> - содержать все изменения<CodeWrap>state</CodeWrap>,
        которые происходят внутри компонента.
      </Paragraph>,
      <Paragraph>
        На строках<CodeWrap>23-28</CodeWrap>мы добавляем новые изменения<CodeWrap>state</CodeWrap>в очередь. 
        <CodeWrap>requestIdleCallback</CodeWrap>запустит callback, когда главный поток свободен.
      </Paragraph>,
      <Paragraph>
        На строках <CodeWrap>13-21</CodeWrap><CodeWrap>state</CodeWrap>будет обновлен объединением всех изменений, содержащихся в 
        <CodeWrap>__CALL_QUEUE</CodeWrap>. После этого мы обновим компонент и переназначим необходимые специальные поля.
      </Paragraph>
    ],

    <Fragment>
      Теперь у классовых компонентов есть состояние.Также были добавлены методы жизненного цилка.
      Большинство из них ничего не делают, как и должны. Нам нужно только указать значение<CodeWrap>return</CodeWrap> 
      для<CodeWrap>shouldComponentUpdate</CodeWrap>и<CodeWrap>getSnapshotBeforeUpdate</CodeWrap>, 
      как рекомендуется в документации<CodeWrap>React</CodeWrap>.
    </Fragment>,

    <Fragment>
      Давайте также создадим<CodeWrap>PureComponent</CodeWrap>. Основное отличие между классическим компонентом и
      "чистым" в методе<CodeWrap>shouldComponentUpdate</CodeWrap>.
      <CodeWrap>PureComponent</CodeWrap>делает поверхностное сравнение старых и новых свойств, старого и нового состояния и "согласует"(reconcile), если объекты не равны.
    </Fragment>,

    <Fragment>Последнее, что нам нужно сделать, это добавить вызовы методов жизненного цикла в функции<CodeWrap>render</CodeWrap></Fragment>,
  
    [
      <Paragraph>
      На строке<CodeWrap>7</CodeWrap>мы вызываем<CodeWrap>getDerivedStateFromProps</CodeWrap>,
      чтобы создать<CodeWrap>state</CodeWrap>через объект<CodeWrap>props</CodeWrap>.
      </Paragraph>,
      <Paragraph>
      На строке<CodeWrap>12</CodeWrap>мы вызываем<CodeWrap>componentDidMount</CodeWrap>после того,
      как наш только что созданный компонент был монтирован в<CodeWrap>DOM</CodeWrap>.
      </Paragraph>,
    ],

    <Fragment>Код для<CodeWrap>getDerivedStateFromProps</CodeWrap>:</Fragment>,

    <Fragment>
      В<CodeWrap>reconcile</CodeWrap>
      нам нужно вызвать<CodeWrap>componentWillUnmount</CodeWrap>перед уничтожением компонентов:
    </Fragment>,

    <Fragment>
      В функции<CodeWrap>reconcileClassComponent</CodeWrap>:
    </Fragment>,

    [
      <Paragraph>
        На строке<CodeWrap>6</CodeWrap>мы вызываем<CodeWrap>getDerivedStateFromProps</CodeWrap>.
      </Paragraph>,
      <Paragraph>
        На строке<CodeWrap>11</CodeWrap>мы вызываем<CodeWrap>getSnapshotBeforeUpdate</CodeWrap>. 
        Метод возвращает<CodeWrap>null</CodeWrap>или<CodeWrap>snapshot</CodeWrap>
        относительно предыдущих свойств и состояния.
      </Paragraph>,
      <Paragraph>
        На строках<CodeWrap>13-15</CodeWrap>мы вызываем<CodeWrap>shouldComponentUpdate</CodeWrap>. 
        Метод возвращает<CodeWrap>boolean</CodeWrap>значение и используется в основном для оптимизации повторного рендеринга.
      </Paragraph>,
      <Paragraph>
        На строке<CodeWrap>19</CodeWrap>мы вызываем<CodeWrap>componentDidUpdate</CodeWrap>. 
        Если метод<CodeWrap>shouldComponentUpdate</CodeWrap>возвращает<CodeWrap>true</CodeWrap>,
        то компонент вызовет метод<CodeWrap>componentDidUpdate</CodeWrap>после согласования.
      </Paragraph>,
    ],

    <Fragment>
      Кроме того, нам нужно обновить функцию<CodeWrap>setProp</CodeWrap>, чтобы компоненты<CodeWrap>input</CodeWrap>могли правильно обрабатывать свойство<CodeWrap>value</CodeWrap>.
    </Fragment>,

    <Fragment>Со всеми изменениями можно наконец создать<CodeWrap>Todo</CodeWrap>.</Fragment>,

    "Codesandbox:",
    
    <Fragment>
      P.S. Есть еще свойства, которые наши компоненты пока не могут обрабатывать, и баги, которые нужно поправить. 
      Мы сделаем это в следующей главе. <CodeWrap>onChange</CodeWrap>работает не так, как ожидается (колбэк вызывается, когда инпут теряет фокус).
      Правильное поведение будет реализовано в следующей главе.
    </Fragment>
  ],
  [
    "Обработка props",

    <Fragment>
      В этой главе мы обновим наш код, чтобы обрабатывать <CodeWrap>keys</CodeWrap>, <CodeWrap>refs</CodeWrap> и другие пропы, которые наши компоненты еще не могут обрабатывать.
    </Fragment>,

    <Fragment>
      Начнем с <CodeWrap>dangerouslySetInnerHTML</CodeWrap>.
    </Fragment>,

    <Fragment>Нам нужно проверить поле<CodeWrap>__html</CodeWrap>и присвоить его<CodeWrap>innerHTML</CodeWrap></Fragment>,

    <Fragment>Затем добавим определенные props, которые будут присвоены объекту <CodeWrap>dom</CodeWrap>. 
    Также давайте добавим свойство <CodeWrap>ref</CodeWrap> - будем обрабатывать как версию с колбэком, так и объектную.</Fragment>,

    [
      <Paragraph>На строках <CodeWrap>13-16</CodeWrap> мы добавляем свойство <CodeWrap>className</CodeWrap>. Нет атрибутов, подобных <CodeWrap>className</CodeWrap>, поэтому его необходимо обрабатывать по-другому - как поле объекта.</Paragraph>,
      <Paragraph>На строках <CodeWrap>18-26</CodeWrap> мы добавляем свойство <CodeWrap>ref</CodeWrap>. Сначала мы проверяем, является ли <CodeWrap>value</CodeWrap> функцией, и вызываем ее, если это так. В противном случае мы присваиваем<CodeWrap>dom</CodeWrap>полю<CodeWrap>current</CodeWrap>.</Paragraph>
    ],

    <Fragment>Функция <CodeWrap>createRef</CodeWrap>:</Fragment>,

    <Fragment>
      Наконец, давайте добавим поддержку <CodeWrap>key</CodeWrap>. Основная цель <CodeWrap>key</CodeWrap> - помощь в согласовании дочерних компонентов. Поэтому мы также должны обновить функцию <CodeWrap>reconcile</CodeWrap>.
    </Fragment>,

    <Fragment>Также нам нужно обновить другие функции для обработки ключей.</Fragment>,

    [
      <Paragraph>
      На строках <CodeWrap>39-41</CodeWrap>, дочерний элемент в dom записывается в <CodeWrap>curChildNodes</CodeWrap> по ключу.
      </Paragraph>,
      <Paragraph>
      На строках <CodeWrap>52-62</CodeWrap>, мы проверяем, находится ли новый дочерний элемент в <CodeWrap>curChildNodes</CodeWrap>. Если нет, то мы его рендерим, в противном случае мы должны его обновить.
      </Paragraph>,
      <Paragraph>
      На строках <CodeWrap>64-69</CodeWrap>, неотмеченные дочерние элементы удаляются из DOM.
      </Paragraph>,
    ],

    <Fragment>
      Кроме того, <CodeWrap>React</CodeWrap>обрабатывает<CodeWrap>onChange</CodeWrap> о-другому - как событие<CodeWrap>input</CodeWrap>.
    </Fragment>,

    "Codesandbox:",

    "Теперь наш код поддерживает конкретные свойства, и Todo работает как ожидается."
  ]
]