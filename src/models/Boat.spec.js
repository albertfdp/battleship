const expect = require('test/expect');
const Boat = require('./Boat');
const Cell = require('./Cell');
const { Record } = require('immutable');
const { BOAT } = require('../constants');

describe('Boat', () => {
  let boat;

  beforeEach(() => {
    boat = new Boat();
  });

  it('creates a boat', () => {
    boat = new Boat();

    expect(boat, 'to have properties', ['cells']);
  });

  describe('when initializing', () => {
    let cells;

    beforeEach(() => {
      cells = [0, 1, 2, 3].map(
        row =>
          new Cell({
            column: 0,
            row
          })
      );

      boat = Boat.create(cells);
    });

    it('creates a boat from an array of cells', () => {
      expect(boat, 'to have properties', ['cells']);
    });

    it('boat has size equal to the cells', () => {
      expect(boat.size, 'to equal', 4);
      expect(boat.size, 'to equal', boat.cells.size);
    });
  });

  describe('state', () => {
    describe('when it is not initialized', () => {
      it('is not marked as sunk', () => {
        expect(boat.isSunk(), 'to be false');
      });
    });

    describe('when initialized', () => {
      beforeEach(() => {
        cells = [0, 1, 2, 3].map(
          row =>
            new Cell({
              column: 0,
              row,
              type: BOAT,
              hit: true
            })
        );

        boat = Boat.create(cells);
      });

      it('is not sunk when some cells are of type BOAT and were hit', () => {
        boat = boat.updateIn(['cells'], cells =>
          cells.update('A1', cell => cell.set('hit', false))
        );

        expect(boat.isSunk(), 'to be false');
      });

      it('is sunk when all cells are of type BOAT and were hit', () => {
        expect(boat.isSunk(), 'to be true');
      });
    });
  });
});
