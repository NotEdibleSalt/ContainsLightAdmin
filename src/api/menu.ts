import { fetch } from "@/utils/http";
import { AppObj } from "@/utils/http/type";

const baseUrl = "/menus";

/**
 * 分页查询菜单参数类型
 */
export interface GetMenusParamI extends PagingParamI, AppObj {
  parentId?: string;

  name?: string;

  title?: string;

  path?: string;

  description?: string;

  sortNumber?: string;

  show?: string;
}

/**
 * 分页查询菜单
 * @param param
 * @returns
 */
export const getMenusApi = (param: GetMenusParamI): Promise<any> =>
  fetch.get(baseUrl, param);

/**
 * 查询菜单
 * @param id 菜单id
 * @returns
 */
export const getMenuByIdApi = (id: string): Promise<any> =>
  fetch.getByid(baseUrl, id);

/**
 * 保存菜单
 */
export interface SaveMenuParamI extends AppObj {
  parentId: string;

  name: string;

  path: string;

  title: string;

  routeName: string;

  routePath: string;

  description: string;

  sortNumber: string;

  status: string;
}

/**
 * 新增菜单
 * @param param
 * @returns
 */
export const addMenuApi = (param: SaveMenuParamI): Promise<any> =>
  fetch.post(baseUrl, param);

/**
 * 更新菜单
 * @param id 菜单id
 * @param param
 * @returns
 */
export const updateMenuApi = (
  id: string,
  param: SaveMenuParamI
): Promise<any> => fetch.put(baseUrl, id, param);

/**
 * 删除菜单
 * @param id 菜单id
 * @returns
 */
export const delMenuApi = (id: string): Promise<any> =>
  fetch.deleteById(baseUrl, id);

/**
 * 查询菜单树
 *
 * @returns
 */
export const getMenuTreeApi = (): Promise<any> => fetch.get(baseUrl + "/tree");
