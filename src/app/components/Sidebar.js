import { Component } from "../../main/component";
import { createElement } from "../../main/render";
import { Container } from './Container';

const CHAPTERS = [
  'Introduction',
  'Basic rendering',
  'Basic reconciliation',
  'Handling key, refs, styles, events and other props',
  'Handling Functional and Class components',
  'Adding state to the Class components',
  'Adding Class components hooks'
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
    this.setState({ open: !this.state.open })
  }

  render() {
    const { chapter, onChange } = this.props;

    return (
      <Container className="sidebar">
        <ul className="sidebar__list">
          {CHAPTERS.map((item, ind) => (
            <SidebarItem 
              active={chapter === ind} 
              key={item} 
              onClick={() => onChange(ind)}
            >
              {ind}. {item}
            </SidebarItem>
          ))}
        </ul>

        <div className="sidebar__toggle">Toggle</div>
      </Container>
    );
  }
};