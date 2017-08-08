import { createBoard } from 'utils';

export const init = () => ({
  type: 'BOARD_INIT',
  data: {
    boards: [createBoard(), createBoard()]
  }
});

export const onHit = (id, cell) => (dispatch, getState) => {
  const { score: prevScore } = getState().boards.get(id);

  dispatch({
    type: 'BOARD_PLAY',
    data: { id, cell: cell.id }
  });

  const { score: currentScore } = getState().boards.get(id);

  return prevScore < currentScore
    ? dispatch({ type: 'PLAYER_NEXT', data: { id } })
    : dispatch({ type: 'PLAYER_NEXT', data: { id: (id + 1) % 2 } });
};
