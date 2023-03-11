import { fetch } from "@/utils/http";
import { AppObj } from "@/utils/http/type";

const baseUrl = "/roles";

/**
 * 分页查询角色参数类型
 */
export interface GetRolesParamI extends IPagingParam, AppObj {
  name?: string;

  description?: string;

  status?: string;
}

/**
 * 分页查询角色
 * @param param
 * @returns
 */
export const getRolesApi = (param: GetRolesParamI): Promise<any> =>
  fetch.get(baseUrl, param);

/**
 * 获取全部角色
 * @returns
 */
export const getAllRolesApi = (): Promise<any> => fetch.get(baseUrl + "/list");

/**
 * 查询角色
 * @param id 角色id
 * @returns
 */
export const getRoleByIdApi = (id: string): Promise<any> =>
  fetch.getByid(baseUrl, id);

/**
 * 保存角色
 */
export interface SaveRoleParamI extends AppObj {
  name: string;

  description: string;

  status: string;
}

/**
 * 新增角色
 * @param param
 * @returns
 */
export const addRoleApi = (param: SaveRoleParamI): Promise<any> =>
  fetch.post(baseUrl, param);

/**
 * 更新角色
 * @param id 角色id
 * @param param
 * @returns
 */
export const updateRoleApi = (
  id: string,
  param: SaveRoleParamI
): Promise<any> => fetch.put(baseUrl, id, param);

/**
 * 删除角色
 * @param id 角色id
 * @returns
 */
export const delRoleApi = (id: string): Promise<any> =>
  fetch.deleteById(baseUrl, id);

/**
 * 启用角色
 * @param id
 * @returns
 */
export const enableRoleApi = (id: string): Promise<any> =>
  fetch.putAction(baseUrl, id, "enable");

/**
 * 禁用角色
 * @param id
 * @returns
 */
export const disableRoleApi = (id: string): Promise<any> =>
  fetch.putAction(baseUrl, id, "disable");

/**
 * 保存系统权限
 */
export interface SaveRoleAssociatedAuthoitysParamI extends AppObj {
  authoityIdSet: string[];
}

/**
 * 保存角色关联的权限
 * @param roleId 角色id
 * @param authoityIds 权限id集合
 * @returns
 */
export const saveRoleAssociatedAuthoitysApi = (
  roleId: string,
  authoityIds: SaveRoleAssociatedAuthoitysParamI
): Promise<any> => {
  const url = baseUrl + "/" + roleId + "/authoitys";
  return fetch.post(url, authoityIds);
};

/**
 * 获取角色关联的所有权限
 * @param roleId 角色id
 * @returns
 */
export const getRoleAllAuthoitysApi = (roleId: string): Promise<any> => {
  const url = baseUrl + "/" + roleId + "/authoitys/list";
  return fetch.get(url);
};

/**
 * 保存菜单参数
 */
export interface SaveRoleAssociatedMenusParamI extends AppObj {
  menuIdSet: string[];
}

/**
 * 保存角色关联的菜单
 * @param roleId 角色id
 * @param menuIds 菜单id集合
 * @returns
 */
export const saveRoleAssociatedMenusApi = (
  roleId: string,
  menuIds: SaveRoleAssociatedMenusParamI
): Promise<any> => {
  const url = baseUrl + "/" + roleId + "/menus";
  return fetch.post(url, menuIds);
};

/**
 * 获取角色关联的所有菜单
 * @param roleId 角色id
 * @returns
 */
export const getRoleAllMenusApi = (roleId: string): Promise<any> => {
  const url = baseUrl + "/" + roleId + "/menus/list";
  return fetch.get(url);
};
