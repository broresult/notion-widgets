import { test } from 'node:test';
import assert from 'node:assert/strict';
import { weekRange } from '../week/week.js';

test('monday is the first day', () => assert.deepEqual(weekRange(new Date(2026, 10, 16)), { start: '11/16', end: '11/22', week: 47 }));
test('sunday belongs to the same week', () => assert.deepEqual(weekRange(new Date(2026, 10, 22)), { start: '11/16', end: '11/22', week: 47 }));
test('week crossing a month', () => assert.deepEqual(weekRange(new Date(2026, 11, 2)), { start: '11/30', end: '12/6', week: 49 }));
test('iso week 1 starting in previous year', () => assert.deepEqual(weekRange(new Date(2027, 0, 1)), { start: '12/28', end: '1/3', week: 53 }));
test('iso week 1', () => assert.equal(weekRange(new Date(2027, 0, 4)).week, 1));

import { dayLabel, parseDay } from '../week/week.js';
const wed = new Date(2026, 10, 18);
test('day 1 is this week\'s monday', () => assert.deepEqual(dayLabel(wed, 1), { name: 'Monday', md: '11/16', today: false }));
test('day 3 on wednesday is today', () => assert.deepEqual(dayLabel(wed, 3), { name: 'Wednesday', md: '11/18', today: true }));
test('day 7 is sunday of the same week', () => assert.deepEqual(dayLabel(wed, 7), { name: 'Sunday', md: '11/22', today: false }));
test('on sunday, day 1 is the monday before', () => assert.equal(dayLabel(new Date(2026, 10, 22), 1).md, '11/16'));
test('day across a month end', () => assert.equal(dayLabel(new Date(2026, 11, 2), 1).md, '11/30'));
test('parseDay reads d=1..7', () => assert.equal(parseDay('?d=5'), 5));
test('parseDay falls back to 1', () => { assert.equal(parseDay(''), 1); assert.equal(parseDay('?d=9'), 1); assert.equal(parseDay('?d=x'), 1); });
