import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import R from 'ramda';

import styles from './styles.css';

export const Header = ({ type, size, vertical }) =>
  <div
    className={classnames(styles.header, {
      [styles[type]]: type,
      [styles.vertical]: vertical
    })}
  >
    {R.times(R.identity, size).map(n =>
      <div className={styles.column} key={n}>
        {vertical ? String.fromCharCode(n + 65) : n + 1}
      </div>
    )}
  </div>;

Header.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string,
  vertical: PropTypes.bool
};

export const Row = ({ children }) =>
  <div className={styles.row}>
    {children}
  </div>;

Row.propTypes = {
  children: PropTypes.node
};

export const PlayerNumber = ({ number, hidden }) =>
  hidden
    ? null
    : <div className={styles.number}>
        {number}
      </div>;

PlayerNumber.propTypes = {
  number: PropTypes.number,
  hidden: PropTypes.bool
};
