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
        label="菜单类型"
        name="menuType"
        :rules="[{ required: true, message: '请选择菜单类型' }]"
      >
        <a-select
          :allowClear="true"
          v-model:value="formState.data.menuType"
          :options="menuTypeOptions"
        />
      </a-form-item>

      <a-form-item
        label="上级菜单"
        name="parentId"
        v-if="formState.data.menuType !== 'TopMenu'"
      >
        <a-tree-select
          v-model:value="formState.data.parentId"
          :tree-line="true"
          :tree-data="treeData"
        >
          <template #title="{ title }">
            {{ title }}
          </template>
        </a-tree-select>
      </a-form-item>

      <a-form-item
        label="菜单名"
        name="name"
        :rules="[{ required: true, message: '请输入菜单名' }]"
      >
        <a-input v-model:value="formState.data.name" />
      </a-form-item>
      <a-form-item
        label="菜单路径"
        name="path"
        :rules="[{ required: true, message: '请输入菜单路径' }]"
      >
        <a-input v-model:value="formState.data.path" />
      </a-form-item>

      <a-form-item
        label="路由名"
        name="routeName"
        :rules="[{ required: true, message: '请输入路由名' }]"
      >
        <a-input v-model:value="formState.data.routeName" />
      </a-form-item>

      <a-form-item
        label="路由路径"
        name="routePath"
        :rules="[{ required: true, message: '请输入路由路径' }]"
      >
        <a-input v-model:value="formState.data.routePath" />
      </a-form-item>

      <a-form-item label="描述">
        <a-input v-model:value="formState.data.description" />
      </a-form-item>
      <a-form-item label="排序号">
        <a-input-number
          style="width: 100%"
          :defaultValue="1"
          :min="1"
          :max="100"
          v-model:value="formState.data.sortNumber"
        />
      </a-form-item>

      <a-form-item
        label="状态"
        name="status"
        :rules="[{ required: true, message: '请选择菜单可用状态' }]"
      >
        <a-select
          :allowClear="true"
          v-model:value="formState.data.status"
          :options="statusOptions"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, defineExpose, onBeforeMount, reactive, ref } from "vue";
import type { FormInstance, TreeProps } from "ant-design-vue";
import { dictDataUtil } from "@/utils/DictUtil";
import { submit } from "@/utils/FormUtil";
import { addMenuApi } from "@/api/menu";
import { getMenuTreeApi } from "@/api/admin-user";

const formState = reactive({
  data: {
    parentId: "",
    menuType: "",
    name: "",
    path: "",
    routeName: "",
    routePath: "",
    description: "",
    sortNumber: 1,
    status: "",
  },
});

const statusOptions = computed(() => {
  return dictDataUtil("AvailableStatus");
});
const menuTypeOptions = computed(() => {
  return dictDataUtil("MenuType");
});

const formRef = ref<FormInstance>();
const saveMenus = () => submit(formRef.value, addMenuApi, formState.data);

const save = () => {
  return saveMenus();
};

const treeData: TreeProps["treeData"] = reactive({ data: [] }).data;
onBeforeMount(() => {
  getMenuTreeApi().then((res) => {
    treeData.push(...res);
  });
});

defineExpose({ save });
</script>

<style lang="scss" scoped></style>
