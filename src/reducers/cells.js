import { List } from 'immutable';

const cells = (state = new List(), action) => {
  switch (action.type) {
    case 'BOARD_INIT': {
      const { board } = action.data;

      return new List(board.cells.groupBy(cell => cell.row));
    }
    default:
      return state;
  }
};

export default cells;
