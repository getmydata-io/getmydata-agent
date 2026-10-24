# MCP configuration

GetMyData runs a remote MCP server. Nothing runs locally and no credentials are needed.

- URL: `https://getmydata.io/mcp`
- Transport: Streamable HTTP
- Authentication: none
- Server name used in these files: `getmydata`

Pair the MCP server with the [skill](../skills/getmydata/SKILL.md) so your agent follows the request, preview, quote and delivery steps correctly.

## Files

| File | Format | For |
| --- | --- | --- |
| [`../mcp.json`](../mcp.json) | Agent Plugins 1.0.0 (`type: streamable-http`) | Kiro Powers and other Agent Plugins clients |
| [`../.mcp.json`](../.mcp.json) | `type: http` | Claude Code and Grok Build plugins |
| [`cursor.json`](cursor.json) | `url` only | Cursor (`~/.cursor/mcp.json` or `.cursor/mcp.json` in a project) |
| [`vscode.json`](vscode.json) | `servers` with `type: http` | VS Code (`.vscode/mcp.json`) |
| [`gemini-settings.json`](gemini-settings.json) | `httpUrl` | Gemini CLI (`~/.gemini/settings.json`) |

## Command-line setup

Claude Code:

```
claude mcp add --transport http getmydata https://getmydata.io/mcp
```

## Tools

The server exposes these tools. Descriptions come from the live `tools/list` response.

| Tool | Purpose |
| --- | --- |
| `submit_requisition` | Request public web data as rows; starts the free preview |
| `start_email_verification` | Send a new one-time email code |
| `verify_email` | Submit the code the person read from their email |
| `get_request` | Read the request, preview, questions and next action |
| `revise_requisition` | Change an unpaid request; replaces the preview and quote |
| `confirm_scope` | Confirm the preview and request a fixed quote |
| `get_quote` | Read the quote or the estimated waiting time |
| `confirm_quote` | Record confirmation of the final quote |
| `start_order` | Select the final quote and get the person's confirmation page |
| `create_order` | Read or update the order for the final quote |
| `get_payment_status` | Check email verification, order and payment status |
| `get_order` | Read paid order status and get a delivery token |
| `fetch_delivery` | List files or read rows after payment |
| `cancel_request` | Cancel an unpaid request |
| `cancel_collection` | Stop continued collection of a guaranteed order, on the person's request |
| `refresh_session` | Extend the MCP session before it expires |

Only the person confirms and pays, on the GetMyData website. The tools never take payment details.
