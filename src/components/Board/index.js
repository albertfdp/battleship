import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { List } from 'immutable';

import Cell from '../Cell';

import styles from './styles.css';

const Board = ({ cells, size }) => {
  if (cells.isEmpty()) {
    return null;
  }

  return (
    <div className={styles.board}>
      {R.times(R.identity, size).map(row =>
        <div className={styles.row} key={row}>
          {/* {cells
            .filter(cell => cell.row === row)
            .map(
              cell =>
                console.log(cell) ||
                <Cell key={cell.id} type={cell.type} hit={cell.hit} />
            )} */}
        </div>
      )}
    </div>
  );
};

Board.propTypes = {
  cells: PropTypes.instanceOf(List),
  size: PropTypes.number
};

export default Board;
