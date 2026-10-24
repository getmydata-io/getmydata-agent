# Grok Build

This repository is a Grok Build plugin.

| Component | Source |
| --- | --- |
| Manifest | [`.grok-plugin/plugin.json`](../../.grok-plugin/plugin.json) |
| Skill | [`skills/getmydata/SKILL.md`](../../skills/getmydata/SKILL.md) |
| MCP server | [`.mcp.json`](../../.mcp.json): `getmydata` → `https://getmydata.io/mcp` |

## Network endpoints and credentials

- The plugin calls one endpoint: `https://getmydata.io/mcp` (remote MCP, Streamable HTTP).
- It needs no credentials, API key or environment variables.
- It ships no hooks, commands, scripts or binaries. Nothing runs locally.
- Data sent: the request details the user agrees with the agent and the email address they give for the one-time code.

## Install

Install GetMyData from the Grok Build plugin marketplace once it is listed. Marketplace entries point at a pinned commit of this repository.

## Pricing note

The plugin is free and needs no account or key. Each request includes a free preview of up to 10 rows. Full datasets are a separate paid service on getmydata.io, quoted per request before you decide; you pay on the GetMyData website yourself.

## License

Apache-2.0. See [LICENSE](../../LICENSE).
