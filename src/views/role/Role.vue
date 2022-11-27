<template>
  <div>
    <a-form
      :layout="'horizontal'"
      ref="formRef"
      :model="formState.data"
      :label-col="{ style: { width: '100px' } }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="角色名称">
        <a-input v-model:value="formState.data.name" />
      </a-form-item>

      <a-form-item label="角色描述">
        <a-input v-model:value="formState.data.description" />
      </a-form-item>

      <a-form-item label="状态">
        <a-select
          :allowClear="true"
          v-model:value="formState.data.status"
          :options="roleStatusOptions"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  defineExpose,
  ref,
  defineProps,
} from "vue";
import type { FormInstance } from "ant-design-vue";
import { addRoleApi, updateRoleApi, getRoleByIdApi } from "@/api/role";
import { dictDataUtil } from "@/utils/DictUtil";
import { submit, putSubmit } from "@/utils/FormUtil";

const props = defineProps({
  roleId: {
    type: String,
    default: "",
  },
});

let formState = reactive({
  data: {
    name: "",
    description: "",
    status: "",
  },
});

const roleStatusOptions = computed(() => {
  return dictDataUtil("AvailableStatus");
});

let show = ref<boolean>(false);
onMounted(() => {
  if (props && props.roleId) {
    getRoleByIdApi(props.roleId).then((res) => (formState.data = res));
  } else {
    show.value = true;
  }
});

const formRef = ref<FormInstance>();
const addRole = () => submit(formRef.value, addRoleApi, formState.data);
const updateRole = () =>
  putSubmit(formRef.value, updateRoleApi, props.roleId, formState.data);

const save = () => {
  if (props && props.roleId) {
    return updateRole();
  } else {
    return addRole();
  }
};

defineExpose({ save });
</script>

<style lang="scss" scoped></style>
