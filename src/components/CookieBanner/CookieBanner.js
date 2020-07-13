import React, { memo, useCallback, useState, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';

import './CookieBanner.scss';

const EXPIRATION_DURATION_MONTHS = 3;

const LOCAL_STORAGE_KEYS = {
  consent: 'cookie-consent',
  expiration: 'cookie-expiration'
};

function CookieBanner({ className }) {
  const expired = useMemo(() => {
    let expirationDate = localStorage.getItem(LOCAL_STORAGE_KEYS.expiration);
    if (expirationDate === null) {
      return false;
    }

    expirationDate = new Date(expirationDate);
    if (expirationDate.getTime() < new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  }, []);

  const [visible, setVisible] = useState(!localStorage.getItem(LOCAL_STORAGE_KEYS.consent) || expired);

  const onAccept = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.consent, true);

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + EXPIRATION_DURATION_MONTHS);
    localStorage.setItem(LOCAL_STORAGE_KEYS.expiration, expirationDate);

    setVisible(false);
  }, []);

  const onReject = useCallback(() => {
    setVisible(false);
  }, []);

  return visible ? (
    <div className={classnames('CookieBanner', className)}>
      <p className="description">
        We use cookies on this website to improve your experience. Learn more on our privacy policy.
      </p>
      <button className="accept" onClick={onAccept}>
        Accept cookies
      </button>
      <button className="reject" onClick={onReject}>
        No thanks
      </button>
    </div>
  ) : null;
}

CookieBanner.propTypes = checkProps({
  className: PropTypes.string
});

CookieBanner.defaultProps = {};

export default memo(CookieBanner);
