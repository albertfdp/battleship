const expect = require('test/expect');
const R = require('ramda');

const Cell = require('./Cell');
const { WATER } = require('../constants');
const { NORTH, EAST, SOUTH, WEST } = require('../constants/directions');
const { Record, List } = require('immutable');

describe('Cell', () => {
  let cell;

  it('creates a cell', () => {
    cell = new Cell();

    expect(cell, 'to have properties', [
      'row',
      'column',
      'type',
      'hit',
      'boardSize'
    ]);
  });

  describe('id', () => {
    beforeEach(() => {
      cell = new Cell({ column: 0, row: 0 });
    });

    it('computes the id from the row and column', () => {
      expect(cell.id, 'to equal', 'A1');
    });

    const cells = R.times(R.identity, 10).map(column => {
      const cell = new Cell({ row: 0, column });

      it(`computes the coords for column ${cell.id}`, () => {
        expect(
          Cell.fromId(cell.id),
          'to equal',
          new Cell({
            row: cell.row,
            column: cell.column
          })
        );
      });
    });

    describe('coordsFromId', () => {
      it('returns column and row from id', () => {
        expect(Cell.fromId('A1'), 'to equal', new Cell({ row: 0, column: 0 }));
      });

      it('throws when column is invalid', () => {
        expect(() => Cell.fromId('A0'), 'to throw', 'Column is invalid (A0).');
      });

      it('throws when empty as invalid', () => {
        expect(() => Cell.fromId(''), 'to throw', 'Row is invalid ().');
      });

      it('throws when column is invalid', () => {
        expect(() => Cell.fromId('BB'), 'to throw', 'Column is invalid (BB).');
      });
    });

    it('is undefined for a non-initialized cell', () => {
      expect(new Cell().id, 'to be undefined');
      expect(new Cell({ row: 10 }).id, 'to be undefined');
      expect(new Cell({ column: 10 }).id, 'to be undefined');
    });
  });

  describe('neighbours', () => {
    describe('when cell is on the top left corner', () => {
      beforeEach(() => {
        cell = new Cell({ column: 0, row: 0 });
      });

      it(`returns the neighbour on direction NORTH`, () => {
        expect(cell.getNeighbour(NORTH), 'to equal', null);
      });

      it(`returns the neighbour on direction EAST`, () => {
        expect(cell.getNeighbour(EAST), 'to equal', Cell.fromId('A2'));
      });

      it(`returns the neighbour on direction SOUTH`, () => {
        expect(cell.getNeighbour(SOUTH), 'to equal', Cell.fromId('B1'));
      });

      it(`returns the neighbour on direction WEST`, () => {
        expect(cell.getNeighbour(WEST), 'to equal', null);
      });

      it('returns all neighbours', () => {
        expect(
          cell.getNeighbours(),
          'to equal',
          new List([Cell.fromId('A2'), Cell.fromId('B1')])
        );
      });
    });

    describe('when cell is on the top right corner', () => {
      beforeEach(() => {
        cell = new Cell({ column: 9, row: 0 });
      });

      it('currently is on A10', () => {
        expect(cell.id, 'to equal', 'A10');
      });

      it(`returns the neighbour on direction NORTH`, () => {
        expect(cell.getNeighbour(NORTH), 'to equal', null);
      });

      it(`returns the neighbour on direction EAST`, () => {
        expect(cell.getNeighbour(EAST), 'to equal', null);
      });

      it(`returns the neighbour on direction SOUTH`, () => {
        expect(cell.getNeighbour(SOUTH).id, 'to equal', Cell.fromId('B10').id);
      });

      it(`returns the neighbour on direction WEST`, () => {
        expect(cell.getNeighbour(WEST).id, 'to equal', Cell.fromId('A9').id);
      });

      it('returns all neighbours', () => {
        expect(
          cell.getNeighbours(),
          'to equal',
          new List([Cell.fromId('A9'), Cell.fromId('B10')])
        );
      });
    });

    describe('when cell is on the bottom left corner', () => {
      beforeEach(() => {
        cell = new Cell({ column: 0, row: 9 });
      });

      it('currently is on J1', () => {
        expect(cell.id, 'to equal', 'J1');
      });

      it(`returns the neighbour on direction NORTH`, () => {
        expect(cell.getNeighbour(NORTH).id, 'to equal', Cell.fromId('I1').id);
      });

      it(`returns the neighbour on direction EAST`, () => {
        expect(cell.getNeighbour(EAST).id, 'to equal', Cell.fromId('J2').id);
      });

      it(`returns the neighbour on direction SOUTH`, () => {
        expect(cell.getNeighbour(SOUTH), 'to equal', null);
      });

      it(`returns the neighbour on direction WEST`, () => {
        expect(cell.getNeighbour(WEST), 'to equal', null);
      });

      it('returns all neighbours', () => {
        expect(
          cell.getNeighbours(),
          'to equal',
          new List([Cell.fromId('I1'), Cell.fromId('J2')])
        );
      });
    });

    describe('when cell is on the middle', () => {
      beforeEach(() => {
        cell = new Cell({ column: 4, row: 4 });
      });

      it('currently is on E5', () => {
        expect(cell.id, 'to equal', 'E5');
      });

      it(`returns the neighbour on direction NORTH`, () => {
        expect(cell.getNeighbour(NORTH).id, 'to equal', Cell.fromId('D5').id);
      });

      it(`returns the neighbour on direction EAST`, () => {
        expect(cell.getNeighbour(EAST).id, 'to equal', Cell.fromId('E6').id);
      });

      it(`returns the neighbour on direction SOUTH`, () => {
        expect(cell.getNeighbour(SOUTH).id, 'to equal', Cell.fromId('F5').id);
      });

      it(`returns the neighbour on direction WEST`, () => {
        expect(cell.getNeighbour(WEST).id, 'to equal', Cell.fromId('E4').id);
      });

      it('returns all neighbours', () => {
        expect(
          cell.getNeighbours(),
          'to equal',
          new List([
            Cell.fromId('D5'),
            Cell.fromId('E4'),
            Cell.fromId('E6'),
            Cell.fromId('F5')
          ])
        );
      });
    });
  });

  describe('type', () => {
    it('by default is water', () => {
      expect(cell.type, 'to equal', WATER);
    });
  });

  describe('hit', () => {
    it('by default is false', () => {
      expect(cell.hit, 'to equal', false);
    });
  });
});
