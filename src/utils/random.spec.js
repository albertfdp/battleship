import expect from 'test/expect';
import random from './random';

describe('random', () => {
  it('returns a number between 0 and 10', () => {
    const number = random();

    expect(number, 'to be greater than or equal to', 0);
    expect(number, 'to be less than or equal to', 10);
  });

  it('returns a number between 3 and 5', () => {
    const number = random(3, 5);

    expect(number, 'to be greater than or equal to', 3);
    expect(number, 'to be less than or equal to', 5);
  });
});
