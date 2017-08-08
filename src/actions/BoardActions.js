import { createBoard } from 'utils';

export const init = () => ({
  type: 'BOARD_INIT',
  data: { board: createBoard() }
});

export const onHit = cell => ({
  type: 'BOARD_PLAY',
  data: { cell: cell.id }
});
