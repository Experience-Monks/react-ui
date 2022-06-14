import { storiesOf } from '@storybook/react';

import CookieBanner from './CookieBanner';

storiesOf('CookieBanner', module).add('Default', () => (
  <CookieBanner onAccept={() => console.log('accept')} onReject={() => console.log('reject')} />
));
