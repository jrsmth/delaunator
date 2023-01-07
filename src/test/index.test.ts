import { Greeter } from '../index';

test('My Greeter', () => {
  expect(Greeter('James')).toBe('Hello James');
});