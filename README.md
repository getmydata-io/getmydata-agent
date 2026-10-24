# GetMyData Agent

Agent skill, MCP configuration and plugin manifests for [GetMyData](https://getmydata.io). GetMyData lets your AI agent collect public web data and hand it back as rows: JSON, CSV or Excel, with a field dictionary.

## What it does

You tell your agent which public websites, which fields and how many rows you need. The agent submits the request to GetMyData, you confirm your email with a one-time code, and you get a free preview so you can check the fields and coverage before deciding anything.

- **Free preview.** Every request starts with a free preview of up to 10 rows. The plugin is free and works on install, with no account, API key or activation step.
- **Full data is a separate service.** If you want the full dataset, GetMyData gives you a fixed quote for your request first. The full dataset is a separate paid service on getmydata.io: you review the quote and pay for it yourself on the GetMyData website. Your agent never pays for you and never sees card details. There is no subscription. The price is the same on every channel.
- **Delivery.** After payment, your agent downloads the files: JSON, CSV, Excel and `fields.json`. Files are kept for 30 days.
- **Refunds.** If an order cannot be delivered as confirmed, the payment is refunded in full to the original payment method. See the [refund policy](https://getmydata.io/refund).

Public data only. GetMyData never asks for your passwords, cookies or logins. You are responsible for using the data lawfully; see the [acceptable use policy](https://getmydata.io/acceptable-use).

## Network endpoint and credentials

| | |
| --- | --- |
| Endpoint | `https://getmydata.io/mcp` (remote MCP, Streamable HTTP) |
| Credentials | None. No API key, token or account is needed to connect. |
| Local code | None. This repository contains only Markdown and JSON configuration; nothing is executed on your machine. |
| Data sent | The request details you agree with your agent (sources, fields, filters, row count, description) and the email address you give for the one-time code and notifications. |

## Install

| Client | How |
| --- | --- |
| Cursor | Install from the Cursor Marketplace once listed, or add the MCP server manually: [platforms/cursor](platforms/cursor/README.md) |
| Claude Code | `/plugin marketplace add getmydata-io/getmydata-agent`, then `/plugin install getmydata@getmydata`: [platforms/claude](platforms/claude/README.md) |
| Grok Build | Install from the Grok Build plugin marketplace once listed: [platforms/grok](platforms/grok/README.md) |
| Kiro | Powers panel → Add Custom Power → Import power from GitHub → this repository URL: [platforms/kiro](platforms/kiro/README.md) |
| Gemini CLI | `gemini extensions install https://github.com/getmydata-io/getmydata-agent`: [platforms/gemini-cli](platforms/gemini-cli/README.md) |
| Skills CLI | `npx skills add getmydata-io/getmydata-agent` |
| Any MCP client | Add the remote server `https://getmydata.io/mcp`: [mcp](mcp/README.md) |

No install at all: paste this into your agent:

```
Read https://getmydata.io/skills/getmydata/SKILL.md and follow it to get me public web data.
```

## Try it

```
Get me 200 cafés in Lisbon from a public directory with name, website and neighbourhood, as a spreadsheet. Show me the free preview first.
```

More in [examples/prompts.md](examples/prompts.md).

## How a request works

1. Your agent collects the full request from you and submits it.
2. You paste the one-time code from your email into the chat.
3. The free preview (up to 10 rows) is prepared in the background; you are emailed when it is ready.
4. If it looks right, your agent asks for a fixed quote, which is also emailed to you.
5. If you decide to buy, your agent gives you a private confirmation page on getmydata.io. You review and pay there yourself.
6. Your agent downloads the files once the order is delivered.

## Repository layout

| Path | Contents |
| --- | --- |
| `skills/getmydata/SKILL.md` | Agent skill |
| `mcp.json` | MCP config in the Agent Plugins format (Kiro, Cursor) |
| `.mcp.json` | MCP config for Claude Code and Grok Build |
| `plugin.json` | Agent Plugins manifest (Kiro Powers) |
| `.cursor-plugin/plugin.json` | Cursor plugin manifest |
| `.claude-plugin/` | Claude Code plugin manifest and marketplace file |
| `.grok-plugin/plugin.json` | Grok Build plugin manifest |
| `gemini-extension.json` | Gemini CLI extension manifest |
| `llms-install.md` | Setup notes for agents that install MCP servers from a README |
| `mcp/` | MCP client configuration examples |
| `platforms/` | Notes for Cursor, Claude, Grok, Kiro and Gemini CLI |
| `examples/` | Example prompts |
| `assets/` | Logo files (not covered by the license; see below) |
| `scripts/` | Pre-publish content check |

The canonical skill is also hosted at https://getmydata.io/skills/getmydata/SKILL.md, and the API contract at https://getmydata.io/api/v1/openapi.json.

## Privacy and support

- Privacy policy: https://getmydata.io/privacy
- Terms: https://getmydata.io/terms
- Refund policy: https://getmydata.io/refund
- Support: support@getmydata.io (https://getmydata.io/support)

To report a security issue, see [SECURITY.md](SECURITY.md).

## License

Code and documentation in this repository are licensed under the [Apache License 2.0](LICENSE). The GetMyData name and logo are not covered by that license; see [TRADEMARKS.md](TRADEMARKS.md).
