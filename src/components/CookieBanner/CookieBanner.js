import React, { memo, useCallback, useState, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import noop from 'no-op';

import './CookieBanner.scss';

import BaseButton from '../BaseButton/BaseButton';

const EXPIRATION_DURATION_MONTHS = 3;

const LOCAL_STORAGE_KEYS = {
  consent: 'cookie-consent',
  expiration: 'cookie-expiration'
};

function CookieBanner({ className, defaultText, children, acceptCta, rejectCta, onAccept, onReject }) {
  const expired = useMemo(() => {
    let expirationDate = localStorage.getItem(LOCAL_STORAGE_KEYS.expiration);
    if (expirationDate === null) {
      return false;
    }

    expirationDate = new Date(expirationDate);
    return expirationDate.getTime() < new Date().getTime();
  }, []);

  const [visible, setVisible] = useState(!localStorage.getItem(LOCAL_STORAGE_KEYS.consent) || expired);

  const onAcceptClick = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.consent, true);

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + EXPIRATION_DURATION_MONTHS);
    localStorage.setItem(LOCAL_STORAGE_KEYS.expiration, expirationDate);

    setVisible(false);
    onAccept();
  }, []);

  const onRejectClick = useCallback(() => {
    setVisible(false);
    onReject();
  }, []);

  return visible ? (
    <div className={classnames('CookieBanner', className)}>
      <span className="description">{children || defaultText}</span>
      <div className="buttons-container">
        <BaseButton className="accept" onClick={onAcceptClick}>
          {acceptCta}
        </BaseButton>
        <BaseButton className="reject" onClick={onRejectClick}>
          {rejectCta}
        </BaseButton>
      </div>
    </div>
  ) : null;
}

CookieBanner.propTypes = checkProps({
  className: PropTypes.string,
  defaultText: PropTypes.string,
  acceptCta: PropTypes.string,
  rejectCta: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func
});

CookieBanner.defaultProps = {
  defaultText: 'We use cookies on this website to improve your experience.',
  acceptCta: 'Accept cookies',
  rejectCta: 'No thanks',
  onAccept: noop,
  onReject: noop
};

export default memo(CookieBanner);
