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

  it('prints the board with boats', () => {
    const printedXs = board.print(true).split('').reduce((acc, curr) => {
      return curr === 'X' ? acc + 1 : acc;
    }, 0);

    expect(
      printedXs,
      'to equal',
      board.boats.reduce((acc, curr) => {
        return acc + curr.cells.size;
      }, 0)
    );
  });

  describe('when playing', () => {
    describe('when hitting water', () => {
      it('marks the hit cell', () => {
        const waterCell = board.cells.find(cell => cell.isWater());
        const playedBoard = board.play(waterCell.id);

        expect(playedBoard, 'to have cell', waterCell.id, 'to be hit');
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
        expect(playedBoard, 'to have cell', boatCell.id, 'satisfying', {
          hit: true
        });
      });

      it('marks the boat hit cell', () => {
        expect(
          playedBoard.boats.find(b => b.cells.has(boatCell.id)),
          'to have cell',
          boatCell.id,
          'to be hit'
        );
      });

      it('the boat is not sunk yet', () => {
        expect(
          playedBoard.boats.find(b => b.cells.has(boatCell.id)),
          'not to be sunk'
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
            playedBoard.boats.find(b => b.cells.has(boatCell.id)),
            'to have cell',
            boatCell.id,
            'to be hit'
          );
        });

        it('the boat is not sunk yet', () => {
          expect(
            playedBoard.boats.find(b => b.cells.has(boatCell.id)),
            'to be sunk'
          );
        });
      });
    });
  });
});
