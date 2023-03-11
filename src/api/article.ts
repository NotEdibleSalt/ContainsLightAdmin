import { fetch } from "@/utils/http";
import { AppObj } from "@/utils/http/type";

/**
 * 分页查询文章参数类型
 */
export interface GetArticlesParamI extends IPagingParam, AppObj {
  author?: string;
  articleType?: string;
  articleStatus?: string;
}

/**
 * 分页查询字典
 * @param param
 * @returns
 */
export const getArticlesApi = (param: GetArticlesParamI): Promise<any> =>
  fetch.get("/articles", param);

/**
 * 查询字典信息
 * @param id 字典id
 * @returns
 */
export const getArticleByIdApi = (id: string): Promise<any> =>
  fetch.getByid("/articles", id);

/**
 * 保存文章参数
 */
export interface SaveArticleParamI extends AppObj {
  id?: string;
  title?: string;
  content?: string;
}

/**
 * 新增文章
 * @param param
 * @returns
 */
export const addArticleApi = (param: SaveArticleParamI): Promise<any> =>
  fetch.post("/articles", param);

/**
 * 更新文章内容
 * @param articleId 文章id
 * @returns
 */
export const updateArticleApi = (
  articleId: string,
  param: SaveArticleParamI
): Promise<any> => fetch.put("/articles", articleId, param);

/**
 * 发布文章
 * @param articleId 文章id
 * @returns
 */
export const publishArticleApi = (
  articleId: string,
  data?: any
): Promise<any> => fetch.putAction("/articles", articleId, "publish", data);

/**
 * 下架文章
 * @param articleId 文章id
 * @returns
 */
export const lowerShelfArticleApi = (articleId: string): Promise<any> =>
  fetch.putAction("/articles", articleId, "lower-shelf");

/**
 * 删除文章
 * @param articleId 文章id
 * @returns
 */
export const delArticleApi = (articleId: string): Promise<any> =>
  fetch.deleteById("/articles", articleId);
