import { Params, FetchConfig, AppObj, AppHeaders, HttpMsg } from "./type";
import { getStore } from "@/utils/storage";
import { message } from "ant-design-vue";
import router from "@/router";

class Fetch {
  dataOperation: any;
  config: FetchConfig;

  constructor(config: FetchConfig) {
    this.dataOperation = {};
    this.config = config;
    this.init();
  }
  init(): void {
    this.dataOperation = {
      JSON: {
        headers: {
          "Content-Type": "application/json",
        },
        formatting(params: any): string {
          return JSON.stringify(params);
        },
      },
      formData: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        formatting(params: any): FormData {
          const formData = new FormData();
          if (typeof params !== "object") {
            formData.append("value", params);
            return formData;
          }
          for (const key in params) {
            formData.append(key, params[key]);
          }
          return formData;
        },
      },
    };
  }
  request({ url, params, method = "GET", headers }: Params): Promise<any> {
    const { BASE_URL, baseHeaders } = this.config;
    headers = headers || {};
    headers = Object.assign({}, headers, baseHeaders);
    headers.token = getStore("token");
    const result = new Promise((resolve, reject) => {
      url = BASE_URL ? `${BASE_URL}${url}` : url;

      fetch(url, {
        ...this.config,
        body: params as BodyInit,
        method,
        headers,
      })
        .then(async (response) => {
          const result = await response.json();
          const { code, res } = result;

          switch (code) {
            case 200:
              if (result.message) {
                message.info(result.message, 3);
              }
              resolve(res);
              break;
            case 401:
              message.error(HttpMsg.LoginExpired, 3);
              setTimeout(() => {
                router.push("/login");
              }, 3000);
              reject(HttpMsg.LoginExpired);
              break;
            case 402:
              message.error(HttpMsg.NotLogin, 3);
              setTimeout(() => {
                router.push("/login");
              }, 3000);
              reject(HttpMsg.NotLogin);
              break;
            case 403:
              message.error(HttpMsg.NotAuthority, 3);
              reject(HttpMsg.NotAuthority);
              break;
            case 406:
              message.error(HttpMsg.InvalidToken, 3);
              setTimeout(() => {
                router.push("/login");
              }, 3000);
              reject(HttpMsg.InvalidToken);
              break;
            case 500:
              message.error(result.message, 3);
              reject(result.message);
              break;
            default:
              message.error(HttpMsg.NetErr, 3);
              reject(HttpMsg.NetErr);
          }
        })
        .catch((err) => {
          message.error(HttpMsg.NetErr, 3);
          reject(err);
        });
    });

    const time = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("timeout");
      }, this.config.timeout);
    });

    return Promise.race([time, result]);
  }

  getByid(
    url: string,
    id: string | number,
    headers?: AppHeaders
  ): Promise<any> {
    const key = url + "/" + id;
    const value = this.request({ url: key, headers });
    return value;
  }

  get(url: string, params?: AppObj, headers?: AppHeaders): Promise<any> {
    const key = params ? `${url}?${joinParam(params)}` : url;

    const value = this.request({ url: key, headers });
    return value;
  }

  post(url: string, params?: AppObj, headers?: AppHeaders): Promise<any> {
    return this.request({
      url,
      headers,
      method: "POST",
      params: JSON.stringify(params),
    });
  }

  put(
    url: string,
    id: string,
    params?: AppObj,
    headers?: AppHeaders
  ): Promise<any> {
    url = url + "/" + id;
    return this.request({
      url,
      headers,
      method: "PUT",
      params: JSON.stringify(params),
    });
  }

  putAction(
    url: string,
    id: string,
    action: string,
    params?: AppObj,
    headers?: AppHeaders
  ): Promise<any> {
    url = url + "/" + id + "/" + action;
    return this.request({
      url,
      headers,
      method: "PUT",
      params: JSON.stringify(params),
    });
  }

  upload(url: string, params?: AppObj, headers?: AppHeaders): Promise<any> {
    headers = headers || {};
    params = this.dataOperation.formData.formatting(params);
    headers = {
      ...this.dataOperation.formData.headers,
      ...headers,
    };
    return this.request({ url, params, headers, method: "POST" });
  }

  delete(url: string, params?: AppObj, headers?: AppHeaders): Promise<any> {
    return this.request({
      url,
      params: JSON.stringify(params),
      headers,
      method: "DELETE",
    });
  }

  deleteById(url: string, id: string, headers?: AppHeaders): Promise<any> {
    url = url + "/" + id;
    return this.request({
      url,
      headers,
      method: "DELETE",
    });
  }
  patch(
    url: string,
    id: string,
    params?: AppObj,
    headers?: AppHeaders
  ): Promise<any> {
    url = url + "/" + id;
    return this.request({
      url,
      headers,
      method: "PATCH",
      params: JSON.stringify(params),
    });
  }
}

export const useRequest: (
  BASE_URL: string,
  timeout: number,
  time?: number
) => Fetch = (BASE_URL: string, timeout: number): Fetch => {
  const config: FetchConfig = {
    cache: "no-cache", // * default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    baseHeaders: {
      "Content-Type": "application/json",
    },
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
    timeout: timeout,
    BASE_URL: BASE_URL,
  };
  return new Fetch(config);
};

function joinParam(obj: AppObj): string {
  if (Object.keys(obj).length === 0) {
    return "";
  }
  const arr: string[] = [];
  for (const key in obj) {
    if (obj[key]) {
      arr.push(`${key}=${obj[key]}`);
    }
  }
  return arr.join("&");
}
