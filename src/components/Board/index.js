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
    boardActions: PropTypes.object
  };

  componentWillMount() {
    const { boardActions } = this.props;

    boardActions.init();
  }

  render() {
    const { cells, boardActions } = this.props;

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
                onHit={() => boardActions.onHit(cell)}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({ cells: cellRowsSelector(state) });

const mapDispatchToProps = dispatch => ({
  boardActions: bindActionCreators(BoardActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
