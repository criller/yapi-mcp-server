import { z } from 'zod';
import type { YapiClient } from '../yapi-client.js';

/**
 * 接口管理工具定义
 */

// 获取接口详情参数 Schema
const GetInterfaceArgsSchema = z.object({
    interface_id: z.number().describe('接口 ID'),
});

// 按分类获取接口列表参数 Schema
const ListInterfacesByCatArgsSchema = z.object({
    catid: z.number().describe('分类 ID'),
    page: z.number().optional().describe('页码，默认为 1'),
    limit: z.number().optional().describe('每页数量，默认为 10'),
});

// 新增接口参数 Schema
const AddInterfaceArgsSchema = z.object({
    title: z.string().describe('接口标题'),
    catid: z.number().describe('接口分类 ID'),
    path: z.string().describe('接口路径'),
    method: z.string().describe('请求方法，如 GET、POST 等'),
    project_id: z.number().describe('项目 ID'),
    desc: z.string().optional().describe('接口描述'),
    status: z.string().optional().describe('接口状态'),
    req_query: z
        .array(
            z.object({
                name: z.string(),
                desc: z.string().optional(),
                required: z.string().optional(),
                example: z.string().optional(),
            })
        )
        .optional()
        .describe('Query 参数'),
    req_headers: z
        .array(
            z.object({
                name: z.string(),
                value: z.string(),
                desc: z.string().optional(),
                required: z.string().optional(),
            })
        )
        .optional()
        .describe('请求 Header'),
    req_body_type: z.string().optional().describe('请求体类型'),
    req_body_other: z.string().optional().describe('其他请求体内容'),
    res_body_type: z.string().optional().describe('响应体类型'),
    res_body: z.string().optional().describe('响应体内容'),
});

// 更新接口参数 Schema
const UpdateInterfaceArgsSchema = z.object({
    id: z.number().describe('接口 ID'),
    title: z.string().describe('接口标题'),
    catid: z.number().describe('接口分类 ID'),
    path: z.string().describe('接口路径'),
    method: z.string().describe('请求方法'),
    desc: z.string().optional().describe('接口描述'),
    status: z.string().optional().describe('接口状态'),
});

// 获取接口列表参数 Schema
const GetInterfaceListArgsSchema = z.object({
    project_id: z.number().optional().describe('项目 ID'),
    catid: z.number().optional().describe('分类 ID'),
    page: z.number().optional().describe('页码'),
    limit: z.number().optional().describe('每页数量'),
});

// 更新接口基本信息参数 Schema
const UpdateInterfaceBasicArgsSchema = z.object({
    id: z.number().describe('接口 ID'),
    title: z.string().optional().describe('接口标题'),
    catid: z.number().optional().describe('接口分类 ID'),
    path: z.string().optional().describe('接口路径'),
    method: z.string().optional().describe('请求方法'),
    status: z.string().optional().describe('接口状态'),
    desc: z.string().optional().describe('接口描述'),
});

// 获取接口菜单列表参数 Schema
const GetInterfaceCatListArgsSchema = z.object({
    project_id: z.number().describe('项目 ID'),
});

/**
 * 创建接口管理工具
 */
export function createInterfaceTools(yapiClient: YapiClient) {
    return [
        {
            name: 'yapi_get_interface',
            description: '获取 YAPI 接口的详细信息，包括请求参数、响应数据等完整定义',
            inputSchema: {
                type: 'object',
                properties: {
                    interface_id: {
                        type: 'number',
                        description: '接口 ID',
                    },
                },
                required: ['interface_id'],
            },
            handler: async (args: z.infer<typeof GetInterfaceArgsSchema>) => {
                const validated = GetInterfaceArgsSchema.parse(args);
                const interfaceDetail = await yapiClient.getInterface(validated.interface_id);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(interfaceDetail, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'yapi_list_interfaces_by_cat',
            description: '获取某个分类下的所有接口列表，支持分页',
            inputSchema: {
                type: 'object',
                properties: {
                    catid: {
                        type: 'number',
                        description: '分类 ID',
                    },
                    page: {
                        type: 'number',
                        description: '页码，默认为 1',
                    },
                    limit: {
                        type: 'number',
                        description: '每页数量，默认为 10',
                    },
                },
                required: ['catid'],
            },
            handler: async (args: z.infer<typeof ListInterfacesByCatArgsSchema>) => {
                const validated = ListInterfacesByCatArgsSchema.parse(args);
                const result = await yapiClient.listInterfacesByCat(
                    validated.catid,
                    validated.page,
                    validated.limit
                );
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'yapi_add_interface',
            description: '在 YAPI 中新增一个接口定义',
            inputSchema: {
                type: 'object',
                properties: {
                    title: { type: 'string', description: '接口标题' },
                    catid: { type: 'number', description: '接口分类 ID' },
                    path: { type: 'string', description: '接口路径' },
                    method: { type: 'string', description: '请求方法（GET, POST, PUT, DELETE 等）' },
                    project_id: { type: 'number', description: '项目 ID' },
                    desc: { type: 'string', description: '接口描述' },
                    status: { type: 'string', description: '接口状态' },
                    req_query: {
                        type: 'array',
                        description: 'Query 参数列表',
                        items: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                desc: { type: 'string' },
                                required: { type: 'string' },
                                example: { type: 'string' },
                            },
                        },
                    },
                    req_headers: {
                        type: 'array',
                        description: '请求 Header 列表',
                        items: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                value: { type: 'string' },
                                desc: { type: 'string' },
                                required: { type: 'string' },
                            },
                        },
                    },
                    req_body_type: { type: 'string', description: '请求体类型' },
                    req_body_other: { type: 'string', description: '其他请求体内容' },
                    res_body_type: { type: 'string', description: '响应体类型' },
                    res_body: { type: 'string', description: '响应体内容' },
                },
                required: ['title', 'catid', 'path', 'method', 'project_id'],
            },
            handler: async (args: z.infer<typeof AddInterfaceArgsSchema>) => {
                const validated = AddInterfaceArgsSchema.parse(args);
                const result = await yapiClient.addInterface(validated);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'yapi_update_interface',
            description: '更新 YAPI 接口的完整定义（智能判断新增或更新）',
            inputSchema: {
                type: 'object',
                properties: {
                    id: { type: 'number', description: '接口 ID' },
                    title: { type: 'string', description: '接口标题' },
                    catid: { type: 'number', description: '接口分类 ID' },
                    path: { type: 'string', description: '接口路径' },
                    method: { type: 'string', description: '请求方法' },
                    desc: { type: 'string', description: '接口描述' },
                    status: { type: 'string', description: '接口状态' },
                },
                required: ['id', 'title', 'catid', 'path', 'method'],
            },
            handler: async (args: z.infer<typeof UpdateInterfaceArgsSchema>) => {
                const validated = UpdateInterfaceArgsSchema.parse(args);
                await yapiClient.updateInterface(validated);
                return {
                    content: [
                        {
                            type: 'text',
                            text: '接口更新成功',
                        },
                    ],
                };
            },
        },
        {
            name: 'yapi_get_interface_list',
            description: '根据条件获取接口列表，可按项目或分类筛选',
            inputSchema: {
                type: 'object',
                properties: {
                    project_id: { type: 'number', description: '项目 ID' },
                    catid: { type: 'number', description: '分类 ID' },
                    page: { type: 'number', description: '页码' },
                    limit: { type: 'number', description: '每页数量' },
                },
                required: [],
            },
            handler: async (args: z.infer<typeof GetInterfaceListArgsSchema>) => {
                const validated = GetInterfaceListArgsSchema.parse(args);
                const result = await yapiClient.getInterfaceList(validated);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'yapi_update_interface_basic',
            description: '更新 YAPI 接口的基本信息（仅更新指定字段）',
            inputSchema: {
                type: 'object',
                properties: {
                    id: { type: 'number', description: '接口 ID' },
                    title: { type: 'string', description: '接口标题' },
                    catid: { type: 'number', description: '接口分类 ID' },
                    path: { type: 'string', description: '接口路径' },
                    method: { type: 'string', description: '请求方法' },
                    status: { type: 'string', description: '接口状态' },
                    desc: { type: 'string', description: '接口描述' },
                },
                required: ['id'],
            },
            handler: async (args: z.infer<typeof UpdateInterfaceBasicArgsSchema>) => {
                const validated = UpdateInterfaceBasicArgsSchema.parse(args);
                await yapiClient.updateInterfaceBasic(validated);
                return {
                    content: [
                        {
                            type: 'text',
                            text: '接口基本信息更新成功',
                        },
                    ],
                };
            },
        },
        {
            name: 'yapi_get_interface_cat_list',
            description: '获取项目的完整接口菜单树（包含所有分类和接口）',
            inputSchema: {
                type: 'object',
                properties: {
                    project_id: {
                        type: 'number',
                        description: '项目 ID',
                    },
                },
                required: ['project_id'],
            },
            handler: async (args: z.infer<typeof GetInterfaceCatListArgsSchema>) => {
                const validated = GetInterfaceCatListArgsSchema.parse(args);
                const result = await yapiClient.getInterfaceCatList(validated.project_id);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            },
        },
    ];
}
