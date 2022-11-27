import { fetch } from "@/utils/http";
import { AppObj } from "@/utils/http/type";

const baseUrl = "/loginRecords";

/**
 * 分页查询登录记录参数类型
 */
export interface GetLoginRecordsParamI extends PagingParamI, AppObj {
  loginStatus?: string;

  loginAccount?: string;

  loginTime?: string;
}

/**
 * 分页查询登录记录
 * @param param
 * @returns
 */
export const getLoginRecordsApi = (
  param: GetLoginRecordsParamI
): Promise<any> => fetch.get(baseUrl, param);

/**
 * 查询登录记录
 * @param id 登录记录id
 * @returns
 */
export const getLoginRecordByIdApi = (id: string): Promise<any> =>
  fetch.getByid(baseUrl, id);
