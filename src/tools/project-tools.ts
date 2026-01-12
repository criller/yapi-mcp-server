import { z } from 'zod';
import type { YapiClient } from '../yapi-client.js';

/**
 * 项目管理工具定义
 */

// 获取项目信息工具的参数 Schema
const GetProjectArgsSchema = z.object({
    project_id: z.number().describe('项目 ID'),
});

/**
 * 创建项目管理工具
 */
export function createProjectTools(yapiClient: YapiClient) {
    return [
        {
            name: 'yapi_get_project',
            description: '获取 YAPI 项目的基本信息，包括项目名称、描述、成员、环境配置等',
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
            handler: async (args: z.infer<typeof GetProjectArgsSchema>) => {
                const validated = GetProjectArgsSchema.parse(args);
                const project = await yapiClient.getProject(validated.project_id);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(project, null, 2),
                        },
                    ],
                };
            },
        },
    ];
}
