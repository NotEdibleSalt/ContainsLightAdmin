export type AppObj = {
  [prop: string]: string | number | boolean | undefined | any[];
};

export type Mode = "cors" | "no-cors" | "same-origin";
export type Credentials = "same-origin" | "include" | "same-origin";
export type Referrer = "no-referrer" | "client";
export type ContentType =
  | "text/html"
  | "text/plain"
  | "image/png"
  | "image/jpeg"
  | "image/gif "
  | "application/json "
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";
export type AppHeaders = {
  [prop: string]: string;
};
export interface FetchConfig {
  cache: RequestCache;
  credentials: Credentials;
  mode: Mode;
  redirect: RequestRedirect;
  referrer: Referrer;
  timeout: number;
  BASE_URL: string;
  baseHeaders: AppHeaders;
  [prop: string]: string | number | AppHeaders;
}
export type Params = {
  params?: BodyInit | string | AppObj;
  url: string;
  method?: string;
  headers?: AppHeaders;
};

export enum HttpMsg {
  NetErr = "网络故障，请稍后重试",
  Loading = "正在拼命加载中",
  LoginExpired = "登录已过期, 系统将会在3秒后自动退出, 请重新登录",
  NotLogin = "未登录, 系统将在3秒后跳转到登录页面",
  NotAuthority = "没有访问该资源的权限",
  InvalidToken = "无效的Token, 系统将在3秒后跳转到登录页面 ",
  DeleConfirm = "删除数据后，将无法恢复，确认删除么?",
}
