const turn = (state = 0, action) => {
  switch (action.type) {
    case 'PLAYER_NEXT':
      return action.data.id;
    default:
      return state;
  }
};

export default turn;
