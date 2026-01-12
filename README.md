# YAPI MCP Server

A Model Context Protocol (MCP) server for YAPI API Platform integration. This server allows AI assistants to interact with YAPI through the MCP protocol.

[中文文档](README_CN.md)

## Features

This MCP server provides **11 tools** covering all YAPI Open APIs:

### Project Management (1 tool)
- `yapi_get_project` - Get project basic information

### Category Management (2 tools)
- `yapi_add_category` - Add interface category
- `yapi_get_category_menu` - Get category menu list

### Interface Management (7 tools)
- `yapi_get_interface` - Get interface detailed data
- `yapi_list_interfaces_by_cat` - List interfaces by category
- `yapi_add_interface` - Add new interface
- `yapi_update_interface` - Update interface (smart add/update)
- `yapi_get_interface_list` - Get interface list with filters
- `yapi_update_interface_basic` - Update interface basic info
- `yapi_get_interface_cat_list` - Get complete interface menu tree

### Data Import (1 tool)
- `yapi_import_data` - Import data (Swagger, HAR, Postman, etc.)

## Installation

```bash
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and set your YAPI server URL and token:
```
YAPI_BASE_URL=http://your-yapi-server.com
YAPI_TOKEN=your-yapi-token
```

You can get your YAPI token from your YAPI account settings.

## Usage

### With Claude Desktop

Add this configuration to your Claude Desktop MCP settings file:

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "yapi": {
      "command": "npx",
      "args": ["-y", "tsx", "/absolute/path/to/yapi-mcp/src/index.ts"],
      "env": {
        "YAPI_BASE_URL": "http://your-yapi-server.com",
        "YAPI_TOKEN": "your-token"
      }
    }
  }
}
```

### With Other MCP Clients

Run the server using npx:

```bash
npx tsx src/index.ts
```

Or use the MCP Inspector for testing:

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

## Development

### Type Check

```bash
npm run typecheck
```

### Build

```bash
npm run build
```

### Run Development Server

```bash
npm run dev
```

## Example Usage

Once configured with Claude Desktop, you can interact with YAPI using natural language:

- "Show me the details of project 123"
- "List all categories in project 456"
- "Get the interface with ID 789"
- "Add a new category called 'User Management' to project 123"

## Project Structure

```
yapi-mcp/
├── src/
│   ├── index.ts              # MCP Server entry point
│   ├── config.ts             # Configuration management
│   ├── types.ts              # TypeScript type definitions
│   ├── yapi-client.ts        # YAPI API client
│   └── tools/                # MCP tools
│       ├── index.ts          # Tool registry
│       ├── project-tools.ts  # Project management tools
│       ├── category-tools.ts # Category management tools
│       ├── interface-tools.ts# Interface management tools
│       └── import-tools.ts   # Data import tools
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## License

MIT
