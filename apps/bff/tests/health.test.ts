import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AddressInfo } from 'node:net';
import { createServer } from '../src/server.js';

test('health endpoint returns ok', async (t) => {
  const { httpServer } = await createServer();
  await new Promise<void>((resolve) => httpServer.listen(0, resolve));
  t.after(() =>
    new Promise<void>((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
  );

  const { port } = httpServer.address() as AddressInfo;
  const response = await fetch(`http://127.0.0.1:${port}/health`);
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.deepEqual(payload, { status: 'ok' });
});
