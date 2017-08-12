import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BoardActions from 'actions/BoardActions';

import Board from '../Board';
import Results from '../Results';
import styles from './styles.css';

class App extends Component {
  static propTypes = {
    boardActions: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { boardActions } = this.props;

    boardActions.init();
  }

  render() {
    return (
      <div className={styles.app}>
        <h1 className={styles.title}>Battleship</h1>
        <div className={classnames(styles.board, styles.current)}>
          <Board player={0} />
        </div>
        <div className={classnames(styles.board, styles.other)}>
          <Board player={1} size="small" />
          <Results />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  boardActions: bindActionCreators(BoardActions, dispatch)
});

export default connect(null, mapDispatchToProps)(App);
