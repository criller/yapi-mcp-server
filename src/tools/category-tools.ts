import { z } from 'zod';
import type { YapiClient } from '../yapi-client.js';

/**
 * 分类管理工具定义
 */

// 新增分类参数 Schema
const AddCategoryArgsSchema = z.object({
    name: z.string().describe('分类名称'),
    project_id: z.number().describe('项目 ID'),
    desc: z.string().optional().describe('分类描述'),
});

// 获取菜单列表参数 Schema
const GetCategoryMenuArgsSchema = z.object({
    project_id: z.number().describe('项目 ID'),
});

/**
 * 创建分类管理工具
 */
export function createCategoryTools(yapiClient: YapiClient) {
    return [
        {
            name: 'yapi_add_category',
            description: '在 YAPI 项目中新增接口分类',
            inputSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: '分类名称',
                    },
                    project_id: {
                        type: 'number',
                        description: '项目 ID',
                    },
                    desc: {
                        type: 'string',
                        description: '分类描述（可选）',
                    },
                },
                required: ['name', 'project_id'],
            },
            handler: async (args: z.infer<typeof AddCategoryArgsSchema>) => {
                const validated = AddCategoryArgsSchema.parse(args);
                const category = await yapiClient.addCategory(validated);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(category, null, 2),
                        },
                    ],
                };
            },
        },
        {
            name: 'yapi_get_category_menu',
            description: '获取 YAPI 项目的所有接口分类列表',
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
            handler: async (args: z.infer<typeof GetCategoryMenuArgsSchema>) => {
                const validated = GetCategoryMenuArgsSchema.parse(args);
                const categories = await yapiClient.getCategoryMenu(validated.project_id);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(categories, null, 2),
                        },
                    ],
                };
            },
        },
    ];
}
