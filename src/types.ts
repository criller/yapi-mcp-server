/**
 * YAPI 类型定义
 */

// ============ 共通类型 ============

/**
 * YAPI API 通用响应
 */
export interface YapiResponse<T = any> {
    errcode: number;
    errmsg: string;
    data: T;
}

// ============ 项目相关 ============

/**
 * 项目信息
 */
export interface ProjectInfo {
    _id: number;
    name: string;
    basepath: string;
    desc?: string;
    members: ProjectMember[];
    project_type: string;
    uid: number;
    group_id: number;
    icon: string;
    color: string;
    add_time: number;
    up_time: number;
    env: ProjectEnv[];
    tag?: string[];
}

/**
 * 项目成员
 */
export interface ProjectMember {
    uid: number;
    username: string;
    email: string;
    role: string;
}

/**
 * 项目环境配置
 */
export interface ProjectEnv {
    _id: string;
    name: string;
    domain: string;
    header?: Array<{
        name: string;
        value: string;
    }>;
}

// ============ 分类相关 ============

/**
 * 接口分类
 */
export interface Category {
    _id: number;
    name: string;
    project_id: number;
    desc: string;
    uid: number;
    add_time: number;
    up_time: number;
    index?: number;
}

/**
 * 新增分类参数
 */
export interface AddCategoryParams {
    name: string;
    project_id: number;
    desc?: string;
    token: string;
}

/**
 * 包含接口的分类（菜单列表使用）
 */
export interface CategoryInterface {
    _id: number;
    name: string;
    project_id: number;
    desc: string;
    add_time: number;
    up_time: number;
    list: InterfaceInfo[];
}

// ============ 接口相关 ============

/**
 * 接口基本信息
 */
export interface InterfaceInfo {
    _id: number;
    title: string;
    catid: number;
    path: string;
    method: string;
    project_id: number;
    uid: number;
    add_time: number;
    up_time: number;
    status?: string;
    tag?: string[];
}

/**
 * 接口详细信息
 */
export interface InterfaceDetail extends InterfaceInfo {
    req_query?: ReqQueryItem[];
    req_headers?: ReqHeaderItem[];
    req_params?: ReqParamItem[];
    req_body_type?: string;
    req_body_form?: ReqBodyFormItem[];
    req_body_other?: string;
    res_body_type?: string;
    res_body?: string;
    res_body_is_json_schema?: boolean;
    desc?: string;
    markdown?: string;
}

/**
 * 请求 Query 参数
 */
export interface ReqQueryItem {
    name: string;
    desc?: string;
    required?: string;
    example?: string;
}

/**
 * 请求 Header
 */
export interface ReqHeaderItem {
    name: string;
    value: string;
    desc?: string;
    required?: string;
    example?: string;
}

/**
 * 路径参数
 */
export interface ReqParamItem {
    name: string;
    desc?: string;
    example?: string;
}

/**
 * 表单参数
 */
export interface ReqBodyFormItem {
    name: string;
    type: string;
    desc?: string;
    required?: string;
    example?: string;
}

/**
 * 新增接口参数
 */
export interface AddInterfaceParams {
    title: string;
    catid: number;
    path: string;
    method: string;
    project_id: number;
    token: string;
    desc?: string;
    req_query?: ReqQueryItem[];
    req_headers?: ReqHeaderItem[];
    req_params?: ReqParamItem[];
    req_body_type?: string;
    req_body_form?: ReqBodyFormItem[];
    req_body_other?: string;
    res_body_type?: string;
    res_body?: string;
    status?: string;
    tag?: string[];
}

/**
 * 更新接口参数（完整更新）
 */
export interface UpdateInterfaceParams extends Omit<AddInterfaceParams, 'project_id'> {
    id: number;
}

/**
 * 更新接口基本信息参数
 */
export interface UpdateInterfaceBasicParams {
    id: number;
    token: string;
    title?: string;
    catid?: number;
    path?: string;
    method?: string;
    status?: string;
    tag?: string[];
    desc?: string;
}

/**
 * 获取接口列表参数
 */
export interface GetInterfaceListParams {
    project_id?: number;
    catid?: number;
    page?: number;
    limit?: number;
    token: string;
}

/**
 * 接口列表响应
 */
export interface InterfaceListResponse {
    count: number;
    total: number;
    list: InterfaceInfo[];
}

// ============ 数据导入相关 ============

/**
 * 数据导入参数
 */
export interface ImportDataParams {
    type: 'swagger' | 'har' | 'postman' | 'json';
    json: string; // JSON 字符串
    project_id: number;
    token: string;
    merge?: 'normal' | 'good' | 'merge'; // 数据同步模式
}

/**
 * 导入结果
 */
export interface ImportResult {
    errcode: number;
    errmsg: string;
    data: {
        count: number;
    };
}
