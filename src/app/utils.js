export const escapeHtml = (unsafe) => unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

export const links = [
  { href: 'https://github.com/nuxxxx', name: 'github' },
  { href: 'https://www.linkedin.com/in/eugene-agafonov-6295881b2', name: 'linkedin' },
];

export const INSPIRED_BY = "https://stackoverflow.com/questions/53974865/how-do-react-hooks-determine-the-component-that-they-are-for/53980190#53980190";