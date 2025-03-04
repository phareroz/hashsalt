'use strict';

const test = require('node:test');
const assert = require('node:assert').strict;

const hashsalt = require('../hashsalt.js');

test.describe("hashsalt test", () =>
{
  test.it('success check', async () =>
  {
    const hashed = hashsalt.hashsaltgen('toto');
    const shoudbetrue = hashsalt.hashsaltcheck('toto', hashed);
    assert.equal(shoudbetrue, true);
  });

  test.it('failed check', async () =>
  {
    const hashed = hashsalt.hashsaltgen('toto');
    const shoudbefalse = hashsalt.hashsaltcheck('titi', hashed);
    assert.equal(shoudbefalse, false);
  });
});