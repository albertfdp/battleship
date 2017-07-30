const { Record, List } = require('immutable');
const { WATER, BOAT, BOARD_SIZE } = require('../constants');
const { NORTH, EAST, SOUTH, WEST } = require('../constants/directions');

class Cell extends Record({
  row: undefined,
  column: undefined,
  type: WATER,
  hit: false,
  boardSize: BOARD_SIZE
}) {
  static id({ column, row }) {
    if (typeof row === 'undefined' || typeof column === 'undefined') {
      return undefined;
    }

    const letter = String.fromCharCode(row + 65);
    const number = Number(column) + 1;

    return `${letter}${number}`;
  }

  static fromId(id) {
    const row = Number(id.charCodeAt(0) - 65);
    const column = Number(id.slice(1, id.length)) - 1;

    if (row < 0 || isNaN(row)) {
      throw new Error(`Row is invalid (${id}).`);
    } else if (column < 0 || isNaN(column)) {
      throw new Error(`Column is invalid (${id}).`);
    }

    return new Cell({ row, column });
  }

  get id() {
    return Cell.id({ column: this.column, row: this.row });
  }

  isWater() {
    return this.type === WATER;
  }

  isBoat() {
    return this.type === BOAT;
  }

  getNorthCell() {
    if (this.row === 0) {
      return null;
    }

    return new Cell({
      row: this.row - 1,
      column: this.column
    });
  }

  getSouthCell() {
    if (this.row === this.boardSize - 1) {
      return null;
    }

    return new Cell({
      row: this.row + 1,
      column: this.column
    });
  }

  getEastCell() {
    if (this.column === this.boardSize - 1) {
      return null;
    }

    return new Cell({
      row: this.row,
      column: this.column + 1
    });
  }

  getWestCell() {
    if (this.column === 0) {
      return null;
    }

    return new Cell({
      row: this.row,
      column: this.column - 1
    });
  }

  getNeighbours() {
    return new List(
      [
        this.getNorthCell(),
        this.getWestCell(),
        this.getEastCell(),
        this.getSouthCell()
      ].filter(c => c)
    );
  }

  getNeighbour(direction = NORTH) {
    switch (direction) {
      case NORTH:
        return this.getNorthCell();
      case EAST:
        return this.getEastCell();
      case SOUTH:
        return this.getSouthCell();
      case WEST:
        return this.getWestCell();
      default:
        return null;
    }
  }
}

module.exports = Cell;
