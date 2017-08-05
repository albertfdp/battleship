import expect from 'test/expect';

import { init } from '../actions/BoardActions';
import configureStore from '../stores';

import { cellRowsSelector } from './CellSelectors';

describe('CellSelectors', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
    store.dispatch(init());
  });

  it('groups the cells into rows', () => {
    expect(cellRowsSelector(store.getState()), 'to have size', 10);
  });

  it('each row has 10 cells', () => {
    const cells = cellRowsSelector(store.getState());

    cells.map(row => expect(row, 'to have size', 10));
  });
});
