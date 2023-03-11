<template>
  <Page>
    <template v-slot:query>
      <a-row type="flex" :style="{ width: '100%' }">
        <a-col flex="auto">
          <a-form
            :layout="'inline'"
            :model="formState.data"
            :label-col="{ style: { width: '100px' } }"
            :wrapper-col="{ span: 18 }"
          >
            <a-form-item label="登录账号" name="loginAccount">
              <a-input v-model:value="formState.data.loginAccount" />
            </a-form-item>
            <a-form-item label="登录状态" name="loginStatus">
              <a-select
                :allowClear="true"
                v-model:value="formState.data.loginStatus"
                :options="loginStatusOption"
              />
            </a-form-item>

            <a-form-item label="登录时间" name="loginTime">
              <a-range-picker
                :ranges="ranges"
                v-model:value="formState.data.loginTime"
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
      <a-table
        :bordered="true"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'loginStatus'">
            {{ dictDataLableUtil("loginStatus", record.loginStatus) }}
          </template>
        </template>
      </a-table>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import type { TableProps } from "ant-design-vue";
import Page from "@/components/page/Page.vue";
import dayjs from "dayjs";
import { dictDataLableUtil, dictDataUtil } from "@/utils/DictUtil";
import { GetLoginRecordsParamI, getLoginRecordsApi } from "@/api/loginRecord";
import { defaultPageParam } from "@/types/global_config";

const ranges = {
  今天: [dayjs(), dayjs()],
  本月: [dayjs().startOf("month"), dayjs()],
};
const loginStatusOption = computed(() => {
  return dictDataUtil("loginStatus");
});

const formState = reactive({
  data: { loginAccount: "", loginStatus: "", loginTime: [] },
});

const columns = [
  { dataIndex: "loginName", title: "登录人", align: "center" },
  { dataIndex: "loginAccount", title: "登录账号", align: "center" },
  { dataIndex: "loginTime", title: "登录时间", align: "center" },
  { dataIndex: "loginStatus", title: "登录状态", align: "center" },
];

let dataSource = reactive({ data: [] }).data;
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

  let loginTimeStr = "";
  if (formState.data.loginTime) {
    loginTimeStr = formState.data.loginTime
      .map((item) => item.format("YYYY-MM-DD"))
      .join(",");
  }

  let getDictsParam: GetLoginRecordsParamI = {
    loginAccount: formState.data.loginAccount,
    loginStatus: formState.data.loginStatus,
    loginTime: loginTimeStr,
    pageSize: pageSize.value,
    pageNumber: current.value,
  };

  getLoginRecordsApi(getDictsParam).then((res: any) => {
    dataSource.length = 0;
    dataSource.push(...res.list);
    total.value = res.total;
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
</script>

<style lang="scss" scoped></style>
