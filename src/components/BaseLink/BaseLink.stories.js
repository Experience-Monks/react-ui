import { storiesOf } from '@storybook/react';

import BaseLink from './BaseLink';

function generateImage() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#D46A6A';
  ctx.fillRect(100, 75, 200, 250);
  return canvas.toDataURL();
}

const links = [
  {
    className: 'external-link',
    text: 'External link (new tab)',
    title: 'Go to Google',
    href: 'https://www.google.com',
    onClick: () => console.log('clicked')
  },
  {
    className: 'external-link-same-tab',
    text: 'External link (same tab)',
    title: 'Open Storybook',
    target: '_self',
    href: 'https://storybook.js.org/docs/react/configure/features-and-behavior',
    onClick: () => console.log('clicked')
  },
  {
    className: 'tel-link',
    text: 'Tel Link',
    title: 'Call +11111111111',
    href: 'tel:+11111111111'
  },
  {
    className: 'email-link',
    text: 'Email Link',
    title: 'Send a message to someone@yoursite.com',
    href: 'mailto:someone@yoursite.com'
  },
  {
    className: 'download-link',
    text: 'Download Image (named)',
    title: 'Download rectangle.png',
    href: generateImage(),
    download: 'rectangle.png'
  },
  {
    className: 'download-link',
    text: 'Download Image (unnamed)',
    title: 'Download rectangle.png',
    href: generateImage(),
    download: true
  },
  {
    className: 'relative-link',
    text: 'Relative link to a page',
    title: 'About Page',
    href: '/about'
  }
];

storiesOf('BaseLink', module).add('Basic Cases', () => (
  <nav>
    <ul>
      {links.map((link, i) => {
        return (
          <li key={i}>
            <BaseLink
              title={link.title}
              className={link.className}
              href={link.href}
              onClick={link.onClick}
              download={link.download}
              target={link.target}
            >
              {link.text}
            </BaseLink>
          </li>
        );
      })}
    </ul>
  </nav>
));
