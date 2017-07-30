import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Hit = ({ type }) =>
  <div className={classnames(styles.hit, { [styles.type]: type })}>
    {type === 'WATER' ? '🌊' : '💥'}
  </div>;

Hit.propTypes = {
  type: PropTypes.oneOf(['WATER', 'BOAT'])
};

const Cell = ({ type, hit, size }) =>
  <div
    className={classnames(styles.cell, {
      [styles[type]]: type,
      [styles[size]]: size
    })}
  >
    {hit
      ? <Hit type={type} />
      : <div className={styles.content}>
          <div key={0} className={styles.wave} />
          <div key={1} className={styles.wave} />
        </div>}
  </div>;

Cell.propTypes = {
  type: PropTypes.oneOf(['WATER', 'BOAT']),
  hit: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small'])
};

Cell.defaultProps = {
  type: 'WATER',
  hit: false,
  size: 'large'
};

export default Cell;
