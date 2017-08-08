import { createSelector } from 'reselect';
import { List } from 'immutable';

const cellsSelector = state => state.board.get('cells');

export const cellRowsSelector = createSelector(
  cellsSelector,
  cells =>
    new List(
      cells.valueSeq().groupBy(cell => cell.row).valueSeq().map(seq => seq)
    )
);
