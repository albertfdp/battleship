import { Record, Map } from 'immutable';

export default class Boat extends Record({
  cells: new Map()
}) {
  get size() {
    return this.cells.size;
  }

  isSunk() {
    return (
      this.cells.size > 0 && this.cells.every(cell => cell.isBoat() && cell.hit)
    );
  }

  static create(cells) {
    return new Boat({
      cells: new Map(cells.map(cell => [cell.id, cell]))
    });
  }
}
