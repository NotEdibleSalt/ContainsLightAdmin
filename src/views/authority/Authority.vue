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
        label="名称"
        name="name"
        :rules="[{ required: true, message: '请输入名称' }]"
      >
        <a-input v-model:value="formState.data.name" />
      </a-form-item>
      <a-form-item
        label="所属模块"
        name="module"
        :rules="[{ required: true, message: '请输入所属模块名称' }]"
      >
        <a-input v-model:value="formState.data.module" />
      </a-form-item>
      <a-form-item
        label="请求方式"
        name="method"
        :rules="[{ required: true, message: '请选择请求方式' }]"
      >
        <a-select
          :allowClear="true"
          v-model:value="formState.data.method"
          :options="methodOptions"
        />
      </a-form-item>
      <a-form-item
        label="接口uri"
        name="url"
        :rules="[{ required: true, message: '请输入接口uri' }]"
      >
        <a-input v-model:value="formState.data.url" />
      </a-form-item>

      <a-form-item label="描述" name="description">
        <a-textarea v-model:value="formState.data.description" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineExpose,
  onMounted,
  reactive,
  ref,
  defineProps,
} from "vue";
import { dictDataUtil } from "@/utils/DictUtil";
import type { FormInstance } from "ant-design-vue";
import {
  getAuthorityByIdApi,
  addAuthorityApi,
  updateAuthorityApi,
} from "@/api/authority";
import { submit, putSubmit } from "@/utils/FormUtil";

const props = defineProps({
  authorityId: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  if (props && props.authorityId) {
    getAuthorityByIdApi(props.authorityId).then(
      (res) => (formState.data = res)
    );
  }
});

const formState = reactive({
  data: { name: "", module: "", method: "", url: "", description: "" },
});

const methodOptions = computed(() => {
  return dictDataUtil("RequestMethod");
});

const formRef = ref<FormInstance>();
const addAuthority = () =>
  submit(formRef.value, addAuthorityApi, formState.data);
const updateAuthority = () =>
  putSubmit(
    formRef.value,
    updateAuthorityApi,
    props.authorityId,
    formState.data
  );

const saveAuthority = () => {
  if (props && props.authorityId) {
    return updateAuthority();
  } else {
    return addAuthority();
  }
};

defineExpose({ saveAuthority });
</script>

<style lang="scss" scoped></style>
