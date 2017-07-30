const expect = require('test/expect');
const { List } = require('immutable');
const { createBoard } = require('.');

describe('createBoard', () => {
  let board;

  beforeEach(() => {
    board = createBoard();
  });

  it('creates a board with 100 cells', () => {
    expect(board.cells, 'to have size', 100);
  });

  it('creates a board with 7 boats', () => {
    expect(board.boats, 'to have size', 7);
  });

  it('prints the board with no boats', () => {
    expect(board.print(), 'to match snapshot');
  });

  describe('when playing', () => {
    describe('when hitting water', () => {
      it('marks the hit cell', () => {
        const waterCell = board.cells.find(cell => cell.isWater());

        expect(
          board.play(waterCell.id),
          'to equal',
          board.merge({
            cells: board.cells.set(waterCell.id, waterCell.set('hit', true))
          })
        );
      });
    });

    describe('when game over', () => {
      let playedBoard;

      beforeEach(() => {
        playedBoard = board;
        const cells = board.boats.map(boat => boat.cells).flatten();
        cells.forEach(cell => {
          playedBoard = playedBoard.play(cell.id);
        });
      });

      it('isGameOver', () => {
        expect(playedBoard, 'to have game over');
      });
    });

    describe('when hitting a boat', () => {
      let boatCell;
      let boat;
      let playedBoard;

      beforeEach(() => {
        boat = board.boats.find(b => b.size === 5);
        boatCell = boat.cells.first();
        playedBoard = board.play(boatCell.id);
      });

      it('marks the hit cell', () => {
        expect(
          playedBoard.cells.get(boatCell.id),
          'to equal',
          boatCell.set('hit', true)
        );
      });

      it('marks the boat hit cell', () => {
        expect(
          playedBoard.boats
            .find(b => b.cells.has(boatCell.id))
            .cells.get(boatCell.id),
          'to equal',
          boatCell.set('hit', true)
        );
      });

      it('the boat is not sunk yet', () => {
        expect(
          playedBoard.boats.find(b => b.cells.has(boatCell.id)).isSunk(),
          'to equal',
          false
        );
      });

      describe('when sinking the boat', () => {
        beforeEach(() => {
          boat = board.boats.find(b => b.size === 1);
          boatCell = boat.cells.first();
          playedBoard = board.play(boatCell.id);
        });

        it('marks the boat hit cell', () => {
          expect(
            playedBoard.boats
              .find(b => b.cells.has(boatCell.id))
              .cells.get(boatCell.id),
            'to equal',
            boatCell.set('hit', true)
          );
        });

        it('the boat is not sunk yet', () => {
          expect(
            playedBoard.boats.find(b => b.cells.has(boatCell.id)).isSunk(),
            'to equal',
            true
          );
        });
      });
    });
  });
});
