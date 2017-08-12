import { createSelector } from 'reselect';
import { List } from 'immutable';

const cellsSelector = (state, player) => state.boards.get(player).get('cells');

export const cellRowsSelector = createSelector(
  cellsSelector,
  cells =>
    new List(
      cells.valueSeq().groupBy(cell => cell.row).valueSeq().map(seq =>
        seq.sort((a, b) => {
          if (a.column < b.column) {
            return -1;
          } else if (a.column > b.column) {
            return 1;
          } else if (a.column === b.column) {
            return 0;
          }
        })
      )
    )
);
