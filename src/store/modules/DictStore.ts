import { getDictItemsApi } from "@/api/dict";
import { Module } from "vuex";

export interface IDictItem {
  id: string;
  lable: string;
  value: string | number | boolean;
}

export const dicts = new Map<string, IDictItem[]>();

interface IDict {
  [key: string]: Map<string, IDictItem[]>;
}

const DictStoreModule: Module<IDict, any> = {
  state: { dicts },
  getters: {
    getDict:
      (state) =>
      (key: string): IDictItem[] | undefined => {
        const dict = state.dicts.get(key);
        return dict;
      },
  },
  mutations: {
    setDict(state, payload: Map<string, IDictItem[]>): void {
      payload.forEach((v, k) => {
        state.dicts.set(k, v);
      });
    },
    delDict(state, payload: string): boolean {
      return state.dicts.delete(payload);
    },
    clearAll(state: IDict): void {
      return state.dicts.clear();
    },
  },
  actions: {
    fetchDict: async (context, payload: string): Promise<void> => {
      const dict = new Map<string, IDictItem[]>();
      dict.set(payload, []);
      context.commit("setDict", dict);

      const data = await getDictItemsApi(payload);
      dict.set(payload, data);
      context.commit("setDict", dict);
    },
  },
};

export default DictStoreModule;
