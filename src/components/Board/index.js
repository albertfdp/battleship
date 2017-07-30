import React from 'react';
import PropTypes from 'prop-types';
import { Board as BoardModel } from 'records';

import Cell from '../Cell';

import styles from './styles.css';

const Board = ({ board, size }) => {
  const rows = board.cellsToList();

  return (
    <div className={styles.board}>
      {rows.map((row, id) =>
        <div key={id} className={styles.row}>
          {row.map(cell =>
            <Cell key={cell.id} type={cell.type} hit={cell.hit} size={size} />
          )}
        </div>
      )}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.instanceOf(BoardModel),
  size: PropTypes.oneOf(['large', 'small'])
};

Board.defaultProps = {
  size: 'large'
};

export default Board;
