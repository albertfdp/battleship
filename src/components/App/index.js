import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'immutable';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BoardActions from 'actions/BoardActions';

import Board from '../Board';
import styles from './styles.css';

class App extends Component {
  static propTypes = {
    cells: PropTypes.instanceOf(List),
    size: PropTypes.number,
    boardActions: PropTypes.object
  };

  componentWillMount() {
    const { boardActions } = this.props;

    boardActions.init();
  }

  render() {
    const { cells, size } = this.props;

    return (
      <div className={styles.app}>
        <Board cells={cells} size={size} />
      </div>
    );
  }
}

const mapStateToProps = ({ cells, board }) => ({ cells, size: board.size });

const mapDispatchToProps = dispatch => ({
  boardActions: bindActionCreators(BoardActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
