#!/usr/bin/env bash
# Runs the pre-publish self-test, then scans the repository for forbidden content.
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/prepublish-check.test.mjs
node scripts/prepublish-check.mjs .
