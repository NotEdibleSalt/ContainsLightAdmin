import { IDictItem } from "@/store/modules/DictStore";
import { useStore } from "vuex";

export const dictDataUtil = (dictType: string): IDictItem[] | null => {
  const store = useStore();
  const dictData = store.getters.getDict(dictType);
  if (!dictData) {
    store.dispatch("fetchDict", dictType);
  }
  return dictData;
};

export const dictDataLableUtil = (
  dictType: string,
  dictValue: string | number | boolean
): string | null => {
  const store = useStore();
  const dictData = store.getters.getDict(dictType);
  if (!dictData) {
    store.dispatch("fetchDict", dictType);
  }
  if (dictData) {
    const dictItem = dictData.find((d: IDictItem) => d.value === dictValue);
    if (dictItem) {
      return dictItem.label;
    }
  }
  return null;
};
