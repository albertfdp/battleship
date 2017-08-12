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
    disabled: PropTypes.bool,
    cells: PropTypes.instanceOf(List),
    boardActions: PropTypes.object,
    player: PropTypes.number,
    size: PropTypes.string
  };

  componentWillReceiveProps(nextProps) {
    const { disabled: wasDisabled } = this.props;
    const { disabled } = nextProps;

    if (wasDisabled && !disabled) {
      document.activeElement.blur();
      setTimeout(() => this.focusNodeAtIndex(1), 0);
    }
  }

  focusNodeAtIndex(index) {
    this.node.children[index].focus();
  }

  onArrowDown() {
    const currentCell = document.activeElement;
    console.log(currentCell);
  }

  onKeyDown = e => {
    switch (e.keyCode) {
      case 40:
        return this.onArrowDown();
    }
  };

  render() {
    const { cells, disabled, boardActions, player, size } = this.props;

    if (cells.isEmpty()) {
      return null;
    }

    return (
      <div
        ref={node => {
          if (node) {
            this.node = node;
          }
        }}
        className={styles.board}
        disabled={disabled}
        onKeyDown={this.onKeyDown}
      >
        {disabled
          ? <div className={styles.number}>
              {player}
            </div>
          : null}
        {cells.map((row, rowIdx) =>
          <div className={styles.row} key={rowIdx}>
            {row.map((cell, cellId) =>
              <Cell
                type={cell.type}
                hit={cell.hit}
                key={cellId}
                disabled={disabled}
                onHit={() => !disabled && boardActions.onHit(player, cell)}
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
  disabled: player !== state.turn,
  cells: cellRowsSelector(state, player)
});

const mapDispatchToProps = dispatch => ({
  boardActions: bindActionCreators(BoardActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
