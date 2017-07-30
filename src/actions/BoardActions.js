import { createBoard } from 'utils';

export const init = () => ({
  type: 'BOARD_INIT',
  data: { board: createBoard() }
});
