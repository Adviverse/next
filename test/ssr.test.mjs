import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Asserted: SSR-safe import, 'use client' preserved in dist, server render emits empty host element.
test('imports with no window/document (SSR-safe)', async () => {
  assert.equal(typeof window, 'undefined');
  const m = await import('../dist/index.js');
  assert.equal(typeof m.AdSlot, 'function');
});

test("dist keeps 'use client' as first line", () => {
  for (const f of ['index.js', 'index.cjs']) {
    assert.match(readFileSync(new URL(`../dist/${f}`, import.meta.url), 'utf8'), /^['"]use client['"];/);
  }
});

test('server render emits <adviverse-ad> without window', async () => {
  const { createElement } = await import('react');
  const { renderToString } = await import('react-dom/server');
  const { AdSlot } = await import('../dist/index.js');
  const html = renderToString(createElement(AdSlot, { tag: 'tk_ssr', sizes: '300x250' }));
  assert.match(html, /<adviverse-ad[^>]*tag="tk_ssr"/);
  assert.equal(typeof window, 'undefined');
});

test('source: element imported only inside useEffect', () => {
  const src = readFileSync(new URL('../src/index.ts', import.meta.url), 'utf8');
  assert.match(src, /^'use client';/);
  assert.doesNotMatch(src, /^import .*@adviverse\/element/m);
  assert.match(src, /useEffect\(\(\) => \{[\s\S]*import\('@adviverse\/element'\)/);
});
