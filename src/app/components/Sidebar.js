import { Component } from "../../main/component";
import { createElement } from "../../main/render";
import { Container } from './Container';
import { Icon } from "./Icon";

const CHAPTERS = [
  { name: 'Introduction', icon: 'pencil' },
  { name: 'Basic rendering', icon: 'doc' },
  { name: 'Basic reconciliation', icon: 'cog' },
  { name: 'Handling components', icon: 'code' },
  { name: 'Handling props', icon: 'th-list' },
  { name: 'Adding state', icon: 'progress-2' },
  // 'Adding Class components hooks'
];

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
    const { chapter, onChange } = this.props;
    const { open } = this.state;

    const activeClass = open ? 'active' : '';

    return (
      <Container className={`sidebar ${activeClass}`}>
        <ul className="sidebar__list">
          {CHAPTERS.map((item, ind) => (
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