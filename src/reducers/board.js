const board = (state = {}, action) => {
  switch (action.type) {
    case 'BOARD_INIT': {
      const { board } = action.data;

      return {
        size: board.boardSize
      };
    }
    default:
      return state;
  }
};

export default board;
