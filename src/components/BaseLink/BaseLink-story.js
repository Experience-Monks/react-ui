import React from 'react';
import { storiesOf } from '@storybook/react';
import noop from 'no-op';

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
    text: 'External link',
    title: 'Go to Google',
    link: 'https://www.google.com',
    onClick: () => console.log('clicked')
  },
  {
    className: 'tel-link',
    text: 'Tel Link',
    title: 'Call +11111111111',
    link: 'tel:+11111111111'
  },
  {
    className: 'email-link',
    text: 'Email Link',
    title: 'Send a message to someone@yoursite.com',
    link: 'mailto:someone@yoursite.com'
  },
  {
    className: 'download-link',
    text: 'Download Image',
    title: 'Download rectangle.png',
    link: generateImage(),
    download: 'rectangle.png'
  }
];

storiesOf('BaseLink', module).add('Basic Cases', () => (
  <nav>
    <ul>
      {links.map((link, i) => {
        const num = (i + 1).toString();

        return (
          <li key={`li-${link.text}-${num}`}>
            <BaseLink
              title={link.title}
              className={link.className}
              key={`${link.text}-${i}`}
              link={link.link}
              target={link.target}
              onClick={link.onClick || noop}
              download={link.download}
            >
              {link.text}
            </BaseLink>
          </li>
        );
      })}
    </ul>
  </nav>
));
