import React from 'react';
import { storiesOf } from '@storybook/react';

import PageOverlay from './PageOverlay';

storiesOf('PageOverlay', module).add('Default', () => (
  <PageOverlay isShowing={true} onClick={() => console.log('click')} />
));
