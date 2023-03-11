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
            <a-form-item label="名称">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="所属模块">
              <a-select
                :allowClear="true"
                v-model:value="formState.module"
                :options="moduleOptions"
              />
            </a-form-item>
            <a-form-item label="请求方式" name="method">
              <a-select
                :allowClear="true"
                v-model:value="formState.method"
                :options="methodOptions"
              />
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
        <a-button type="primary" @click="openAddWindow">新增权限</a-button>
      </div>
      <a-table
        :bordered="true"
        :columns="columns"
        :data-source="dataSource.value"
        :pagination="pagination"
        @change="handleTableChange"
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
              :disabled="record.system"
              @click="delAuthority(record)"
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
      <Authority ref="authorityRef" :authorityId="authorityId" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive, onBeforeMount } from "vue";
import type { TableProps } from "ant-design-vue";
import Page from "@/components/page/Page.vue";
import Authority from "./Authority.vue";
import {
  GetAuthoritysParamI,
  getAuthoritysApi,
  delAuthorityApi,
  getAuthorityAllModuleApi,
} from "@/api/authority";
import { dictDataUtil } from "@/utils/DictUtil";
import { defaultPageParam } from "@/types/global_config";

const formState = reactive({ name: "", module: "", method: "" });
const columns = [
  { dataIndex: "name", title: "名称", align: "center" },
  { dataIndex: "module", title: "所属模块", align: "center" },
  { dataIndex: "method", title: "请求方式", align: "center" },
  { dataIndex: "url", title: "接口uri", align: "center" },
  { dataIndex: "action", title: "操作", align: "center" },
];

const methodOptions = computed(() => {
  return dictDataUtil("RequestMethod");
});

let moduleData = reactive([]);
const moduleOptions = computed(() => {
  return moduleData.value;
});

let dataSource = reactive([]);
let current = ref(defaultPageParam.current);
let pageSize = ref(defaultPageParam.pageSize);
let total = ref(defaultPageParam.total);
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));

onBeforeMount(() => {
  getAuthorityAllModuleApi().then((res) => {
    moduleData.value = res.map((name: string) => {
      return {
        value: name,
        label: name,
      };
    });
  });
});

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

  let getAuthoritysParam: GetAuthoritysParamI = {
    ...formState,
    pageSize: pageSize.value,
    pageNumber: current.value,
  };

  getAuthoritysApi(getAuthoritysParam).then((res) => {
    dataSource.value = res.list;
    total.value = res.total;
  });
};

const delAuthority = (record: any) => {
  delAuthorityApi(record.id).then(() => {
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
let authorityId = ref();
const openAddWindow = () => {
  visible.value = true;
  authorityId.value = null;
  saveTitle.value = "新增权限";
};
const openUpdateWindow = (record: any) => {
  visible.value = true;
  authorityId.value = record.id;
  saveTitle.value = "修改权限";
};

let authorityRef = ref();
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const handleOk = () => {
  confirmLoading.value = true;
  authorityRef.value
    .saveAuthority()
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
</script>

<style lang="scss" scoped></style>
