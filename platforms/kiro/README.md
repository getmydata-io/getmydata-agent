# Kiro Powers

This repository is a Kiro power in the Agent Plugins 1.0.0 format.

| File | Purpose |
| --- | --- |
| [`plugin.json`](../../plugin.json) | Agent Plugins manifest (name, version, description, author, keywords) |
| [`mcp.json`](../../mcp.json) | Remote MCP server `getmydata` (`type: streamable-http`, no credentials) |
| [`skills/getmydata/SKILL.md`](../../skills/getmydata/SKILL.md) | Skill loaded when the power activates |

The power activates on keywords such as "getmydata", "public web data", "data extraction" and "dataset".

## Install

1. Open the Powers panel → **Add Custom Power**.
2. Choose **Import power from GitHub**.
3. Enter `https://github.com/getmydata-io/getmydata-agent` and click **Install**.

## Privacy and support

- Privacy policy: https://getmydata.io/privacy
- Support: support@getmydata.io

## Pricing note

The power is free and needs no account or key. Each request includes a free preview of up to 10 rows. Full datasets are a separate paid service on getmydata.io, quoted per request before you decide; you pay on the GetMyData website yourself.
