/** @jsx createElement */
const createElement = (type, props, ...children) => ({ type, props: props || {}, children });

const setProp = (dom, prop, value) => {
    // event prop
    if (prop.startsWith('on') && typeof value === 'function') {
        let event = prop.slice(2,).toLowerCase();

        dom.__eventHandlers = dom.__eventHandlers || {};

        dom.removeEventListener(event, dom.__eventHandlers[prop]);
        dom.__eventHandlers[prop] = value;
        dom.addEventListener(event, dom.__eventHandlers[prop]);
        return;
    }

    dom[prop] = value;
};

const render = (vdom, parent) => {
    if (!vdom.type && ['object', 'string', 'number', 'boolean'].includes(typeof vdom)) {
        let el = document.createTextNode(vdom || '');
        parent.appendChild(el);
        return el;
    }

    if (typeof vdom.type === "function" ) {
        return Component.render(vdom, parent);
    }

    if (typeof vdom.type === 'string') {
        const el = document.createElement(vdom.type);

        for (const prop in vdom.props) {
            setProp(el, prop, vdom.props[prop]);
        }

        for (const child of [].concat(...vdom.children)) {
            el.appendChild(render(child, el));
        }

        parent.appendChild(el);
        return el;
    }

    throw new Error('Unexpected token');
};

const update = (vdom, dom, parent = dom.parentNode) => {
    if (typeof vdom === 'object' && typeof vdom.type === 'function') {
        return Component.patch(vdom, dom, parent);
    }

    // string, number, boolean
    if (typeof vdom === 'string' && vdom !== dom) {
        return parent.replaceChild(vdom, dom);
    }

    // tag
    if (typeof vdom.type === 'string' && dom.tagName.toLowerCase() !== vdom.type) {
        parent.replaceChild(render(vdom, parent), dom);
    }
};

class Component {
    constructor(props) {
        this.props = props || {};
        this.state = null;
    }

    static render(vdom, parent) {
        const props = Object.assign({}, vdom.props, { children: vdom.children });

        const instance = new vdom.type(props);

        instance._meta = render(instance.render(), parent);
        instance._meta.__key = vdom.props.key;
        instance._meta.__instance = instance;

        return instance._meta;
    }

    static update(vdom, dom, parent = dom.parentNode) {
        const props = Object.assign({}, vdom.props, { children: vdom.children });

        if (dom.__instance && dom.__instance.constructor === vdom.type) {
            dom.__instance.props = props;
            return update(vdom, dom.__instance.render(), parent);
        } else if (Component.isPrototypeOf(vdom.type)) {
            const ndom = new vdom.type(props);
            return !parent ? ndom : (parent.replaceChild(dom, ndom) && ndom);
        } else if (!Component.isPrototypeOf(vdom.type)) {
            return update(vdom, vdom.type(props), parent);
        }
    }

    setState(newState) {
        this.state = newState;
        update(this._meta, this.render());
    }
}

class List extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul>
                {this.props.list.map(item => {
                    return <li>{item} <button onClick={() => this.props.onClick(item)}>X</button></li>
                })}
            </ul>
        );
    }
}

class Wrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['Item #1', 'Item #2', true, 5, false, { a: 'b' }]
        };
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(item) {
        this.setState({
            list: this.state.list.filter(i => i === item)
        });
    }

    render() {
        return (
            <div>
                <form method="POST">
                    <input type="text" />   
                    <input type="password" /> 
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>  
                    <input type="radio"/>
                    <input type="checkbox" checked/>
                    <input type="submit" value="Submit" />
                </form>
                <List onClick={this.removeItem} list={this.state.list}/>
            </div>
        );
    }
}

render(<Wrapper test="test" />, document.getElementById('app'));
// document.body.appendChild(list);