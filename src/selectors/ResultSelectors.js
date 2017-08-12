import { createSelector } from 'reselect';
import { List } from 'immutable';

const boardSelector = state => state.boards;

export const getResults = createSelector(
  boardSelector,
  boards =>
    new List(
      boards.map(board =>
        board.boats.reduce(
          (acc, curr) => acc.push([curr.size, curr.getState()]),
          new List()
        )
      )
    )
);

export const isGameOver = createSelector(boardSelector, boards =>
  boards.some(board => board.isGameOver())
);
