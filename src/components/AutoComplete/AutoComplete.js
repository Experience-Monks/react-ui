import { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import typingAhead from 'typing-ahead';

import styles from './AutoComplete.module.scss';

const AutoComplete = ({ id, data, className, autoCompleteResult }) => {
  const [model, setModel] = useState(null);

  const onInputChange = useCallback(
    ({ target: { value } }) => {
      if (model) {
        autoCompleteResult(value ? typingAhead.find(value, model) : null);
      }
    },
    [autoCompleteResult, model]
  );

  useEffect(() => {
    setModel(typingAhead.generate(data));
  }, [data]);

  return <input id={id} className={classnames(styles.AutoComplete, className)} onChange={onInputChange} />;
};

AutoComplete.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  autoCompleteResult: PropTypes.func
};

AutoComplete.defaultProps = {
  autoCompleteResult: () => {}
};

export default memo(AutoComplete);
