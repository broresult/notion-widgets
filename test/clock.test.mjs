import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clockParts, parseOptions } from '../clock/clock.js';

const d = (h, m) => new Date(2027, 0, 4, h, m); // 2027-01-04 = MONDAY

test('afternoon 12h', () => assert.deepEqual(clockParts(d(14, 5), { hour12: true }), { hh: '02', mm: '05', ampm: 'PM', weekday: 'MONDAY' }));
test('midnight 12h', () => assert.deepEqual(clockParts(d(0, 7), { hour12: true }), { hh: '12', mm: '07', ampm: 'AM', weekday: 'MONDAY' }));
test('noon 12h', () => assert.equal(clockParts(d(12, 0), { hour12: true }).ampm, 'PM'));
test('noon hh 12h', () => assert.equal(clockParts(d(12, 0), { hour12: true }).hh, '12'));
test('24h', () => assert.deepEqual(clockParts(d(0, 7), { hour12: false }), { hh: '00', mm: '07', ampm: '', weekday: 'MONDAY' }));
test('options default follows system theme', () => assert.deepEqual(parseOptions(''), { hour12: true, theme: 'auto' }));
test('options set', () => assert.deepEqual(parseOptions('?h=24&theme=dark'), { hour12: false, theme: 'dark' }));
test('options light forced', () => assert.equal(parseOptions('?theme=light').theme, 'light'));
test('options junk', () => assert.deepEqual(parseOptions('?h=99&theme=neon'), { hour12: true, theme: 'auto' }));
