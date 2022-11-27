import { fetch } from "@/utils/http";
import { IDictItem } from "@/store/modules/DictStore";
import { AppObj } from "@/utils/http/type";

/**
 * 分页查询字典
 * @param param
 * @returns
 */
export const getDictsApi = (param: GetDictsParamI): Promise<any> =>
  fetch.get("/dicts", param);

/**
 * 查询字典信息
 * @param id 字典id
 * @returns
 */
export const getDictByIdApi = (id: string): Promise<any> =>
  fetch.getByid("/dicts", id);

/**
 * 根据字典的所有字典项
 * @param dictId 字典id
 * @returns
 */
export const getDictItemsByDictIdApi = (dictId: string): Promise<any> => {
  const url = "/dicts/" + dictId + "/items";
  return fetch.get(url);
};

/**
 * 根据字典类型查询字典项
 * @param name 字典名
 * @returns
 */
export const getDictItemsApi = (type: string): Promise<IDictItem[]> => {
  const url = "/dicts/type/" + type + "/items";
  return fetch.get(url);
};

/**
 * 分页查询字典参数类型
 */
export interface GetDictsParamI extends PagingParamI, AppObj {
  name?: string;
  type?: string;
}

/**
 * 保存字典信息类型
 */
export interface SaveDictParamI extends AppObj {
  name: string;
  type: string;
  remark?: string;
  system: boolean;
}

/**
 * 新增字典
 * @param param
 * @returns
 */
export const addDictApi = (param: SaveDictParamI): Promise<any> =>
  fetch.post("/dicts", param);

/**
 * 更新字典
 * @param id 字典id
 * @param param
 * @returns
 */
export const updateDictApi = (
  id: string,
  param: SaveDictParamI
): Promise<any> => fetch.put("/dicts", id, param);

/**
 * 删除字典
 * @param id 字典id
 * @returns
 */
export const delDictApi = (id: string): Promise<any> =>
  fetch.deleteById("/dicts", id);

/**
 * 查询字典项详情
 * @param dictId 字典id
 * @param dictItemId 字典项id
 */
export const getDictItemInfoByIdApi = (
  dictId: string,
  dictItemId: string
): Promise<any> => {
  const url = "/dicts/" + dictId + "/items/" + dictItemId;
  return fetch.get(url);
};

/**
 * 新增字典项
 * @param dictId 字典id
 * @param param
 * @returns
 */
export const addDictItemApi = (dictId: string, param: any): Promise<any> => {
  const url = "/dicts/" + dictId + "/items";
  return fetch.post(url, param);
};

/**
 * 更新字典项
 * @param dictId 字典id
 * @param dictItemId 字典项id
 * @param param
 * @returns
 */
export const updateDictItemApi = (
  dictId: string,
  dictItemId: string,
  param: any
): Promise<any> => {
  const url = "/dicts/" + dictId + "/items";
  return fetch.put(url, dictItemId, param);
};

/**
 * 删除字典项
 * @param dictId 字典id
 * @param dictItemId 字典项id
 * @returns
 */
export const delDictItemApi = (
  dictId: string,
  dictItemId: string
): Promise<any> => {
  const url = "/dicts/" + dictId + "/items";
  return fetch.deleteById(url, dictItemId);
};
