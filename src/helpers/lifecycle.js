export const getDerivedStateFromProps = (vdom, component) => {
  if (!vdom.type.getDerivedStateFromProps) return;

  const newState = vdom.type.getDerivedStateFromProps(
    component.props,
    component.state
  );

  if (newState !== null) component.setState(newState);
};
