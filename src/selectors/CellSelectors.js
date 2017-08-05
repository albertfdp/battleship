import { createSelector } from 'reselect';

const cellsSelector = state => state.board.cells;

export const cellRowsSelector = createSelector(cellsSelector, cells =>
  cells.valueSeq().groupBy(cell => cell.row).valueSeq().map(seq => seq)
);
