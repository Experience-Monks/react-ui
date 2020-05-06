import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

const keys = {
  end: 35,
  home: 36,
  left: 37,
  right: 39
};

import './Tabs.scss';

export const Tabs = ({ children }) => {
  const containerRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  const [active, setActive] = useState(0);

  function previousTab() {
    active - 1 < 0 ? setActive(childrenArray.length - 1) : setActive(active - 1);
  }

  function nextTab() {
    setActive((active + 1) % childrenArray.length);
  }

  function handleKeyup(e) {
    e.preventDefault();
    if (e.which === keys.left) previousTab();
    else if (e.which === keys.right) nextTab();
    else if (e.which === keys.end) setActive(childrenArray.length - 1);
    else if (e.which === keys.home) setActive(0);
  }

  return (
    <div className="Tabs" ref={containerRef}>
      <ol className="tabs-list" role="tablist">
        {childrenArray.map((child, index) => {
          const { label } = child.props;
          return (
            <Tab
              key={`${label}${index}`}
              label={label}
              isActive={active === index}
              onClick={() => setActive(index)}
              onKeyUp={handleKeyup}
            >
              {label}
            </Tab>
          );
        })}
      </ol>
      <div className="tabs-content">{childrenArray.map((child, index) => (index === active ? child : undefined))}</div>
    </div>
  );
};

Tabs.propTypes = checkProps({});

Tabs.defaultProps = {};

export const Tab = ({ isActive, label, onClick, onKeyUp }) => {
  const el = useRef(null);

  useEffect(() => {
    if (isActive) el.current.focus();
  }, [isActive]);

  return (
    <li
      ref={el}
      className={classnames('Tab', { active: isActive })}
      role="tab"
      aria-controls={label}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      {label}
    </li>
  );
};

Tab.propTypes = checkProps({
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired
});

Tab.defaultProps = {
  onKeyUp: noop
};
