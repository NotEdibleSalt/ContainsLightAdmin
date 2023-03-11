import store from "@/store";
import { IMenuTree } from "@/store/modules/MenuTreeStore";

export const getMenuTree = (): IMenuTree[] | null => {
  let menuTree = store.getters.getMenuTree();
  if (!menuTree || menuTree.length === 0) {
    store.dispatch("fetchMenuTree");
    menuTree = store.getters.getMenuTree();
  }
  return menuTree;
};

export const haveMenu = async (route: any): Promise<boolean> => {
  const allMenu = store.getters.getAllMenu();
  if (!allMenu || allMenu.length === 0) {
    await store.dispatch("fetchMenu");
  }

  const menu = store.getters.getMenu(route.name);
  if (menu && menu.path === route.path && menu.name === route.name) {
    return true;
  }
  return false;
};
