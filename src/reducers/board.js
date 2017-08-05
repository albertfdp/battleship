const board = (state = null, action) => {
  switch (action.type) {
    case 'BOARD_INIT': {
      const { board } = action.data;

      return board;
    }
    default:
      return state;
  }
};

export default board;
