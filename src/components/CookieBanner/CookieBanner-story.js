import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import CookieBanner from './CookieBanner';

storiesOf('CookieBanner', module).add('Default', () => (
  <Fragment>
    <CookieBanner />
  </Fragment>
));
