import { z } from 'zod';
import type { YapiClient } from '../yapi-client.js';

/**
 * 数据导入工具定义
 */

// 导入数据参数 Schema
const ImportDataArgsSchema = z.object({
    type: z
        .enum(['swagger', 'har', 'postman', 'json'])
        .describe('导入数据类型：swagger, har, postman, json'),
    json: z.string().describe('导入的数据内容（JSON 字符串）'),
    project_id: z.number().describe('目标项目 ID'),
    merge: z
        .enum(['normal', 'good', 'merge'])
        .optional()
        .describe('数据同步模式：normal(普通), good(智能), merge(合并)'),
});

/**
 * 创建数据导入工具
 */
export function createImportTools(yapiClient: YapiClient) {
    return [
        {
            name: 'yapi_import_data',
            description:
                '服务端数据导入，支持导入 Swagger、HAR、Postman 等格式的接口数据到 YAPI 项目',
            inputSchema: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['swagger', 'har', 'postman', 'json'],
                        description: '导入数据类型',
                    },
                    json: {
                        type: 'string',
                        description: '导入的数据内容（JSON 字符串）',
                    },
                    project_id: {
                        type: 'number',
                        description: '目标项目 ID',
                    },
                    merge: {
                        type: 'string',
                        enum: ['normal', 'good', 'merge'],
                        description: '数据同步模式：normal(普通), good(智能), merge(合并)。默认为 normal',
                    },
                },
                required: ['type', 'json', 'project_id'],
            },
            handler: async (args: z.infer<typeof ImportDataArgsSchema>) => {
                const validated = ImportDataArgsSchema.parse(args);
                const result = await yapiClient.importData(validated);
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
