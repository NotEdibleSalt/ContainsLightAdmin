import { getMenuTreeApi } from "@/api/admin-user";

import { Module } from "vuex";

export interface IMenuTree {
  key: string;
  title: string;
  routePath: string;
  children?: IMenuTree[];
}

interface IMenuTrees {
  menuTree: IMenuTree[];
}

const menuTree: IMenuTree[] = [];

const MenuTreeStoreModule: Module<IMenuTrees, any> = {
  state: { menuTree },
  getters: {
    getMenuTree: (state) => (): IMenuTree[] => {
      return state.menuTree;
    },
  },
  mutations: {
    setMenuTree(state, payload: IMenuTree): void {
      state.menuTree.push(payload);
    },
    delMenuTree(state): void {
      state.menuTree = [];
    },
  },
  actions: {
    fetchMenuTree: async (context): Promise<void> => {
      const data = await getMenuTreeApi();
      if (data.length === 0) {
        context.commit("setMenuTree", "aaa");
      } else {
        context.commit("delMenuTree");
        data.forEach((element: any) => {
          context.commit("setMenuTree", element);
        });
      }
    },
  },
};

export default MenuTreeStoreModule;
