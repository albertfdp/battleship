import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const times = n => {
  let array = [];

  for (let i = 0; i < n; i++) {
    array.push(i);
  }

  return array;
};

const Boat = ({ size, score }) => {
  return (
    <div className={styles.boat}>
      {times(size).map(i =>
        <div
          key={i}
          className={classnames(styles.block, { [styles.hit]: score > i })}
        />
      )}
    </div>
  );
};

Boat.propTypes = {
  score: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};

export default Boat;
