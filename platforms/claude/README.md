# Claude Code

This repository is a Claude Code plugin and a single-plugin marketplace.

| File | Purpose |
| --- | --- |
| [`.claude-plugin/plugin.json`](../../.claude-plugin/plugin.json) | Plugin manifest |
| [`.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json) | Marketplace file listing the plugin at the repository root |
| [`.mcp.json`](../../.mcp.json) | Remote MCP server `getmydata` (`type: http`, no credentials) |
| [`skills/getmydata/SKILL.md`](../../skills/getmydata/SKILL.md) | Skill, available as `getmydata:getmydata` |

## Install

As a plugin:

```
/plugin marketplace add getmydata-io/getmydata-agent
/plugin install getmydata@getmydata
```

MCP server only:

```
claude mcp add --transport http getmydata https://getmydata.io/mcp
```

Validate a local checkout:

```
claude plugin validate .
```

## Pricing note

The plugin is free and needs no account or key. Each request includes a free preview of up to 10 rows. Full datasets are a separate paid service on getmydata.io, quoted per request before you decide; you pay on the GetMyData website yourself.
