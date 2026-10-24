#!/usr/bin/env node
// Self-test for prepublish-check.mjs. Forbidden samples are assembled at runtime
// with join() so this file stays clean under the check itself.
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { scan } from './prepublish-check.mjs';

const j = (...p) => p.join('');
const cases = [
  // [description, file, content, expected rule or null for pass]
  ['clean readme', 'README.md', 'Connect to https://getmydata.io/mcp. Contact support@getmydata.io.', null],
  ['supplier name', 'a.md', j('Runs on Ap', 'ify'), 'supplier'],
  ['supplier word', 'a.md', j('Pick the best ac', 'tor'), 'supplier'],
  ['no false hit on factor', 'a.md', 'A key factor and a contractor.', null],
  ['no false hit on actions checkout', 'ci.yml', j('uses: actions/check', 'out@v4'), null],
  ['worker host url', 'a.md', j('https://x.wor', 'kers.dev'), 'internal-url'],
  ['pre-prod env', 'a.md', j('deploy to sta', 'ging'), 'internal-url'],
  ['admin path', 'a.md', j('open https://getmydata.io/ad', 'min/settings'), 'internal-url'],
  ['pem key', 'k.pem', j('-----BEGIN ', 'PRIVATE KEY-----'), 'secret'],
  ['github token', 'a.md', j('gh', 'p_', 'A'.repeat(36)), 'secret'],
  ['aws key', 'a.md', j('AK', 'IA', 'ABCDEFGHIJKLMNOP'), 'secret'],
  ['assigned api key', 'a.json', j('{"api', '_key": "', 'abcdefgh12345678"}'), 'secret'],
  ['pricing keyword', 'a.md', j('target mar', 'gin 60%'), 'pricing'],
  ['money unit field', 'a.js', j('const cap_mi', 'cros = 1'), 'pricing'],
  ['max attempts', 'a.js', j('max', '_attempts: 8'), 'pricing'],
  ['private repo', 'a.md', j('see rob', 'inwxm/getmydata'), 'private-ref'],
  ['internal path', 'a.md', j('/work', 'space/notes.md'), 'private-ref'],
  ['other email', 'a.md', j('mail ops', '@', 'getmydata.io'), 'email'],
  ['personal email', 'a.md', j('jane', '@', 'example.com'), 'email'],
  ['checkout link', 'a.md', j('https://getmydata.io/check', 'out/abc'), 'checkout'],
  ['payment provider', 'a.md', j('https://buy.str', 'ipe.com/x'), 'checkout'],
  ['LICENSE allowlisted', 'LICENSE', j('Ap', 'ify ac', 'tor mar', 'gin'), null],
];

let failed = 0;
for (const [desc, file, content, expected] of cases) {
  const dir = mkdtempSync(join(tmpdir(), 'ppc-'));
  try {
    writeFileSync(join(dir, file), content + '\n');
    const rules = scan(dir).map((f) => f.rule);
    const ok = expected === null ? rules.length === 0 : rules.includes(expected);
    if (!ok) { failed++; console.error(`FAIL ${desc}: expected ${expected ?? 'pass'}, got [${rules.join(', ')}]`); }
    else console.log(`ok   ${desc}`);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
if (failed) { console.error(`\nself-test: ${failed} failed`); process.exit(1); }
console.log(`\nself-test: all ${cases.length} cases passed`);
