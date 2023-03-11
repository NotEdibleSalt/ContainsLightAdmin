import { fetch } from "@/utils/http";
import { AppObj } from "@/utils/http/type";

const baseUrl = "/authoritys";

/**
 * 分页查询系统权限参数类型
 */
export interface GetAuthoritysParamI extends IPagingParam, AppObj {
  name?: string;
  url?: string;
  description?: string;
}

/**
 * 分页查询系统权限
 * @param param
 * @returns
 */
export const getAuthoritysApi = (param: GetAuthoritysParamI): Promise<any> =>
  fetch.get(baseUrl, param);

/**
 * 查询系统权限
 * @param id 系统权限id
 * @returns
 */
export const getAuthorityByIdApi = (id: string): Promise<any> =>
  fetch.getByid(baseUrl, id);

/**
 * 保存系统权限
 */
export interface SaveAuthorityParamI extends AppObj {
  name: string;

  url: string;

  description: string;
}

/**
 * 新增系统权限
 * @param param
 * @returns
 */
export const addAuthorityApi = (param: SaveAuthorityParamI): Promise<any> =>
  fetch.post(baseUrl, param);

/**
 * 更新系统权限
 * @param id 系统权限id
 * @param param
 * @returns
 */
export const updateAuthorityApi = (
  id: string,
  param: SaveAuthorityParamI
): Promise<any> => fetch.put(baseUrl, id, param);

/**
 * 删除系统权限
 * @param id 系统权限id
 * @returns
 */
export const delAuthorityApi = (id: string): Promise<any> =>
  fetch.deleteById(baseUrl, id);

/**
 * 查询权限树
 *
 * @returns
 */
export const getAuthorityTreeApi = (): Promise<any> =>
  fetch.get(baseUrl + "/tree");

/**
 * 查询权限中所有的模块名
 * @returns
 */
export const getAuthorityAllModuleApi = (): Promise<any> =>
  fetch.get(baseUrl + "/modules");
