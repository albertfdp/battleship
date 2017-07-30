const unexpected = require('unexpected');
const unexpectedImmutable = require('unexpected-immutable');
const expect = unexpected.clone().use(unexpectedImmutable);

const { Record } = require('immutable');

expect
  .addType({
    name: 'ImmutableRecord',
    base: 'object',
    inspect: function(record, depth, output, inspect) {
      output
        .text(`new ${Record.getDescriptiveName(record)}(`)
        .append(inspect(record.toJS(), depth))
        .text(')');
    },
    identify: value => Record.isRecord(value)
  })
  .addAssertion(
    ['<ImmutableRecord> to have properties <array>'],
    (expect, subject, value) => expect(subject._keys, 'to equal', value)
  )
  .addAssertion(['<any> to match snapshot'], (expect, subject) => {
    global.expect(subject).toMatchSnapshot();
  });

module.exports = expect;
