#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { getConfig, validateConfig } from './config.js';
import { YapiClient } from './yapi-client.js';
import { getAllTools } from './tools/index.js';

/**
 * YAPI MCP Server 主入口
 */

// 创建 MCP Server 实例
const server = new Server(
    {
        name: 'yapi-mcp-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// 初始化 YAPI 客户端
let yapiClient: YapiClient;
let tools: any[];

try {
    // 获取并验证配置
    const config = getConfig();
    validateConfig(config);

    // 创建 YAPI 客户端
    yapiClient = new YapiClient(config);

    // 获取所有工具
    tools = getAllTools(yapiClient);

    console.error('YAPI MCP Server 初始化成功');
    console.error(`已加载 ${tools.length} 个工具`);
} catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
}

// 注册工具列表处理器
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: tools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
        })),
    };
});

// 注册工具调用处理器
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const tool = tools.find((t) => t.name === toolName);

    if (!tool) {
        throw new Error(`未知工具: ${toolName}`);
    }

    try {
        const result = await tool.handler(request.params.arguments);
        return result;
    } catch (error) {
        // 错误处理
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            content: [
                {
                    type: 'text',
                    text: `错误: ${errorMessage}`,
                },
            ],
            isError: true,
        };
    }
});

// 启动服务器
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('YAPI MCP Server 正在运行...');
}

main().catch((error) => {
    console.error('服务器错误:', error);
    process.exit(1);
});
