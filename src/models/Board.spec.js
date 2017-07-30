const expect = require('test/expect');
const Board = require('./Board');
const Cell = require('./Cell');
const { Record, List } = require('immutable');
const { BOAT } = require('../constants');
const { EAST } = require('../constants/directions');

describe('Board', () => {
  let board;

  it('creates a board', () => {
    board = new Board();

    expect(board, 'to have properties', ['boardSize', 'cells', 'boats']);
  });

  describe('when initializing', () => {
    beforeEach(() => {
      board = Board.create(10);
    });

    it('creates a board from an array of cells', () => {
      expect(board, 'to have properties', ['boardSize', 'cells', 'boats']);
    });

    it('creates a board from an array of cells', () => {
      expect(board.cells, 'to have size', 10 * 10);
    });

    it('can access any cell using its id', () => {
      expect(
        board.cells.get('A1'),
        'to equal',
        new Cell({ row: 0, column: 0 })
      );
    });
  });

  describe('getRandomAvailableBoatCells', () => {
    let cells;

    beforeEach(() => {
      board = Board.create(10);
      cells = board.getRandomAvailableBoatCells(4);
    });

    it('returns a list of WATER cells of the given size', () => {
      expect(cells, 'to have size', 4);
      expect(cells.every(c => c.isWater()), 'to be true');
    });

    it('all cells are water type', () => {
      expect(cells.every(c => c.isWater()), 'to be true');
    });

    it('no cell has a neighbour boat', () => {
      expect(
        cells.every(c =>
          c.getNeighbours().every(neighbour => neighbour.isWater())
        ),
        'to be true'
      );
    });
  });

  describe('findRecursiveNeighbours', () => {
    beforeEach(() => {
      board = Board.create(10).update('cells', cells =>
        cells.update(Cell.id({ row: 1, column: 1 }), cell =>
          cell.set('type', BOAT)
        )
      );
    });

    it('stops when finding boat B2 as neighbour of A2', () => {
      expect(board.cells.get('B2').isBoat(), 'to be true');

      expect(
        board.findRecursiveNeighbours(
          board.cells.get('A1'),
          EAST,
          new List(),
          3
        ),
        'to equal',
        new List([board.cells.get('A1')])
      );
    });
  });

  describe('addBoard', () => {
    let cells;

    beforeEach(() => {
      board = Board.create(10).addBoat(4);
    });

    describe('when adding a single boat', () => {
      it('is added to the board', () => {
        expect(board.boats, 'to have size', 1);
      });

      it('all cells in boat are of type boat', () => {
        const cells = board.boats.first().cells;

        expect(cells.every(cell => cell.isBoat()), 'to be true');
      });

      it('the cells of the boat are marked as type boat in the board', () => {
        const boatCells = board.boats.first().cells;
        const cells = board.cells.filter(cell => boatCells.has(cell.id));

        expect(cells, 'to have size', 4);
        expect(cells.every(cell => cell.isBoat()), 'to be true');
      });
    });

    describe('when conditions are not possible', () => {
      it('throws an error', () => {
        expect(
          () => board.addBoat(11),
          'to throw',
          'Could not add a boat of size 11'
        );
        expect(
          () => board.addBoat(0),
          'to throw',
          'Could not add a boat of size 0'
        );
        expect(
          () => board.addBoat(-10),
          'to throw',
          'Could not add a boat of size -10'
        );
      });
    });
  });
});
