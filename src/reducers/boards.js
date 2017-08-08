import { List } from 'immutable';

const boards = (state = new List(), action) => {
  switch (action.type) {
    case 'BOARD_INIT': {
      const { boards } = action.data;

      return new List(boards);
    }
    case 'BOARD_PLAY': {
      const { id, cell } = action.data;

      return state.update(id, board => board.play(cell));
    }
    default:
      return state;
  }
};

export default boards;
