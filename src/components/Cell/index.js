import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Hit = ({ type }) =>
  <div className={classnames(styles.hitContent, { [styles.type]: type })}>
    {type === 'WATER' ? '🌊' : '💥'}
  </div>;

Hit.propTypes = {
  type: PropTypes.oneOf(['WATER', 'BOAT'])
};

const Cell = ({ disabled, type, hit, size, onHit }) =>
  <div
    className={classnames(styles.cell, {
      [styles.disabled]: disabled,
      [styles.hit]: hit,
      [styles[type.toLowerCase()]]: type,
      [styles[size]]: size,
      [styles.debug]: __DEV__ && window.location.search.includes('debug=true')
    })}
    tabIndex={disabled ? -1 : 0}
    onKeyDown={e => {
      return e.keyCode === 13 && onHit();
    }}
    onClick={onHit}
  >
    {hit
      ? <Hit type={type} />
      : <div className={styles.content}>
          <div key={0} className={styles.wave} />
          <div key={1} className={styles.wave} />
        </div>}
  </div>;

Cell.propTypes = {
  disabled: PropTypes.bool,
  onHit: PropTypes.func,
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
