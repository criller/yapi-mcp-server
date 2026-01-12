# YAPI MCP Server 实施计划

本计划旨在构建一个基于 YAPI 开放 API 的 MCP (Model Context Protocol) Server，使 AI 助手能够通过 MCP 协议与 YAPI 平台进行交互。

## 项目背景

YAPI 是一个强大的 API 管理平台，提供了丰富的开放 API 接口。根据官方文档，YAPI 提供以下开放API：

![YAPI 开放API列表](/Users/cc/.gemini/antigravity/brain/495d6652-8cc6-462a-96f5-5fc98a3c4952/uploaded_image_1768222983520.png)

本项目将把所有这些API封装为MCP工具，共计 **11个工具**：

| 类别 | MCP 工具名称 | YAPI API 路径 | 功能描述 |
|------|-------------|---------------|----------|
| 项目管理 | `yapi_get_project` | `/api/project/get` | 获取项目基本信息 |
| 分类管理 | `yapi_add_category` | `/api/interface/add_cat` | 新增接口分类 |
| 分类管理 | `yapi_get_category_menu` | `/api/interface/getCatMenu` | 获取菜单列表 |
| 接口管理 | `yapi_get_interface` | `/api/interface/get` | 获取接口数据（详细定义） |
| 接口管理 | `yapi_list_interfaces_by_cat` | `/api/interface/list` | 获取某个分类下接口列表 |
| 接口管理 | `yapi_add_interface` | `/api/interface/save` | 新增接口 |
| 接口管理 | `yapi_update_interface` | `/api/interface/up` | 新增或更新接口 |
| 接口管理 | `yapi_get_interface_list` | `/api/interface/list_menu` | 获取接口列表数据 |
| 接口管理 | `yapi_update_interface_basic` | `/api/interface/update` | 更新接口基本信息 |
| 接口管理 | `yapi_get_interface_cat_list` | `/api/interface/list_cat` | 获取接口菜单列表 |
| 数据导入 | `yapi_import_data` | `/api/open/import_data` | 服务端数据导入 |

MCP 是 Anthropic 于 2024 年 11 月推出的开源协议，允许 AI 应用与外部数据源和工具进行标准化集成。

## 用户审查要求

> [!IMPORTANT]
> 本项目将创建一个 Node.js + TypeScript 项目，使用 `npx` 方式运行。这与用户全局规则中默认的 Python 后端不同，但符合 MCP 生态的最佳实践。

## 建议的更改

### 核心架构

#### [NEW] [package.json](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/package.json)

项目配置文件，包含：
- 项目元数据和依赖项
- NPM scripts 配置
- bin 字段配置，支持 npx 直接运行

**依赖项**：
- `@modelcontextprotocol/sdk`: MCP 官方 TypeScript SDK
- `zod`: 数据校验库（SDK 的 peer dependency）
- `axios`: HTTP 客户端，用于调用 YAPI API
- `dotenv`: 环境变量管理

**开发依赖**：
- `typescript`, `@types/node`
- `tsx`: TypeScript 执行器

---

### MCP Server 核心模块

#### [NEW] [src/index.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/index.ts)

MCP Server 主入口文件，负责：
- 初始化 MCP Server
- 配置 stdio transport（标准输入输出传输）
- 注册所有工具（tools）
- 处理错误和日志

#### [NEW] [src/config.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/config.ts)

配置管理模块：
- 从环境变量读取 YAPI 服务器地址
- 读取 YAPI Token（用于认证）
- 提供配置验证功能

---

### YAPI API 客户端

#### [NEW] [src/yapi-client.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/yapi-client.ts)

YAPI API 封装客户端：
- 封装所有 YAPI 开放 API 调用
- 处理认证和错误
- 提供类型安全的接口

**实现的 API 方法**（完整覆盖YAPI所有开放API）：

```typescript
// 1. 项目管理
getProject(id: number): Promise<ProjectInfo>
// 获取项目基本信息

// 2. 接口分类管理
addCategory(data: AddCategoryParams): Promise<Category>
// 新增接口分类

getCategoryMenu(project_id: number): Promise<Category[]>
// 获取菜单列表

// 3. 接口管理
getInterface(id: number): Promise<InterfaceDetail>
// 获取接口数据（有详细接口数据定义文档）

listInterfacesByCat(catid: number, page?: number, limit?: number): Promise<InterfaceListResponse>
// 获取某个分类下接口列表

addInterface(data: AddInterfaceParams): Promise<InterfaceInfo>
// 新增接口

updateInterface(id: number, data: UpdateInterfaceParams): Promise<void>
// 新增或者更新接口

getInterfaceList(params: GetInterfaceListParams): Promise<InterfaceInfo[]>
// 获取接口列表数据

updateInterfaceBasic(id: number, data: UpdateInterfaceBasicParams): Promise<void>
// 更新接口

getInterfaceCatList(project_id: number): Promise<CategoryInterface[]>
// 获取接口菜单列表

// 4. 数据导入
importData(data: ImportDataParams): Promise<ImportResult>
// 服务端数据导入（支持Swagger等格式）
```

---

### MCP 工具定义

#### [NEW] [src/tools/index.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/tools/index.ts)

工具注册中心，导出所有 MCP 工具定义。

#### [NEW] [src/tools/project-tools.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/tools/project-tools.ts)

**项目管理工具**：
- `yapi_get_project`: 获取项目基本信息
  - 参数：`project_id` (number)
  - 返回：项目名称、描述、成员、创建时间等信息

#### [NEW] [src/tools/category-tools.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/tools/category-tools.ts)

**接口分类管理工具**：
- `yapi_add_category`: 新增接口分类
  - 参数：`name` (string), `project_id` (number), `desc` (string, optional)
  - 返回：新创建的分类信息
  
- `yapi_get_category_menu`: 获取菜单列表
  - 参数：`project_id` (number)
  - 返回：项目下所有分类的树形结构

#### [NEW] [src/tools/interface-tools.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/tools/interface-tools.ts)

**接口管理工具**：
- `yapi_get_interface`: 获取接口详细数据
  - 参数：`interface_id` (number)
  - 返回：接口的完整定义，包括请求/响应参数、header、path等
  
- `yapi_list_interfaces_by_cat`: 获取某个分类下的接口列表
  - 参数：`catid` (number), `page` (number, optional), `limit` (number, optional)
  - 返回：分页的接口列表
  
- `yapi_add_interface`: 新增接口
  - 参数：包含接口定义的完整数据（标题、路径、方法、分类等）
  - 返回：新创建的接口信息
  
- `yapi_update_interface`: 新增或更新接口（智能判断）
  - 参数：接口ID和完整接口定义
  - 返回：更新确认
  
- `yapi_get_interface_list`: 获取接口列表数据
  - 参数：根据不同条件查询（项目ID、分类ID等）
  - 返回：符合条件的接口列表
  
- `yapi_update_interface_basic`: 更新接口基本信息
  - 参数：`interface_id` (number) 和需要更新的字段
  - 返回：更新确认
  
- `yapi_get_interface_cat_list`: 获取接口菜单列表
  - 参数：`project_id` (number)
  - 返回：包含接口的完整菜单树

#### [NEW] [src/tools/import-tools.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/tools/import-tools.ts)

**数据导入工具**：
- `yapi_import_data`: 服务端数据导入
  - 参数：
    - `type`: 导入类型（swagger, har, postman等）
    - `json`: 导入的数据内容（JSON字符串）
    - `project_id`: 目标项目ID
    - `merge`: 数据同步模式（normal普通/good智能/merge合并）
  - 返回：导入结果统计

---

### 类型定义

#### [NEW] [src/types.ts](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/types.ts)

TypeScript 类型定义文件：
- YAPI API 请求/响应类型
- 项目、接口、分类等数据模型

---

### 配置与文档

#### [NEW] [tsconfig.json](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/tsconfig.json)

TypeScript 编译配置。

#### [NEW] [.env.example](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/.env.example)

环境变量示例文件：
```
YAPI_BASE_URL=http://your-yapi-server.com
YAPI_TOKEN=your-yapi-token
```

#### [NEW] [README.md](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/README.md)

项目文档，包含：
- 项目介绍
- 安装和配置说明
- 使用示例
- 可用工具列表
- 开发指南

#### [NEW] [README_CN.md](file:///Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/README_CN.md)

中文版项目文档（符合用户规则要求）。

## 验证计划

### 自动化测试

由于这是一个全新的项目，验证将通过以下方式进行：

1. **编译检查**
   ```bash
   cd /Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server
   npm install
   npx tsc --noEmit
   ```
   验证 TypeScript 代码无编译错误。

2. **NPX 运行测试**
   ```bash
   # 本地测试
   npx tsx src/index.ts
   ```
   验证服务器能正常启动并监听 stdio。

3. **MCP Inspector 测试**
   ```bash
   # 使用 MCP Inspector 工具测试
   npx @modelcontextprotocol/inspector npx tsx src/index.ts
   ```
   通过官方 MCP Inspector 工具验证：
   - 服务器能正确响应 MCP 协议
   - 所有工具能正确列出
   - 工具的 schema 定义正确

### 手动验证

1. **配置 Claude Desktop 集成**
   
   将以下配置添加到 Claude Desktop 的 MCP 配置文件中：
   ```json
   {
     "mcpServers": {
       "yapi": {
         "command": "npx",
         "args": ["-y", "tsx", "/Users/cc/Desktop/work/aishu/operator-hub/yapi-mcp-server/src/index.ts"],
         "env": {
           "YAPI_BASE_URL": "http://your-yapi-server.com",
           "YAPI_TOKEN": "your-token"
         }
       }
     }
   }
   ```

2. **功能验证**
   
   在 Claude Desktop 中测试以下功能：
   - 使用 `yapi_get_project` 工具获取项目信息
   - 使用 `yapi_get_categories` 工具列出分类
   - 使用 `yapi_get_interface` 工具查看接口详情
   
   > [!NOTE]
   > 手动测试需要用户提供真实的 YAPI 服务器地址和 Token。建议用户在测试环境进行验证。
