import { test } from 'node:test';
import assert from 'node:assert/strict';
import { labelInfo, parseLabel } from '../label/label.js';

const wed = new Date(2026, 10, 18);
test('month info', () => assert.equal(labelInfo(wed, 'month'), 'NOVEMBER'));
test('date info', () => assert.equal(labelInfo(wed, 'date'), '11/18'));
test('week info', () => assert.equal(labelInfo(wed, 'week'), '11/16 – 11/22'));
test('no info', () => assert.equal(labelInfo(wed, ''), ''));
test('parse title and info', () => assert.deepEqual(parseLabel('?t=MONTHLY%20GOAL&info=month'), { title: 'MONTHLY GOAL', info: 'month' }));
test('parse defaults', () => assert.deepEqual(parseLabel(''), { title: '', info: '' }));
test('parse rejects unknown info', () => assert.equal(parseLabel('?t=X&info=weather').info, ''));
test('parse caps long titles', () => assert.equal(parseLabel('?t=' + 'A'.repeat(80)).title.length, 40));
