/**
 * 存储localStorage
 */
export const setStore = (name: string, content: any): void => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name: string): string => {
  if (!name) return "";
  const item = window.localStorage.getItem(name);
  if (item == null) {
    return "";
  }
  return item;
};

/**
 * 删除localStorage
 */
export const removeStore = (name: string): void => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 删除所有localStorage
 */
export const removeAllStore = (): void => {
  window.localStorage.clear();
};
