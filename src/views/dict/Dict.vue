<template>
  <div>
    <a-form
      :layout="'horizontal'"
      ref="formRef"
      :model="formState.data"
      :label-col="{ style: { width: '100px' } }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item
        label="字典名"
        name="name"
        :rules="[{ required: true, message: '请输入字典名' }]"
      >
        <a-input v-model:value="formState.data.name" />
      </a-form-item>
      <a-form-item
        label="类型"
        name="type"
        :rules="[{ required: true, message: '请输入字典类型' }]"
      >
        <a-input v-model:value="formState.data.type" />
      </a-form-item>
      <a-form-item label="备注">
        <a-textarea v-model:value="formState.data.remark" />
      </a-form-item>
      <a-form-item
        label="系统内置"
        name="system"
        :rules="[{ required: true, message: '请是否是系统内置' }]"
      >
        <a-radio-group
          v-model:value="formState.data.system"
          :options="options"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineExpose, onMounted, reactive, ref, defineProps } from "vue";
import type { FormInstance } from "ant-design-vue";
import { addDictApi, updateDictApi, getDictByIdApi } from "@/api/dict";
import { submit, putSubmit } from "@/utils/FormUtil";

const props = defineProps({
  dictId: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  if (props && props.dictId) {
    getDictByIdApi(props.dictId).then((res) => (formState.data = res));
  }
});

const formState = reactive({
  data: { name: "", type: "", remark: "", system: false },
});

const options = [
  { label: "是", value: true },
  { label: "否", value: false },
];

const formRef = ref<FormInstance>();
const addDict = () => submit(formRef.value, addDictApi, formState.data);
const updateDict = () =>
  putSubmit(formRef.value, updateDictApi, props.dictId, formState.data);

const saveDict = () => {
  if (props && props.dictId) {
    return updateDict();
  } else {
    return addDict();
  }
};

defineExpose({ saveDict });
</script>

<style lang="scss" scoped></style>
