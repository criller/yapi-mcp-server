# YAPI MCP Server

基于 YAPI 开放 API 的 MCP (Model Context Protocol) 服务器。该服务器允许 AI 助手通过 MCP 协议与 YAPI 平台进行交互。

[English Documentation](README.md)

## 功能特性

本 MCP 服务器提供 **11 个工具**，完整覆盖 YAPI 所有开放 API：

### 项目管理（1 个工具）
- `yapi_get_project` - 获取项目基本信息

### 分类管理（2 个工具）
- `yapi_add_category` - 新增接口分类
- `yapi_get_category_menu` - 获取分类菜单列表

### 接口管理（7 个工具）
- `yapi_get_interface` - 获取接口详细数据
- `yapi_list_interfaces_by_cat` - 按分类获取接口列表
- `yapi_add_interface` - 新增接口
- `yapi_update_interface` - 更新接口（智能新增/更新）
- `yapi_get_interface_list` - 获取接口列表（支持筛选）
- `yapi_update_interface_basic` - 更新接口基本信息
- `yapi_get_interface_cat_list` - 获取完整接口菜单树

### 数据导入（1 个工具）
- `yapi_import_data` - 导入数据（支持 Swagger、HAR、Postman 等格式）

## 安装

```bash
npm install
```

## 配置

1. 复制环境变量示例文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，设置您的 YAPI 服务器地址和 Token：
```
YAPI_BASE_URL=http://your-yapi-server.com
YAPI_TOKEN=your-yapi-token
```

您可以在 YAPI 账户设置中获取您的 Token。

## 使用方法

### 与 Claude Desktop 集成

在 Claude Desktop 的 MCP 配置文件中添加以下配置：

**配置文件位置：**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**配置内容：**
```json
{
  "mcpServers": {
    "yapi": {
      "command": "npx",
      "args": ["-y", "tsx", "/绝对路径/yapi-mcp/src/index.ts"],
      "env": {
        "YAPI_BASE_URL": "http://your-yapi-server.com",
        "YAPI_TOKEN": "your-token"
      }
    }
  }
}
```

### 与其他 MCP 客户端集成

使用 npx 运行服务器：

```bash
npx tsx src/index.ts
```

或使用 MCP Inspector 进行测试：

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

## 开发

### 类型检查

```bash
npm run typecheck
```

### 构建

```bash
npm run build
```

### 运行开发服务器

```bash
npm run dev
```

## 使用示例

配置好 Claude Desktop 后，您可以使用自然语言与 YAPI 交互：

- "显示项目 123 的详细信息"
- "列出项目 456 中的所有分类"
- "获取 ID 为 789 的接口"
- "在项目 123 中添加一个名为'用户管理'的分类"

## 项目结构

```
yapi-mcp/
├── src/
│   ├── index.ts              # MCP Server 主入口
│   ├── config.ts             # 配置管理
│   ├── types.ts              # TypeScript 类型定义
│   ├── yapi-client.ts        # YAPI API 客户端
│   └── tools/                # MCP 工具
│       ├── index.ts          # 工具注册中心
│       ├── project-tools.ts  # 项目管理工具
│       ├── category-tools.ts # 分类管理工具
│       ├── interface-tools.ts# 接口管理工具
│       └── import-tools.ts   # 数据导入工具
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 许可证

MIT
