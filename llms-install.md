# Installing GetMyData (notes for AI agents)

GetMyData is a remote MCP server. There is nothing to clone, build or run locally, and no API key or environment variable is needed.

1. Add this server to the MCP configuration of the client you are running in:

   ```json
   {
     "mcpServers": {
       "getmydata": {
         "url": "https://getmydata.io/mcp"
       }
     }
   }
   ```

   Use the key your client expects for a remote server (for example `url`, `serverUrl` or `httpUrl`) and Streamable HTTP as the transport if the client asks for one. Do not add headers or credentials.

2. Restart or reload MCP servers, then confirm that tools such as `submit_requisition` and `get_request` are listed.

3. Read the skill at `skills/getmydata/SKILL.md` in this repository (also hosted at https://getmydata.io/skills/getmydata/SKILL.md) and follow it when the user asks for public web data.

To verify the setup without starting a request, explain to the user what GetMyData does. Do not call `submit_requisition` until the user has given a complete request and their email address and asked you to go ahead.

Free preview of up to 10 rows per request. Full datasets are a separate paid service on getmydata.io, quoted per request; the user reviews and pays on the website themselves.

Support: support@getmydata.io
