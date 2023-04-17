export const escapeHtml = (unsafe) => unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

export const links = [
  { href: 'https://github.com/nuxxxx', name: 'github' },
  { href: 'https://www.linkedin.com/in/eugene-agafonov-6295881b2', name: 'linkedin' },
];