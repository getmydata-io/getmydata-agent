# Cursor

This repository is a Cursor plugin. The manifest is [`.cursor-plugin/plugin.json`](../../.cursor-plugin/plugin.json) at the repository root.

| Component | Source |
| --- | --- |
| Skill | [`skills/getmydata/SKILL.md`](../../skills/getmydata/SKILL.md) |
| MCP server | `getmydata` → `https://getmydata.io/mcp` (declared inline in the manifest; no variables or credentials) |
| Logo | [`assets/logo.svg`](../../assets/logo.svg) |

## Install

- **Cursor Marketplace:** install GetMyData from the marketplace once it is listed.
- **MCP only:** add [`mcp/cursor.json`](../../mcp/cursor.json) to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

  ```json
  {
    "mcpServers": {
      "getmydata": {
        "url": "https://getmydata.io/mcp"
      }
    }
  }
  ```

- **Skill only:** `npx skills add getmydata-io/getmydata-agent`

In approval prompts, the plugin's MCP server appears as `plugin-getmydata-getmydata`.

## Pricing note

The plugin is free and needs no account or key. Each request includes a free preview of up to 10 rows. Full datasets are a separate paid service on getmydata.io, quoted per request before you decide; you pay on the GetMyData website yourself. Nothing is charged through Cursor.
