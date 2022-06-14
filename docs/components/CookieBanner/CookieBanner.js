import { memo, useCallback, useState, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './CookieBanner.module.scss';

import BaseButton from '../BaseButton/BaseButton';

const EXPIRATION_DURATION_MONTHS = 3;

const LOCAL_STORAGE_KEYS = {
  consent: 'cookie-consent',
  expiration: 'cookie-expiration'
};

function CookieBanner({ className, description, acceptCta, rejectCta, onAccept, onReject }) {
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
  }, [onAccept]);

  const onRejectClick = useCallback(() => {
    setVisible(false);
    onReject();
  }, [onReject]);

  return visible ? (
    <div className={classnames(styles.CookieBanner, className)}>
      <p className={styles.description}>{description}</p>
      <div className={styles.buttonsContainer}>
        <BaseButton className={styles.accept} onClick={onAcceptClick}>
          {acceptCta}
        </BaseButton>
        <BaseButton className={styles.reject} onClick={onRejectClick}>
          {rejectCta}
        </BaseButton>
      </div>
    </div>
  ) : null;
}

CookieBanner.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  acceptCta: PropTypes.string,
  rejectCta: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func
};

CookieBanner.defaultProps = {
  description: 'We use cookies on this website to improve your experience.',
  acceptCta: 'Accept all cookies',
  rejectCta: 'No thanks',
  onAccept: () => {},
  onReject: () => {}
};

export default memo(CookieBanner);
