import { getUserAllMenusApi } from "@/api/admin-user";
import { Module } from "vuex";

export interface IMenu {
  id: string;
  path: string;
  name: string;
}

export interface IMenus {
  menus: Map<string, IMenu>;
}

export const menus = new Map<string, IMenu>();

const MenuAuthStoreModule: Module<IMenus, any> = {
  state: { menus },
  getters: {
    getMenu:
      (state) =>
      (key: string): IMenu | undefined =>
        state.menus.get(key),

    getAllMenu: (state) => (): IMenu[] => {
      const arr: IMenu[] = [];
      state.menus.forEach((menu) => {
        arr.push(menu);
      });

      return arr;
    },
  },
  mutations: {
    setMenu(state, payload: IMenu): void {
      state.menus.set(payload.name, payload);
    },
    delMenu(state, payload: string): boolean {
      return state.menus.delete(payload);
    },
    clearAll(state): void {
      return state.menus.clear();
    },
  },
  actions: {
    fetchMenu: async (context): Promise<void> => {
      const data = await getUserAllMenusApi();

      if (!data || data.length === 0) {
        context.commit("setMenu", {
          id: undefined,
          name: undefined,
          path: undefined,
        });
      } else {
        context.commit("clearAll");
        data.forEach((meunItem: any) => {
          context.commit("setMenu", {
            id: meunItem.id,
            name: meunItem.routeName,
            path: meunItem.routePath,
          });
        });
      }
    },
  },
};

export default MenuAuthStoreModule;
