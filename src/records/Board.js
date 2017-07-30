import R from 'ramda';
import { Record, Map, List } from 'immutable';
import Boat from './Boat';
import { BOAT } from '../constants';
import * as directions from '../constants/directions';
import { random } from '../utils';
import Cell from './Cell';

class Board extends Record({
  boardSize: undefined,
  cells: new Map(),
  boats: new List()
}) {
  static create(size = 10) {
    return new Board({
      boardSize: size,
      cells: new Map(
        R.flatten(
          R.times(R.identity, size).map(row =>
            R.times(R.identity, size).map(
              column => new Cell({ row, column, boardSize: size })
            )
          )
        ).map(cell => [cell.id, cell])
      )
    });
  }

  isGameOver() {
    return this.boats.every(boat => boat.isSunk());
  }

  cellsToList() {
    return R.times(R.identity, this.boardSize).map(row =>
      R.times(R.identity, this.boardSize).map(column =>
        this.cells.get(Cell.id({ column, row }))
      )
    );
  }

  play(id) {
    const playedCell = this.cells.get(id).set('hit', true);

    if (playedCell.isWater()) {
      return this.merge({
        cells: this.cells.set(playedCell.id, playedCell)
      });
    } else {
      return this.merge({
        boats: this.boats.update(
          this.boats.findIndex(boat => boat.cells.has(playedCell.id)),
          boat =>
            boat.updateIn(['cells'], cells =>
              cells.set(playedCell.id, playedCell)
            )
        ),
        cells: this.cells.set(playedCell.id, playedCell)
      });
    }
  }

  addBoat(size, retries = 0) {
    const cells = this.getRandomAvailableBoatCells(size);

    if (!cells && retries >= 2) {
      throw new Error(`Could not add a boat of size ${size}`);
    } else if (!cells) {
      return this.addBoat(size, retries + 1);
    }

    const boatCells = cells.map(cell => cell.set('type', BOAT));
    const boat = Boat.create(boatCells);

    return this.merge({
      boats: this.boats.push(boat),
      cells: this.cells.merge(boatCells.map(cell => [cell.id, cell]))
    });
  }

  getRandomAvailableBoatCells(size) {
    if (size <= 0) {
      return null;
    }

    let available = new List();

    this.cells.forEach(cell => {
      Object.keys(directions).forEach(direction => {
        const cells = this.findRecursiveNeighbours(
          cell,
          directions[direction],
          new List(),
          size
        );

        if (cells.size >= size) {
          available = available.push(cells);
        }
      });
    });

    if (available.size === 0) {
      return null;
    }

    return available.get(random(0, available.size));
  }

  findRecursiveNeighbours(cell, direction, neighbours, size) {
    if (
      neighbours.isEmpty() &&
      cell.isWater() &&
      cell.getNeighbours().every(n => this.cells.get(n.id).isWater())
    ) {
      return this.findRecursiveNeighbours(
        cell,
        direction,
        neighbours.push(cell),
        size
      );
    } else if (neighbours.isEmpty()) {
      return new List();
    }

    const next = cell.getNeighbour(direction);

    if (
      next &&
      next.isWater() &&
      next.getNeighbours().every(n => this.cells.get(n.id).isWater()) &&
      size > neighbours.size
    ) {
      return this.findRecursiveNeighbours(
        next,
        direction,
        neighbours.push(next),
        size
      );
    }

    return neighbours;
  }

  print(showBoats = false) {
    let output = '\n';

    this.cellsToList().map((row, id) => {
      row.map((column, columnIdx) => {
        const number = String(Number(column.id.slice(1, column.id.length)));

        if (id === 0 && columnIdx === 0) {
          output += `----${number}`;
        } else if (id === 0) {
          output += `----${number}`;
        } else {
          output += `-----`;
        }
      });

      output += id === 0 ? '-\n' : '--\n';

      row.map((column, columnIdx) => {
        const letter = columnIdx === 0 ? column.id[0] : '';
        const inner = column.isWater() || !showBoats ? ' ' : 'X';

        output += `${letter} | ${inner} `;
      });

      output += '|\n';

      if (id === this.boardSize - 1) {
        row.map((_, id) => {
          if (id === 0) {
            output += `-------`;
          } else {
            output += `-----`;
          }
        });
      }
    });

    return output;
  }
}
export default Board;
