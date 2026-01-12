import type { YapiClient } from '../yapi-client.js';
import { createProjectTools } from './project-tools.js';
import { createCategoryTools } from './category-tools.js';
import { createInterfaceTools } from './interface-tools.js';
import { createImportTools } from './import-tools.js';

/**
 * 工具注册中心
 * 聚合所有 MCP 工具定义
 */
export function getAllTools(yapiClient: YapiClient) {
    return [
        ...createProjectTools(yapiClient),
        ...createCategoryTools(yapiClient),
        ...createInterfaceTools(yapiClient),
        ...createImportTools(yapiClient),
    ];
}
