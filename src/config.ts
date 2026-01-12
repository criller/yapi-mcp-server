import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

/**
 * YAPI 配置接口
 */
export interface YapiConfig {
    baseUrl: string;
    token: string;
}

/**
 * 获取 YAPI 配置
 * @returns YAPI 配置对象
 * @throws 如果必需的环境变量未设置则抛出错误
 */
export function getConfig(): YapiConfig {
    const baseUrl = process.env.YAPI_BASE_URL;
    const token = process.env.YAPI_TOKEN;

    if (!baseUrl) {
        throw new Error('YAPI_BASE_URL 环境变量未设置');
    }

    if (!token) {
        throw new Error('YAPI_TOKEN 环境变量未设置');
    }

    return {
        baseUrl: baseUrl.replace(/\/$/, ''), // 移除尾部斜杠
        token,
    };
}

/**
 * 验证配置是否有效
 */
export function validateConfig(config: YapiConfig): void {
    if (!config.baseUrl) {
        throw new Error('YAPI 基础 URL 不能为空');
    }

    if (!config.token) {
        throw new Error('YAPI Token 不能为空');
    }

    // 验证 URL 格式
    try {
        new URL(config.baseUrl);
    } catch (error) {
        throw new Error(`无效的 YAPI URL: ${config.baseUrl}`);
    }
}
