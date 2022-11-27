import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import DictInstall from "./plugins/DictPlugin";

const app = createApp(App);
app.config.globalProperties.productionTip = false;
app.use(DictInstall).use(store).use(router).use(Antd).mount("#app");
