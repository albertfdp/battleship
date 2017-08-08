import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { cellRowsSelector } from 'selectors/CellSelectors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BoardActions from 'actions/BoardActions';

import Cell from '../Cell';

import styles from './styles.css';

class Board extends Component {
  static propTypes = {
    cells: PropTypes.instanceOf(List),
    boardActions: PropTypes.object,
    player: PropTypes.number,
    size: PropTypes.string
  };

  render() {
    const { cells, boardActions, player, size } = this.props;

    if (cells.isEmpty()) {
      return null;
    }

    return (
      <div className={styles.board}>
        {cells.map((row, rowIdx) =>
          <div className={styles.row} key={rowIdx}>
            {row.map((cell, cellId) =>
              <Cell
                type={cell.type}
                hit={cell.hit}
                key={cellId}
                onHit={() => boardActions.onHit(player, cell)}
                size={size}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, { player }) => ({
  cells: cellRowsSelector(state, player)
});

const mapDispatchToProps = dispatch => ({
  boardActions: bindActionCreators(BoardActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
