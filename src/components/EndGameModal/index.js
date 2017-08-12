import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getResults, isGameOver } from 'selectors/ResultSelectors';
import { connect } from 'react-redux';
import { List } from 'immutable';

import AriaModal from 'react-aria-modal';

import styles from './styles.css';

class EndGameModal extends Component {
  static propTypes = {
    onRestart: PropTypes.func,
    boards: PropTypes.instanceOf(List),
    isGameOver: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      mounted: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isGameOver: wasGameOver } = this.props;
    const { isGameOver } = nextProps;

    if (!wasGameOver && isGameOver) {
      this.onOpenModal();
    }
  }

  onOpenModal = () => {
    this.setState({
      mounted: true
    });
  };

  onCloseModal = () => {
    this.setState({
      mounted: false
    });
  };

  getApplicationNode() {
    return document.getElementById('app');
  }

  getWinner() {
    const { boards } = this.props;

    return boards.findIndex(board => board.isGameOver());
  }

  onPlayAgain = () => {
    const { onRestart } = this.props;

    this.onCloseModal();
    onRestart();
  };

  render() {
    const { mounted } = this.state;

    return (
      <AriaModal
        getApplicationNode={this.getApplicationNode}
        titleText="Game over!"
        mounted={mounted}
        onExit={this.onCloseModal}
        verticallyCenter
      >
        <div className={styles.modal}>
          <div className={styles.content}>
            <h3 className={styles.title}>Game over!</h3>
            <p className={styles.winner}>
              Player {this.getWinner()} has won!
            </p>
            <p className={styles.medal}>🏅</p>
            <button
              role="button"
              className={styles.button}
              onClick={this.onPlayAgain}
            >
              Play again
            </button>
          </div>
        </div>
      </AriaModal>
    );
  }
}

const mapStateToProps = state => ({
  results: getResults(state),
  isGameOver: isGameOver(state),
  boards: state.boards
});

export default connect(mapStateToProps)(EndGameModal);
