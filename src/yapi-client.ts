import axios, { AxiosInstance } from 'axios';
import type { YapiConfig } from './config.js';
import type {
    YapiResponse,
    ProjectInfo,
    Category,
    AddCategoryParams,
    InterfaceDetail,
    InterfaceInfo,
    AddInterfaceParams,
    UpdateInterfaceParams,
    UpdateInterfaceBasicParams,
    GetInterfaceListParams,
    InterfaceListResponse,
    CategoryInterface,
    ImportDataParams,
    ImportResult,
} from './types.js';

/**
 * YAPI API 客户端
 */
export class YapiClient {
    private client: AxiosInstance;
    private token: string;

    constructor(config: YapiConfig) {
        this.token = config.token;
        this.client = axios.create({
            baseURL: config.baseUrl,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // 响应拦截器：统一处理错误
        this.client.interceptors.response.use(
            (response) => {
                const data = response.data as YapiResponse;
                // YAPI 返回 errcode 为 0 表示成功
                if (data.errcode !== 0) {
                    throw new Error(`YAPI API 错误: ${data.errmsg}`);
                }
                return response;
            },
            (error) => {
                if (error.response) {
                    throw new Error(`HTTP 错误 ${error.response.status}: ${error.response.statusText}`);
                } else if (error.request) {
                    throw new Error('网络错误: 无法连接到 YAPI 服务器');
                } else {
                    throw new Error(`请求错误: ${error.message}`);
                }
            }
        );
    }

    // ============ 项目管理 ============

    /**
     * 获取项目基本信息
     * @param id 项目 ID
     */
    async getProject(id: number): Promise<ProjectInfo> {
        const response = await this.client.get<YapiResponse<ProjectInfo>>('/api/project/get', {
            params: { id, token: this.token },
        });
        return response.data.data;
    }

    // ============ 接口分类管理 ============

    /**
     * 新增接口分类
     */
    async addCategory(params: Omit<AddCategoryParams, 'token'>): Promise<Category> {
        const response = await this.client.post<YapiResponse<Category>>('/api/interface/add_cat', {
            ...params,
            token: this.token,
        });
        return response.data.data;
    }

    /**
     * 获取菜单列表
     * @param project_id 项目 ID
     */
    async getCategoryMenu(project_id: number): Promise<Category[]> {
        const response = await this.client.get<YapiResponse<Category[]>>('/api/interface/getCatMenu', {
            params: { project_id, token: this.token },
        });
        return response.data.data;
    }

    // ============ 接口管理 ============

    /**
     * 获取接口详细数据
     * @param id 接口 ID
     */
    async getInterface(id: number): Promise<InterfaceDetail> {
        const response = await this.client.get<YapiResponse<InterfaceDetail>>('/api/interface/get', {
            params: { id, token: this.token },
        });
        return response.data.data;
    }

    /**
     * 获取某个分类下的接口列表
     * @param catid 分类 ID
     * @param page 页码
     * @param limit 每页数量
     */
    async listInterfacesByCat(
        catid: number,
        page: number = 1,
        limit: number = 10
    ): Promise<InterfaceListResponse> {
        const response = await this.client.get<YapiResponse<InterfaceListResponse>>(
            '/api/interface/list',
            {
                params: { catid, page, limit, token: this.token },
            }
        );
        return response.data.data;
    }

    /**
     * 新增接口
     */
    async addInterface(params: Omit<AddInterfaceParams, 'token'>): Promise<InterfaceInfo> {
        const response = await this.client.post<YapiResponse<InterfaceInfo>>('/api/interface/save', {
            ...params,
            token: this.token,
        });
        return response.data.data;
    }

    /**
     * 新增或更新接口
     * NOTE: 此接口会根据 id 自动判断是新增还是更新
     */
    async updateInterface(params: Omit<UpdateInterfaceParams, 'token'>): Promise<void> {
        await this.client.post<YapiResponse<void>>('/api/interface/up', {
            ...params,
            token: this.token,
        });
    }

    /**
     * 获取接口列表数据
     */
    async getInterfaceList(params: Omit<GetInterfaceListParams, 'token'>): Promise<InterfaceInfo[]> {
        const response = await this.client.get<YapiResponse<InterfaceInfo[]>>(
            '/api/interface/list_menu',
            {
                params: { ...params, token: this.token },
            }
        );
        return response.data.data;
    }

    /**
     * 更新接口基本信息
     */
    async updateInterfaceBasic(params: Omit<UpdateInterfaceBasicParams, 'token'>): Promise<void> {
        await this.client.post<YapiResponse<void>>('/api/interface/update', {
            ...params,
            token: this.token,
        });
    }

    /**
     * 获取接口菜单列表（包含接口的分类列表）
     * @param project_id 项目 ID
     */
    async getInterfaceCatList(project_id: number): Promise<CategoryInterface[]> {
        const response = await this.client.get<YapiResponse<CategoryInterface[]>>(
            '/api/interface/list_cat',
            {
                params: { project_id, token: this.token },
            }
        );
        return response.data.data;
    }

    // ============ 数据导入 ============

    /**
     * 服务端数据导入
     * NOTE: 支持导入 Swagger, HAR, Postman 等格式
     */
    async importData(params: Omit<ImportDataParams, 'token'>): Promise<ImportResult> {
        const response = await this.client.post<ImportResult>('/api/open/import_data', {
            ...params,
            token: this.token,
        });
        return response.data;
    }
}
