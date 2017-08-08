import { createSelector } from 'reselect';
import { List } from 'immutable';

const cellsSelector = (state, player) => state.boards.get(player).get('cells');

export const cellRowsSelector = createSelector(
  cellsSelector,
  cells =>
    new List(
      cells.valueSeq().groupBy(cell => cell.row).valueSeq().map(seq => seq)
    )
);
