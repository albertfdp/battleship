const { Record, Map } = require('immutable');
const { BOAT } = require('../constants');

class Boat extends Record({
  cells: new Map()
}) {
  get size() {
    return this.cells.size;
  }

  isSunk() {
    return (
      this.cells.size > 0 &&
      this.cells.every(cell => cell.type === BOAT && cell.hit)
    );
  }

  static create(cells) {
    return new Boat({
      cells: new Map(cells.map(cell => [cell.id, cell]))
    });
  }
}

module.exports = Boat;
