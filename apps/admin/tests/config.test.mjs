import test from 'node:test';
import assert from 'node:assert/strict';

test('Admin Next.js config is defined', async () => {
  const config = await import('../next.config.mjs');
  assert.equal(typeof config.default, 'object');
});
