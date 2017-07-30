import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import Board from './models/Board';
import { BOAT_SIZES, BOARD_SIZE } from './constants';

export const createBoard = (boats = BOAT_SIZES) => {
  let board = Board.create(BOARD_SIZE);

  boats.sort((a, b) => a < b).map(boat => {
    board = board.addBoat(boat);
  });

  return board;
};

render(<App>Hello</App>, document.getElementById('app'));
