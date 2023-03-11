import { createStore } from "vuex";
import DictStoreModule from "./modules/DictStore";
import MenuAuthStoreModule from "./modules/MenuAuthStore";
import MenuTreeStoreModule from "./modules/MenuTreeStore";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { DictStoreModule, MenuAuthStoreModule, MenuTreeStoreModule },
});
