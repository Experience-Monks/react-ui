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

import styles from './Tabs.module.scss';

export const Tabs = ({ tabListLabel, children }) => {
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
    <div className={styles.Tabs} ref={containerRef}>
      <ul className={styles.tabsList} role="tablist" aria-label={tabListLabel}>
        {childrenArray.map((child, index) => {
          const label = child.props['data-label'];
          if (!label) {
            console.warn('Child component has no data-label prop');
            return;
          } else {
            return (
              <Tab
                index={index}
                key={`${label}${index}`}
                label={label}
                isActive={active === index}
                onClick={() => setActive(index)}
                onKeyUp={handleKeyup}
              >
                {label}
              </Tab>
            );
          }
        })}
      </ul>

      <div className={styles.tabsContent}>
        {childrenArray.map((child, index) =>
          React.cloneElement(child, {
            id: `panel-${index}`,
            role: 'tabpanel',
            tabIndex: '0',
            'aria-labelledby': `tab-${index}`,
            hidden: index !== active
          })
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = checkProps({
  tabListLabel: PropTypes.string
});

Tabs.defaultProps = {
  tabListLabel: ''
};

export const Tab = ({ isActive, label, index, onClick, onKeyUp }) => {
  const el = useRef(null);

  useEffect(() => {
    if (isActive) el.current.focus();
  }, [isActive]);

  return (
    <li
      id={`tab-${index}`}
      ref={el}
      className={classnames(styles.Tab, { [styles.active]: isActive })}
      role="tab"
      aria-controls={`panel-${index}`}
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
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired
});

Tab.defaultProps = {
  onKeyUp: noop
};
