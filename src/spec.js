const expect = require('test/expect');
const { createBoard } = require('.');

describe('createBoard', () => {
  let board;

  beforeEach(() => {
    board = createBoard([5, 4, 4, 3, 2, 1]);
  });

  it('creates a board with 100 cells', () => {
    expect(board.cells.size, 'to equal', 100);
  });

  it('creates a board with 4 boats', () => {
    expect(board.boats.size, 'to equal', 6);
  });

  it('prints the board with no boats', () => {
    expect(board.print(), 'to match snapshot');
  });
});
