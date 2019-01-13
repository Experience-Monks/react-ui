import React from 'react';
import { storiesOf } from '@storybook/react';

import PageOverlay from './PageOverlay';

storiesOf('PageOverlay', module).addWithJSX('Default', () => <PageOverlay isShowing={true} />);
