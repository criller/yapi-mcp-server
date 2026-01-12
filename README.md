# YAPI MCP Server

A Model Context Protocol (MCP) server for YAPI API Platform integration. Enable AI assistants to interact with YAPI seamlessly.

[中文文档](README_CN.md)

## 🚀 Quick Start

### Recommended: Use with npx (No installation required)

1. **Get your YAPI Token**: Login to your YAPI platform and get the token from project settings

2. **Configure Claude Desktop**: Add the following to your MCP settings file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "yapi": {
      "command": "npx",
      "args": [
        "-y",
        "yapi-mcp-server",
        "--yapi-base-url",
        "http://your-yapi-server.com",
        "--yapi-token",
        "your-token-here"
      ]
    }
  }
}
```

3. **Start using**: Restart Claude Desktop and you're ready to go!

## ✨ Features

This MCP server provides **11 tools** covering all YAPI Open APIs:

### Project Management (1 tool)
- `yapi_get_project` - Get project information

### Category Management (2 tools)
- `yapi_add_category` - Add interface category
- `yapi_get_category_menu` - Get category menu list

### Interface Management (7 tools)
- `yapi_get_interface` - Get interface details
- `yapi_list_interfaces_by_cat` - List interfaces by category
- `yapi_add_interface` - Add new interface
- `yapi_update_interface` - Update interface
- `yapi_get_interface_list` - Get interface list
- `yapi_update_interface_basic` - Update interface basic info
- `yapi_get_interface_cat_list` - Get interface menu tree

### Data Import (1 tool)
- `yapi_import_data` - Import data (Swagger, HAR, Postman, etc.)

## 📖 Usage Examples

Once configured, you can interact with YAPI using natural language:

- "Show me the details of project 123"
- "List all categories in project 456"
- "Get the interface with ID 789"
- "Add a new category called 'User Management' to project 123"
- "Import this Swagger file to project 456"

## 🔧 Alternative Configuration Methods

### Method 1: Using Environment Variables

```json
{
  "mcpServers": {
    "yapi": {
      "command": "npx",
      "args": ["-y", "yapi-mcp-server"],
      "env": {
        "YAPI_BASE_URL": "http://your-yapi-server.com",
        "YAPI_TOKEN": "your-token-here"
      }
    }
  }
}
```

### Method 2: Local Development

For development or debugging:

```bash
git clone https://github.com/criller/yapi-mcp-server.git
cd yapi-mcp-server
npm install
cp .env.example .env
# Edit .env and set your YAPI_BASE_URL and YAPI_TOKEN
npm run dev
```

Then configure Claude Desktop:

```json
{
  "mcpServers": {
    "yapi": {
      "command": "node",
      "args": ["/absolute/path/to/yapi-mcp-server/dist/index.js"],
      "env": {
        "YAPI_BASE_URL": "http://your-yapi-server.com",
        "YAPI_TOKEN": "your-token"
      }
    }
  }
}
```

## 🛠️ Development

### Type Check
```bash
npm run typecheck
```

### Build
```bash
npm run build
```

### Testing with MCP Inspector
```bash
npx @modelcontextprotocol/inspector npx -y yapi-mcp-server
```

## 📁 Project Structure

```
yapi-mcp-server/
├── src/
│   ├── index.ts              # MCP Server entry point
│   ├── config.ts             # Configuration management
│   ├── types.ts              # TypeScript types
│   ├── yapi-client.ts        # YAPI API client
│   └── tools/                # MCP tools
│       ├── project-tools.ts  # Project management
│       ├── category-tools.ts # Category management
│       ├── interface-tools.ts# Interface management
│       └── import-tools.ts   # Data import
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please check [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT
