import { Component } from "../../main/component";
import { createElement } from "../../main/render";
import { Container } from './Container';
import { Icon } from "./Icon";

const CHAPTERS = {
  en: [
    { name: "Start screen", icon: 'react'},
    { name: 'Introduction', icon: 'pencil' },
    { name: 'Basic rendering', icon: 'doc' },
    { name: 'Basic reconciliation', icon: 'cog' },
    { name: 'Сomponents', icon: 'code' },
    { name: 'State', icon: 'progress-2' },
    { name: 'Handling props', icon: 'th-list' },
  ],
  ru: [
    { name: "Начальный экран", icon: 'react'},
    { name: 'Введение', icon: 'pencil' },
    { name: 'Базовый рендеринг', icon: 'doc' },
    { name: 'Согласование', icon: 'cog' },
    { name: 'Компоненты', icon: 'code' },
    { name: 'Состояние', icon: 'progress-2' },
    { name: 'Обработка props', icon: 'th-list' },
  ],
}

export const SidebarItem = ({ active, children, onClick }) => {
  const className = [active ? 'active' : '', 'sidebar__item'];

  return (
    <li 
      className={className.join(' ')} 
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { chapter, onChange, lang } = this.props;
    const { open } = this.state;

    const activeClass = open ? 'active' : '';

    return (
      <Container className={`sidebar ${activeClass}`}>
        <ul className="sidebar__list">
          {CHAPTERS[lang].map((item, ind) => (
            <SidebarItem 
              active={chapter === ind} 
              key={item.name} 
              onClick={() => onChange(ind)}
            >
              <Icon name={item.icon} />
              <span>{item.name}</span>
            </SidebarItem>
          ))}
        </ul>
        
        <div onClick={this.onToggle} className={`sidebar__icon ${activeClass}`}>
          <Icon name="chevron-double-right" />
        </div>
      </Container>
    );
  }
};