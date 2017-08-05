import expect from 'test/expect';
import { List } from 'immutable';

import { init } from '../actions/BoardActions';
import configureStore from '../stores';

describe('cells', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  describe('initial state', () => {
    it('is empty list', () => {
      expect(store, 'to have state satisfying', {
        cells: new List()
      });
    });
  });

  describe('when initiallizing the board', () => {
    beforeEach(() => {
      store.dispatch(init());
    });

    it('groups the cells into rows', () => {
      const { cells } = store.getState();

      expect(cells, 'to have size', 10);
    });

    it('each row has 10 cells', () => {
      const { cells } = store.getState();

      cells.map(row => expect(row, 'to have size', 10));
    });
  });
});
