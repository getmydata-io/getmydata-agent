# Gemini CLI

This repository is a Gemini CLI extension. The manifest is [`gemini-extension.json`](../../gemini-extension.json) at the repository root.

| Component | Source |
| --- | --- |
| MCP server | `getmydata` → `httpUrl: https://getmydata.io/mcp` (no credentials, no settings) |
| Skill | [`skills/getmydata/SKILL.md`](../../skills/getmydata/SKILL.md) |

## Install

```
gemini extensions install https://github.com/getmydata-io/getmydata-agent
```

Restart the CLI session after installing. Run `gemini extensions update getmydata` to pull later changes.

MCP server only: add [`mcp/gemini-settings.json`](../../mcp/gemini-settings.json) to `~/.gemini/settings.json`.

## Pricing note

The extension is free and needs no account or key. Each request includes a free preview of up to 10 rows. Full datasets are a separate paid service on getmydata.io, quoted per request before you decide; you pay on the GetMyData website yourself.
