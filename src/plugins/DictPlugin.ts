import { App } from "vue";
import { dictDataUtil, dictDataLableUtil } from "@/utils/DictUtil";

const DictInstall = {
  install: (app: App): App<any> => {
    app.mixin({
      methods: {
        dictData: dictDataUtil,
        dictDataLable: dictDataLableUtil,
      },
    });

    return app;
  },
};

export default DictInstall;
