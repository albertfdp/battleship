import Board from '../models/Board';
import { BOAT_SIZES, BOARD_SIZE } from '../constants';

const createBoard = (boats = BOAT_SIZES) => {
  let board = Board.create(BOARD_SIZE);

  boats.sort((a, b) => a < b).map(boat => {
    board = board.addBoat(boat);
  });

  return board;
};

export default createBoard;
