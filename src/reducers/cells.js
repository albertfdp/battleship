import { List } from 'immutable';

const cells = (state = new List(), action) => {
  switch (action.type) {
    case 'BOARD_INIT': {
      const { board } = action.data;

      return new List(
        board.cells
          .valueSeq()
          .groupBy(cell => cell.row)
          .valueSeq()
          .map((seq, index) => seq)
      );
    }
    default:
      return state;
  }
};

export default cells;
