import React, { Component } from 'react';
import PropTypes from 'prop-types';

import createFocusGroup from 'focus-group';
import keycodes from 'keycodes';

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

  constructor(props) {
    super(props);

    this.focusGroup = createFocusGroup({
      keybindings: {
        next: [{ keyCode: keycodes('right') }, { keyCode: keycodes('d') }],
        prev: [{ keyCode: keycodes('left') }, { keyCode: keycodes('a') }]
      },
      stringSearch: false
    });
    this.lastIndex = 0;
  }

  onActivate() {
    this.focusGroup.activate();
    this.focusGroup.focusNodeAtIndex(this.lastIndex);
  }

  onDeactivate() {
    this.focusGroup.deactivate();
  }

  componentWillReceiveProps(nextProps) {
    const { disabled } = this.props;
    const { disabled: willBeDisabled } = nextProps;

    if (!disabled && willBeDisabled) {
      this.lastIndex = this.focusGroup._getActiveElementIndex();
      this.onDeactivate();
    }
  }

  componentDidMount() {
    const { disabled } = this.props;

    let cellNodes = [];

    Array.from(this.node.children).forEach(row => {
      cellNodes = cellNodes.concat(Array.from(row.children));
    });

    this.focusGroup.setMembers(cellNodes);

    if (!disabled) {
      this.onActivate();
    }
  }

  componentWillUnmount() {
    this.focusGroup.clearMembers().deactivate();
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props;
    const { disabled: wasDisabled } = prevProps;

    if (!disabled && wasDisabled) {
      this.onActivate();
    }
  }

  onKeyDown = e => {
    switch (e.keyCode) {
      case keycodes('s'):
      case keycodes('down'): {
        const current = this.focusGroup._getActiveElementIndex();
        this.focusGroup.focusNodeAtIndex((current + 10) % 100);
        break;
      }
      case keycodes('w'):
      case keycodes('up'): {
        const current = this.focusGroup._getActiveElementIndex();
        const nextIndex = (current - 10 + 100 * 10) % 100;

        this.focusGroup.focusNodeAtIndex(nextIndex);
        break;
      }
    }
  };

  render() {
    const { cells, disabled, boardActions, player, size } = this.props;

    if (cells.isEmpty()) {
      return null;
    }

    return (
      <div
        className={styles.board}
        disabled={disabled}
        onKeyDown={this.onKeyDown}
      >
        {disabled
          ? <div className={styles.number}>
              {player}
            </div>
          : null}
        <div
          className={styles.cells}
          ref={node => {
            if (node) {
              this.node = node;
            }
          }}
        >
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
