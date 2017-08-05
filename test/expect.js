import unexpected from 'unexpected';
import unexpectedImmutable from 'unexpected-immutable';
import { Record } from 'immutable';

const expect = unexpected.clone().use(unexpectedImmutable);

expect
  .addType({
    name: 'ReduxStore',
    identify: store =>
      store &&
      typeof store.getState === 'function' &&
      typeof store.dispatch === 'function' &&
      typeof store.subscribe === 'function'
  })
  .addType({
    name: 'ImmutableRecord',
    base: 'object',
    identify: value => Record.isRecord(value)
  })
  .addType({
    name: 'Board',
    base: 'object',
    inspect: function(board, depth, output, inspect) {
      output.text('Board');
    },
    identify: value =>
      value &&
      typeof value.boardSize !== 'undefined' &&
      typeof value.cells !== 'undefined' &&
      typeof value.boats !== 'undefined'
  })
  .addType({
    name: 'Boat',
    base: 'ImmutableRecord',
    identify: value =>
      value &&
      typeof value.cells !== 'undefined' &&
      typeof value.isSunk === 'function'
  })
  .addType({
    name: 'Cell',
    base: 'ImmutableRecord',
    identify: value =>
      value &&
      typeof value.boardSize !== 'undefined' &&
      typeof value.row !== 'undefined' &&
      typeof value.column !== 'undefined' &&
      typeof value.type !== 'undefined'
  })
  .addAssertion(
    ['<ReduxStore> to have state satisfying <any>'],
    (expect, subject, value) => {
      expect(subject.getState(), 'to satisfy', value);
    }
  )
  .addAssertion(
    ['<ReduxStore> when receiving action <function> <assertion>'],
    (expect, subject, value) => {
      expect(subject.dispatch(value()), 'to satisfy', value);
    }
  )
  .addAssertion(['<Board> [not] to have game over'], (expect, subject) =>
    expect(subject.isGameOver(), '[not] to be true')
  )
  .addAssertion(['<Boat> [not] to be sunk'], (expect, subject) =>
    expect(subject.isSunk(), '[not] to be true')
  )
  .addAssertion(['<Board|Boat> to have cells <assertion>'], (expect, subject) =>
    expect.shift(subject.cells)
  )
  .addAssertion(
    ['<Board|Boat> to have cell <string> <assertion>'],
    (expect, subject, value) => expect.shift(subject.cells.get(value))
  )
  .addAssertion(['<Cell> satisfying <object>'], (expect, subject, value) => {
    expect(subject.toJS(), 'to satisfy', value);
  })
  .addAssertion(['<Cell> [not] to be hit'], (expect, subject) => {
    if (expect.flags['not']) {
      return expect(subject.toJS(), 'to satisfy', { hit: false });
    }
    return expect(subject.toJS(), 'to satisfy', { hit: true });
  })
  .addAssertion(['<Cell> [not] to be a boat'], (expect, subject) => {
    return expect(subject.isBoat(), '[not] to be true');
  })
  .addAssertion(['<Cell> [not] to be water'], (expect, subject) => {
    return expect(subject.isWater(), '[not] to be true');
  })
  .addAssertion(
    ['<ImmutableRecord> to have properties <array>'],
    (expect, subject, value) => expect(subject._keys, 'to equal', value)
  )
  .addAssertion(['<any> to match snapshot'], (expect, subject) => {
    global.expect(subject).toMatchSnapshot();
  });

export default expect;
