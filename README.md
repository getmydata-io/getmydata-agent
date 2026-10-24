# GetMyData Agent

Agent skill and MCP configuration for [GetMyData](https://getmydata.io): get real data from public web sources, with a free preview.

> This repository is an early placeholder. The skill, MCP config, platform guides and example prompts are being added.

## MCP endpoint

```
https://getmydata.io/mcp
```

No credentials or API key are needed to connect.

## How it works

- The plugin is free.
- A free preview returns up to 10 rows.
- Full data is a separate service on getmydata.io. You get a quote first, then you decide whether to buy and pay for it yourself.
- The price is the same on every channel.

## Layout

| Path | Contents |
| --- | --- |
| `skills/getmydata/` | Agent skill (`SKILL.md`) |
| `mcp/` | MCP client configuration |
| `platforms/` | Setup notes for Cursor, Grok, Kiro, Claude and Gemini CLI |
| `examples/` | Example prompts |
| `scripts/` | Pre-publish content check |

## Privacy and support

- Privacy policy: https://getmydata.io/privacy
- Support: support@getmydata.io

## License

Code and documentation in this repository are licensed under the [Apache License 2.0](LICENSE). The GetMyData name and logo are not covered by that license; see [TRADEMARKS.md](TRADEMARKS.md).
