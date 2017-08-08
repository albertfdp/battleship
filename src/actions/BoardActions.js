import { createBoard } from 'utils';

export const init = () => ({
  type: 'BOARD_INIT',
  data: {
    boards: [createBoard(), createBoard()]
  }
});

export const onHit = (id, cell) => ({
  type: 'BOARD_PLAY',
  data: { id, cell: cell.id }
});
