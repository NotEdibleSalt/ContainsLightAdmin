<template>
  <Page>
    <template v-slot:query>
      <a-row type="flex" :style="{ width: '100%' }">
        <a-col flex="auto">
          <a-form
            :layout="'inline'"
            :model="formState"
            :label-col="{ style: { width: '100px' } }"
            :wrapper-col="{ span: 18 }"
          >
            <a-form-item label="字典名">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="类型">
              <a-input v-model:value="formState.type" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" @click="query(true)">查询</a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col flex="23px"> </a-col>
      </a-row>
    </template>
    <template v-slot:result>
      <div class="result-button">
        <a-button type="primary" @click="openAddWindow">新增字典</a-button>
      </div>
      <a-table
        :bordered="true"
        :columns="columns"
        :data-source="dataSource.value"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'system'">
            <span>
              <a-tag :color="record.system ? 'geekblue' : 'green'">
                {{ record.system ? "是" : "否" }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="primary"
              :size="'small'"
              @click="openUpdateWindow(record)"
              >编辑</a-button
            >
            <span>&nbsp;</span>
            <a-button
              style="background-color: #30f7fb"
              :size="'small'"
              @click="openDictItemeDrawer(record)"
              >字典项</a-button
            >
            <span>&nbsp;</span>
            <a-button
              type="primary"
              :size="'small'"
              danger
              :disabled="record.system"
              @click="delDict(record)"
              >删除</a-button
            >
          </template>
        </template>
      </a-table>
    </template>
  </Page>
  <div>
    <a-modal
      v-model:visible="visible"
      :destroyOnClose="true"
      :title="saveTitle"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <Dict ref="dictRef" :dictId="dictId" />
    </a-modal>
  </div>

  <!-- 字典项 -->
  <div>
    <DictItemManage ref="dictItemManageRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import type { TableProps } from "ant-design-vue";
import Page from "@/components/page/Page.vue";
import Dict from "./Dict.vue";
import DictItemManage from "./item/DictItemManage.vue";
import { getDictsApi, GetDictsParamI, delDictApi } from "@/api/dict";
import { defaultPageParam } from "@/types/gConfig";

const formState = reactive({ name: "", type: "" });
const columns = [
  { dataIndex: "name", title: "  名称", align: "center" },
  { dataIndex: "type", title: "  类型", align: "center" },
  { dataIndex: "remark", title: "  备注", align: "center", ellipsis: true },
  { dataIndex: "system", title: "系统内置", align: "center" },
  { dataIndex: "action", title: "操作", align: "center" },
];

let dataSource = reactive([]);
let current = ref(defaultPageParam.current);
let pageSize = ref(defaultPageParam.pageSize);
let total = ref(defaultPageParam.total);
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));

onMounted(() => query());

/**
 * 查询
 */
const query = (resetPag = false) => {
  if (resetPag) {
    current.value = defaultPageParam.current;
    pageSize.value = defaultPageParam.pageSize;
    total.value = defaultPageParam.total;
  }
  let getDictsParam: GetDictsParamI = {
    ...formState,
    pageSize: pageSize.value,
    pageNumber: current.value,
  };

  getDictsApi(getDictsParam).then((res) => {
    dataSource.value = res.list;
    total.value = res.total;
  });
};

const delDict = (record) => {
  delDictApi(record.id).then(() => {
    query();
  });
};

/**
 * 分页参数发生变化
 */
const handleTableChange: TableProps["onChange"] = (pag) => {
  if (pag.current) {
    current.value = pag.current;
  }
  if (pag.pageSize) {
    pageSize.value = pag.pageSize;
  }
  query();
};

let saveTitle = ref();
let dictId = ref();
const openAddWindow = () => {
  visible.value = true;
  dictId.value = null;
  saveTitle.value = "新增字典";
};
const openUpdateWindow = (record) => {
  visible.value = true;
  dictId.value = record.id;
  saveTitle.value = "修改字典";
};

let dictRef = ref();
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const handleOk = () => {
  confirmLoading.value = true;
  dictRef.value
    .saveDict()
    .then(() => {
      visible.value = false;
      confirmLoading.value = false;
      query();
    })
    .catch(() => {
      visible.value = true;
      confirmLoading.value = false;
    });
};

let dictItemManageRef = ref();
const openDictItemeDrawer = (record) => {
  dictItemManageRef.value.openDictItemeDrawer(record.id);
};
</script>

<style lang="scss" scoped></style>
