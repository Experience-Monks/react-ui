import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import typingAhead from 'typing-ahead';

const AutoComplete = ({
  data,
  className,
  autoCompleteResult
}) => {
  const [model, setModel] = useState(null);

  function onInputChange(event) {
    const inputValue = event.target.value;
    autoCompleteResult(inputValue ? typingAhead.find(inputValue, model) : null);
  }

  useEffect(() => {
    setModel(typingAhead.generate(data));
  }, []);

  return (
    <input
      classnames={classnames('AutoCompleteField', className)}
      onChange={onInputChange}
    />
  );
};

AutoComplete.propTypes = checkProps({
  id: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.array,
  autoCompleteResult: PropTypes.func,
});

export default memo(AutoComplete);
