import { createElement } from '../main/render';
import { useState } from '../main/hooks';

const TodoItem = ({ children, key, onClick }) => {
    const [value, setValue] = useState(false);

    const onToggle = () => setValue(!value);

    return (
        <li key={key + ''} style={{ textDecoration: value ? 'line-through' : ''}}>
            <Input type="checkbox" onChange={onToggle} value={value}/>
            <span>{children}</span>
            <button onClick={onClick} href={"#" + children}>Click</button>
        </li>
    );
};

const TodoList = ({ items, onRemove }) => {
    return (
        <ul className="todoList">
            {items.map((item) => (
                <TodoItem key={item.name + '_' + item.id} onClick={(e) => {
                    onRemove(item.id);
                    e.stopPropagation();
                }}>{item.name}</TodoItem>    
            ))}  
        </ul>
    );
};

export const Input = ({ type, value, onChange, id, title }) => (
    <label for={id || ''}>
        {title && <span>{title}</span>}
        <input id={id || ''} type={type} value={value} onChange={(event) => {
            onChange(event.target.value)
        }} />
    </label>
);


export const Todo = () => {
    const [items, setItems] = useState([{ name: 'test', id: 0 }]);
    const [name, setName] = useState('');
    const [count, setCount] = useState(1);
    
    const removeItem = (id) => {
        setItems(items.filter((i) => i.id !== id));
    }

    const onNameChange = (newName) => setName(newName);

    const addItem = () => {
        const curName = name.trim();
        if (!curName.length) return;

        setCount(count + 1);
        setItems([...items, { name: curName, id: count } ]);
        setName('');
    }

    return (
        <div>
            <Input 
                id="text" 
                title="Add item to todo:" 
                type="text" 
                value={name} 
                onChange={onNameChange}
            />
            <div>{count}</div>
            <TodoList items={items} onRemove={removeItem}/>
            <button onClick={addItem}>Add item</button>
        </div>
    );
}