import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const commonStyles = {
  fontSize: '1.8rem',
  lineHeight: '2rem',
  letterSpacing: '0.1px',
  marginTop: '3rem'
};

const routesExample = [
  {
    route: '/',
    text: 'Home'
  },
  {
    route: '/page',
    text: 'Page'
  },
  {
    route: '/nested-1',
    text: 'Nested-1'
  },
  {
    route: '/nested-2',
    text: 'Nested-2'
  }
];

storiesOf('Breadcrumbs', module).add(
  'Default',
  () => (
    <React.Fragment>
      <h2>Forward Style: Show the next</h2>
      <Breadcrumbs breadStyle="forward" routes={routesExample} />
      <h2>Forward Style: Show all</h2>
      <Breadcrumbs breadStyle="all" routes={routesExample} />
      <h2>Forward Style: Show current</h2>
      <Breadcrumbs breadStyle="current" routes={routesExample} />

      <div style={{ ...commonStyles }}>
        <Link to="/test">Route not included in the list</Link>
      </div>
    </React.Fragment>
  ),
  {
    notes: 'Simple Autocomplete for countries'
  }
);
