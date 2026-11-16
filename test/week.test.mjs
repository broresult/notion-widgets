import { test } from 'node:test';
import assert from 'node:assert/strict';
import { weekRange } from '../week/week.js';

test('monday is the first day', () => assert.deepEqual(weekRange(new Date(2026, 10, 16)), { start: '11/16', end: '11/22', week: 47 }));
test('sunday belongs to the same week', () => assert.deepEqual(weekRange(new Date(2026, 10, 22)), { start: '11/16', end: '11/22', week: 47 }));
test('week crossing a month', () => assert.deepEqual(weekRange(new Date(2026, 11, 2)), { start: '11/30', end: '12/6', week: 49 }));
test('iso week 1 starting in previous year', () => assert.deepEqual(weekRange(new Date(2027, 0, 1)), { start: '12/28', end: '1/3', week: 53 }));
test('iso week 1', () => assert.equal(weekRange(new Date(2027, 0, 4)).week, 1));
