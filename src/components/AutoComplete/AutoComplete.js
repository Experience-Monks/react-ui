import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import typingAhead from 'typing-ahead';

import styles from './AutoComplete.module.scss';

const AutoComplete = ({ id, data, className, autoCompleteResult }) => {
  const [model, setModel] = useState(null);

  function onInputChange({ target: { value } }) {
    autoCompleteResult(value ? typingAhead.find(value, model) : null);
  }

  useEffect(() => {
    setModel(typingAhead.generate(data));
  }, []);

  return <input id={id} className={classnames(styles.AutoComplete, className)} onChange={onInputChange} />;
};

AutoComplete.propTypes = checkProps({
  id: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  autoCompleteResult: PropTypes.func.isRequired
});

export default memo(AutoComplete);
