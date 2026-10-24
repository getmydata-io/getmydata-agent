#!/usr/bin/env node
// Pre-publish content check for this public repository.
// Fails when any tracked text file contains content that must never be published.
// Patterns are written with character classes (e.g. "[a]") so this file does not
// match itself; it is scanned like every other file. No secret values live here.
//
// Usage: node scripts/prepublish-check.mjs [rootDir]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const ALLOWED_EMAIL = 'support@getmydata.io';

// Only the license text may contain matches (its legal wording is fixed).
const ALLOWLISTED_FILES = new Set(['LICENSE']);

export const RULES = [
  // Supplier names
  { id: 'supplier', re: /[a]pify/i },
  { id: 'supplier', re: /\b[a]ctors?\b/i },

  // Internal URLs, environments and admin paths
  { id: 'internal-url', re: /[w]orkers\.dev/i },
  { id: 'internal-url', re: /[p]ages\.dev/i },
  { id: 'internal-url', re: /[s]taging/i },
  { id: 'internal-url', re: /\/[a]dmin\b/i },
  { id: 'internal-url', re: /\b[l]ocalhost\b|\b127\.0\.0\.[1]\b/i },
  { id: 'internal-url', re: /[c]loudflareaccess\.com/i },

  // Secret patterns (formats only, never values)
  { id: 'secret', re: /-{5}BEGIN [A-Z ]*PRIVATE KEY-{5}/ },
  { id: 'secret', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'secret', re: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/ },
  { id: 'secret', re: /\bgithub_pat_[A-Za-z0-9_]{20,}/ },
  { id: 'secret', re: /\bsk[-_](?:live|test|proj|ant)?[-_]?[A-Za-z0-9]{20,}/ },
  { id: 'secret', re: /\bre_[A-Za-z0-9_]{20,}/ },
  { id: 'secret', re: /\bxox[abprs]-[A-Za-z0-9-]{10,}/ },
  { id: 'secret', re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { id: 'secret', re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\./ },
  { id: 'secret', re: /\b[Bb]earer\s+[A-Za-z0-9._~+\/-]{20,}/ },
  { id: 'secret', re: /\b(?:api[_-]?key|secret|token|passwd|password|client[_-]?secret)\b["']?\s*[:=]\s*["'][^"'\s]{8,}["']/i },

  // Pricing and internal limit keywords
  { id: 'pricing', re: /\b[m]argins?\b/i },
  { id: 'pricing', re: /\b[m]arkups?\b/i },
  { id: 'pricing', re: /\b[f]loor(?:_?price)?\b/i },
  { id: 'pricing', re: /\b[g]ross[ _-]?profit\b/i },
  { id: 'pricing', re: /[_a-z][m]icros\b/i },
  { id: 'pricing', re: /[m]ax_?attempts/i },
  { id: 'pricing', re: /[c]ost_?caps?\b|[b]udget_?caps?\b|[p]rice_?caps?\b/i },
  { id: 'pricing', re: /\b[t]hresholds?\b/i },
  { id: 'pricing', re: /[p]ricing[_ ]?formula|[u]nit[_ ]?cost/i },

  // Private repository identifiers and internal file paths
  { id: 'private-ref', re: /[r]obinwxm/i },
  { id: 'private-ref', re: /\/[w]orkspace\/|\/[h]ome\/box\b/i },
  { id: 'private-ref', re: /[w]rangler\.(?:toml|jsonc?)\b/i },
  { id: 'private-ref', re: /\b[m]igrations\/\d{4}/i },

  // Checkout and payment links
  { id: 'checkout', re: /(?<!actions)\/[c]heckout\b/i },
  { id: 'checkout', re: /getmydata\.io\/(?:[p]ay|[b]uy|[o]rder)\b/i },
  { id: 'checkout', re: /[s]tripe\.com|[p]aypal\.com|[l]emonsqueezy|[p]addle\.com|[c]reem\.io/i },
];

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;

function listFiles(root) {
  try {
    const out = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const files = out.split('\0').filter(Boolean);
    if (files.length) return files;
  } catch { /* not a git repo: walk instead */ }
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === '.git' || name === 'node_modules') continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else files.push(relative(root, p).split(sep).join('/'));
    }
  };
  walk(root);
  return files;
}

export function scan(root) {
  const findings = [];
  for (const file of listFiles(root)) {
    if (ALLOWLISTED_FILES.has(file)) continue;
    let buf;
    try { buf = readFileSync(join(root, file)); } catch { continue; }
    if (buf.includes(0)) continue; // binary
    const lines = buf.toString('utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const rule of RULES) {
        const m = line.match(rule.re);
        if (m) findings.push({ file, line: i + 1, rule: rule.id, match: m[0] });
      }
      for (const m of line.matchAll(EMAIL_RE)) {
        if (m[0].toLowerCase() !== ALLOWED_EMAIL) findings.push({ file, line: i + 1, rule: 'email', match: m[0] });
      }
    });
  }
  return findings;
}

function redact(s) {
  return s.length > 12 ? s.slice(0, 6) + '…' + s.slice(-2) : s;
}

const isMain = process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href;
if (isMain) {
  const root = process.argv[2] || process.cwd();
  const findings = scan(root);
  if (findings.length) {
    for (const f of findings) console.error(`${f.file}:${f.line}: [${f.rule}] ${redact(f.match)}`);
    console.error(`\nprepublish-check: FAILED (${findings.length} finding${findings.length === 1 ? '' : 's'})`);
    process.exit(1);
  }
  console.log('prepublish-check: OK (no forbidden content)');
}
