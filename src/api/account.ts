import { fetch } from "@/utils/http";

const baseUrl = "/accounts";

/**
 * 启用账号
 * @param param 账号id
 * @returns
 */
export const enableAccountApi = (id: string): Promise<any> =>
  fetch.putAction(baseUrl, id, "enable");

/**
 * 禁用账号
 * @param param 账号id
 * @returns
 */
export const disableAccountApi = (id: string): Promise<any> =>
  fetch.putAction(baseUrl, id, "disable");
