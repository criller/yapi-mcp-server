# YAPI MCP Server

基于 YAPI 开放 API 的 MCP (Model Context Protocol) 服务器。让 AI 助手能够无缝对接 YAPI 平台。

[English Documentation](README.md)

## 🚀 快速开始

### 推荐方式：使用 npx（无需安装）

1. **获取 YAPI Token**：登录您的 YAPI 平台，在项目设置中获取 Token

2. **配置 Claude Desktop**：在 MCP 配置文件中添加以下内容：

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

3. **开始使用**：重启 Claude Desktop，即可开始使用！

## ✨ 功能特性

本 MCP 服务器提供 **11 个工具**，完整覆盖 YAPI 所有开放 API：

### 项目管理（1 个工具）
- `yapi_get_project` - 获取项目信息

### 分类管理（2 个工具）
- `yapi_add_category` - 新增接口分类
- `yapi_get_category_menu` - 获取分类菜单列表

### 接口管理（7 个工具）
- `yapi_get_interface` - 获取接口详细信息
- `yapi_list_interfaces_by_cat` - 按分类获取接口列表
- `yapi_add_interface` - 新增接口
- `yapi_update_interface` - 更新接口
- `yapi_get_interface_list` - 获取接口列表
- `yapi_update_interface_basic` - 更新接口基本信息
- `yapi_get_interface_cat_list` - 获取接口菜单树

### 数据导入（1 个工具）
- `yapi_import_data` - 导入数据（支持 Swagger、HAR、Postman 等格式）

## 📖 使用示例

配置完成后，您可以使用自然语言与 YAPI 交互：

- "显示项目 123 的详细信息"
- "列出项目 456 中的所有分类"
- "获取 ID 为 789 的接口"
- "在项目 123 中添加一个名为'用户管理'的分类"
- "将这个 Swagger 文件导入到项目 456"

## 🔧 其他配置方式

### 方式一：使用环境变量

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

### 方式二：本地开发模式

适合需要修改代码或调试的场景：

```bash
git clone https://github.com/criller/yapi-mcp-server.git
cd yapi-mcp-server
npm install
cp .env.example .env
# 编辑 .env 文件，设置 YAPI_BASE_URL 和 YAPI_TOKEN
npm run dev
```

然后配置 Claude Desktop：

```json
{
  "mcpServers": {
    "yapi": {
      "command": "node",
      "args": ["/绝对路径/yapi-mcp-server/dist/index.js"],
      "env": {
        "YAPI_BASE_URL": "http://your-yapi-server.com",
        "YAPI_TOKEN": "your-token"
      }
    }
  }
}
```

## 🛠️ 开发

### 类型检查
```bash
npm run typecheck
```

### 构建
```bash
npm run build
```

### 使用 MCP Inspector 测试
```bash
npx @modelcontextprotocol/inspector npx -y yapi-mcp-server
```

## 📁 项目结构

```
yapi-mcp-server/
├── src/
│   ├── index.ts              # MCP Server 主入口
│   ├── config.ts             # 配置管理
│   ├── types.ts              # TypeScript 类型定义
│   ├── yapi-client.ts        # YAPI API 客户端
│   └── tools/                # MCP 工具
│       ├── project-tools.ts  # 项目管理工具
│       ├── category-tools.ts # 分类管理工具
│       ├── interface-tools.ts# 接口管理工具
│       └── import-tools.ts   # 数据导入工具
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

## 📄 许可证

MIT
