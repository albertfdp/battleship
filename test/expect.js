const unexpected = require('unexpected');
const unexpectedImmutable = require('unexpected-immutable');
const expect = unexpected.clone().use(unexpectedImmutable);

const { Record } = require('immutable');

expect
  .addType({
    name: 'ImmutableRecord',
    base: 'object',
    identify: value => Record.isRecord(value)
  })
  .addType({
    name: 'Board',
    base: 'ImmutableRecord',
    identify: value =>
      value &&
      typeof value.boardSize !== 'undefined' &&
      typeof value.cells !== 'undefined' &&
      typeof value.boats !== 'undefined'
  })
  .addAssertion(['<Board> [not] to have game over'], (expect, subject) =>
    expect(subject.isGameOver(), '[not] to be true')
  )
  .addAssertion(
    ['<ImmutableRecord> to have properties <array>'],
    (expect, subject, value) => expect(subject._keys, 'to equal', value)
  )
  .addAssertion(['<any> to match snapshot'], (expect, subject) => {
    global.expect(subject).toMatchSnapshot();
  });

module.exports = expect;
