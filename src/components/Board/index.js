import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { cellRowsSelector } from 'selectors/CellSelectors';

import { connect } from 'react-redux';

import Cell from '../Cell';

import styles from './styles.css';

const Board = ({ cells }) => {
  if (cells.isEmpty()) {
    return null;
  }

  return (
    <div className={styles.board}>
      {cells.map((row, rowIdx) =>
        <div className={styles.row} key={rowIdx}>
          {row.map((cell, cellId) => <Cell {...cell} key={cellId} />)}
        </div>
      )}
    </div>
  );
};

Board.propTypes = {
  cells: PropTypes.instanceOf(List)
};

const mapStateToProps = state => ({ cells: cellRowsSelector(state) });

export default connect(mapStateToProps)(Board);
