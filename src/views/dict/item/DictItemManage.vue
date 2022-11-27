<template>
  <div>
    <a-drawer
      :width="800"
      title="字典项"
      :placement="'right'"
      :visible="drawerVisible"
      @close="onClose"
    >
      <div class="result-button">
        <a-button type="primary" :size="'small'" @click="openAddWindow(record)"
          >新增字典项</a-button
        >
      </div>
      <a-table
        :columns="columns"
        :data-source="dataSource.value"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button
              type="primary"
              :size="'small'"
              @click="openUpdateWindow(record)"
              >编辑</a-button
            >
            <span>&nbsp;</span>
            <a-button
              type="primary"
              :size="'small'"
              danger
              @click="delDictItem(record)"
              >删除</a-button
            >
          </template>
        </template>
      </a-table>
    </a-drawer>
  </div>
  <div>
    <a-modal
      v-model:visible="dictItemViewVisible"
      :destroyOnClose="true"
      :title="saveDictItemTitle"
      :confirm-loading="saveDictItemConfirmLoading"
      @ok="saveDictItemHandleOk"
    >
      <DictItem ref="dictItemRef" :dictId="dictId" :dictItemId="dictItemId" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { defineExpose, reactive, ref } from "vue";
import { getDictItemsByDictIdApi, delDictItemApi } from "@/api/dict";
import DictItem from "./DictItem.vue";

const columns = [
  { dataIndex: "label", title: "标签", align: "center" },
  { dataIndex: "value", title: "值", align: "center" },
  { dataIndex: "description", title: "描述", align: "center", ellipsis: true },
  { dataIndex: "sort", title: "排序(升序)", align: "center" },
  { dataIndex: "action", title: "操作", align: "center" },
];

let dataSource = reactive([]);
let dictId = ref("");
const getDictItems = () => {
  getDictItemsByDictIdApi(dictId.value).then((res) => {
    dataSource.value = res;
    drawerVisible.value = true;
  });
};

const delDictItem = (record) => {
  delDictItemApi(dictId.value, record.id).then(() => {
    getDictItems();
  });
};

const dictItemViewVisible = ref<boolean>(false);
let saveDictItemTitle = ref();
const saveDictItemConfirmLoading = ref<boolean>(false);
let dictItemRef = ref();
let dictItemId = ref();

const drawerVisible = ref<boolean>(false);
const onClose = () => {
  drawerVisible.value = false;
};

const openDictItemeDrawer = (id) => {
  dictId.value = id;
  getDictItems();
};

/**
 * 打开新增字典项页面
 */
const openAddWindow = () => {
  saveDictItemConfirmLoading.value = false;
  saveDictItemTitle.value = "新增字典项";
  dictItemId.value = null;
  dictItemViewVisible.value = true;
};

const openUpdateWindow = (record) => {
  saveDictItemConfirmLoading.value = false;
  saveDictItemTitle.value = "修改字典项";
  dictItemId.value = record.id;
  dictItemViewVisible.value = true;
};

const saveDictItemHandleOk = () => {
  saveDictItemConfirmLoading.value = true;
  dictItemRef.value
    .saveDictItem()
    .then(() => {
      dictItemViewVisible.value = false;
      saveDictItemConfirmLoading.value = false;
      getDictItems();
    })
    .catch(() => {
      dictItemViewVisible.value = false;
      saveDictItemConfirmLoading.value = false;
    });
};

defineExpose({ openDictItemeDrawer });
</script>

<style lang="scss" scoped></style>
