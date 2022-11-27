import { fetch } from "@/utils/http";
import { AppObj } from "@/utils/http/type";

/**
 * 分页查询后台管理用户参数
 */
export interface GetAdminUsersParamI extends PagingParamI, AppObj {
  name?: string;
  nickname?: string;
  phone?: string;
}

/**
 * 分页查询后台管理用户
 * @param param
 * @returns
 */
export const getAdminUsers = (param: GetAdminUsersParamI): Promise<any> =>
  fetch.get("/admins", param);

/**
 * 查询后台管理用户
 * @param id 管理用户id
 * @returns
 */
export const getAdminUsersByIdApi = (id: string): Promise<any> =>
  fetch.getByid("/admins", id);

/**
 * 新增后台管理用户参数
 */
export interface AddAdminUsersParamI extends AppObj {
  name?: string;
  nickname?: string;
  phone?: string;
}

/**
 * 新增后台管理用户
 * @param param
 * @returns
 */
export const addAdminUsersApi = (param: AddAdminUsersParamI): Promise<any> =>
  fetch.post("/admins", param);

/**
 * 更新后台管理用户
 * @param id 管理用户id
 * @param param
 * @returns
 */
export const updateAdminUsersApi = (id: string, param: any): Promise<any> =>
  fetch.put("/admins", id, param);

/**
 * 删除后台管理用户
 * @param id  管理用户id
 * @returns
 */
export const delAdminUsersApi = (id: string): Promise<any> =>
  fetch.deleteById("/admins", id);

/**
 * 获取该账号的所有菜单
 * @returns
 */
export const getUserAllMenusApi = (): Promise<any> =>
  fetch.get("/admins/menus");
