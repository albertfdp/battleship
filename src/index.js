import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// const Board = require('./models/Board');
// const { BOAT_SIZES, BOARD_SIZE } = require('./constants');
//
// const createBoard = (boats = BOAT_SIZES) => {
//   let board = Board.create(BOARD_SIZE);
//
//   boats.sort((a, b) => a < b).map(boat => {
//     board = board.addBoat(boat);
//   });
//
//   return board;
// };

render(<App>Hello</App>, document.getElementsByClassName('.app')[0]);
