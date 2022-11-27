<template>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    v-model:checkedKeys="checkedKeys"
    checkable
    :tree-data="treeData.value"
    :show-line="showLine"
    :autoExpandParent="true"
    :show-icon="false"
  >
    <template #title="{ title }">
      <span>{{ title }}</span>
    </template>
  </a-tree>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeMount, defineProps, defineExpose } from "vue";
import { saveRoleAssociatedMenusApi, getRoleAllMenusApi } from "@/api/role";
import { TreeProps } from "ant-design-vue";
import { getMenuTreeApi } from "@/api/menu";

const props = defineProps({
  roleId: {
    type: String,
    default: "",
  },
});

const treeData: TreeProps["treeData"] = reactive([]);
let expandedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);
const showLine = ref<boolean>(true);

onBeforeMount(() => {
  getMenuTreeApi().then((res) => {
    treeData.value = res;
  });

  getRoleAllMenusApi(props.roleId).then((res) => {
    expandedKeys.value = res;
    checkedKeys.value = res;
  });
});

const save = () => {
  return saveRoleAssociatedMenusApi(props.roleId, {
    menuIdSet: checkedKeys.value,
  });
};

defineExpose({ save });
</script>
