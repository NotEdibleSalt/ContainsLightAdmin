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
import { getAuthorityTreeApi } from "@/api/authority";
import {
  saveRoleAssociatedAuthoitysApi,
  getRoleAllAuthoitysApi,
} from "@/api/role";
import { TreeProps } from "ant-design-vue";

const props = defineProps({
  roleId: {
    type: String,
    default: "",
  },
});

let treeData: TreeProps["treeData"] = reactive([]);
let expandedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);
const showLine = ref<boolean>(true);

onBeforeMount(() => {
  getAuthorityTreeApi().then((res) => {
    treeData.value = res;
  });

  getRoleAllAuthoitysApi(props.roleId).then((res) => {
    expandedKeys.value = res;
    checkedKeys.value = res;
  });
});

const save = () => {
  return saveRoleAssociatedAuthoitysApi(props.roleId, {
    authoityIdSet: checkedKeys.value,
  });
};

defineExpose({ save });
</script>
