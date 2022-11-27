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
        label="标签"
        name="label"
        :rules="[{ required: true, message: '请输入字典项名' }]"
      >
        <a-input v-model:value="formState.data.label" />
      </a-form-item>
      <a-form-item
        label="值"
        name="value"
        :rules="[{ required: true, message: '请输入字典值' }]"
      >
        <a-input v-model:value="formState.data.value" />
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea v-model:value="formState.data.description" />
      </a-form-item>
      <a-form-item label="排序(升序)">
        <a-input-number v-model:value="formState.data.sort" :min="1" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineExpose, onMounted, reactive, ref, defineProps } from "vue";
import type { FormInstance } from "ant-design-vue";
import { childSubmit, putChildSubmit } from "@/utils/FormUtil";

import {
  addDictItemApi,
  updateDictItemApi,
  getDictItemInfoByIdApi,
} from "@/api/dict";

const props = defineProps({
  dictId: {
    type: String,
    required: true,
  },
  dictItemId: {
    type: String,
    required: false,
  },
});

onMounted(() => {
  if (props && props.dictItemId) {
    getDictItemInfoByIdApi(props.dictId, props.dictItemId).then(
      (res) => (formState.data = res)
    );
  }
});

const formState = reactive({
  data: { label: "", value: "", description: "", sort: 1 },
});

const formRef = ref<FormInstance>();
const add = () =>
  childSubmit(formRef.value, addDictItemApi, props.dictId, formState.data);
const update = () =>
  putChildSubmit(
    formRef.value,
    updateDictItemApi,
    props.dictId,
    props.dictItemId,
    formState.data
  );

const saveDictItem = () => {
  if (props && props.dictItemId) {
    return update();
  } else {
    return add();
  }
};

defineExpose({ saveDictItem });
</script>

<style lang="scss" scoped></style>
