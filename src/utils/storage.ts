/**
 * 存储localStorage
 */
export const setStorage = (name: string, content: any): void => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStorage = (name: string): string => {
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
export const removeStorage = (name: string): void => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 删除所有localStorage
 */
export const removeAllStorage = (): void => {
  window.localStorage.clear();
};
