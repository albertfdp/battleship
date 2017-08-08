import { Board } from 'records';

const board = (state = new Board(), action) => {
  switch (action.type) {
    case 'BOARD_INIT': {
      const { board } = action.data;

      return board;
    }
    case 'BOARD_PLAY': {
      const { cell } = action.data;

      return state.play(cell);
    }
    default:
      return state;
  }
};

export default board;
