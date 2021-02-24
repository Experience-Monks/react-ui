import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Component from './AutoComplete';

import sampleData from './data/sample';

function renderResult(result) {
  return result.length > 0 ? (
    <ul>
      {result.map((item, key) => (
        <li key={`autocomplete-${key}`}>{item}</li>
      ))}
    </ul>
  ) : (
    <p>No matches</p>
  );
};

const AutoCompleteTest = () => {
  const [result, setResult] = useState(null);
  return (
    <>
      <label htmlFor="autoCompleteField">AutoComplete list of countries</label>
      <br />
      <Component
        id="autoCompleteField"
        data={sampleData.map(item => item.name)}
        autoCompleteResult={newResult => setResult(newResult)}
      />
      {result && renderResult(result)}
    </>
  );
};

storiesOf('AutoComplete', module).add('Default', () => <AutoCompleteTest />, {
  notes: 'This is an autocomplete field of countries name.',
});
