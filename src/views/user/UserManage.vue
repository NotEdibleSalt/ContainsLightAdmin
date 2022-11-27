<template>
  <Page>
    <template v-slot:query>
      <a-row type="flex" :style="{ width: '100%' }">
        <a-col flex="auto">
          <a-form
            :layout="'inline'"
            :model="formState"
            :label-col="{ style: { width: '100px' } }"
            :wrapper-col="{ span: 20 }"
          >
            <a-form-item label="姓名">
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="用户名">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="手机号">
              <a-input v-model:value="formState.phone" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" @click="query">查询</a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col flex="23px"> </a-col>
      </a-row>
    </template>
    <template v-slot:result>
      <div class="result-button">
        <a-button type="primary" @click="openAddWindow">新增用户</a-button>
      </div>
      <a-table
        :bordered="true"
        :columns="columns"
        :data-source="dataSource.value"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <span>
              <a-tag :color="record.status === 'ENABLE' ? 'geekblue' : 'green'">
                {{ dictDataLable("AvailableStatus", record.status) }}
              </a-tag>
            </span>
          </template>
          <template v-if="column.dataIndex === 'gender'">
            <span> {{ dictDataLable("Sex", record.gender) }} </span>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <div v-if="record.status === 'ENABLE'">
              <a-button
                type="primary"
                :size="'small'"
                @click="openUpdateWindow(record)"
                >编辑</a-button
              >
              <span>&nbsp;</span>
              <a-button
                type="primary"
                danger
                :size="'small'"
                @click="disableAccount(record)"
                >禁用</a-button
              >
            </div>
            <div v-else>
              <a-button
                type="primary"
                :size="'small'"
                @click="enableAccount(record)"
                >启用</a-button
              >
              <span>&nbsp;</span>
              <a-button
                type="primary"
                :size="'small'"
                danger
                @click="delAdminUser(record)"
                >删除</a-button
              >
            </div>
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
      <User ref="userRef" :adminUserid="adminUserid" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import type { TableProps } from "ant-design-vue";
import Page from "@/components/page/Page.vue";
import User from "@/views/user/User.vue";
import {
  GetAdminUsersParamI,
  getAdminUsers,
  delAdminUsersApi,
} from "@/api/admin-user";
import { disableAccountApi, enableAccountApi } from "@/api/account";
import { defaultPageParam } from "@/types/gConfig";

const formState = reactive({ name: "", username: "", phone: "" });
const columns = [
  { dataIndex: "name", title: "姓名", align: "center" },
  { dataIndex: "nickname", title: "昵称", align: "center" },
  { dataIndex: "gender", title: "性别", align: "center" },
  { dataIndex: "username", title: "用户名", align: "center" },
  { dataIndex: "phone", title: "手机号", align: "center" },
  { dataIndex: "email", title: "邮箱", align: "center" },
  { dataIndex: "avatar", title: "头像(相对路径)", align: "center" },
  { dataIndex: "status", title: "账号状态", align: "center" },
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
const query = () => {
  let getAdminUsersParam: GetAdminUsersParamI = {
    ...formState,
    pageSize: pageSize.value,
    pageNumber: current.value,
  };

  getAdminUsers(getAdminUsersParam).then((res) => {
    dataSource.value = res.list;
    total.value = res.total;
  });
};

/**
 * 分页参数发生变化
 */
const handleTableChange: TableProps["onChange"] = (pag: {
  pageSize: number;
  current: number;
}) => {
  current = pag.current;
  pageSize = pag.pageSize;
  query();
};

let saveTitle = ref();
const openAddWindow = () => {
  visible.value = true;
  adminUserid.value = null;
  saveTitle.value = "新增用户";
};

let adminUserid = ref();
const openUpdateWindow = (record: any) => {
  visible.value = true;
  adminUserid.value = record.id;
  saveTitle.value = "更新用户";
};

let userRef = ref();

const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const handleOk = () => {
  confirmLoading.value = true;

  userRef.value
    .save()
    .then(() => {
      visible.value = false;
      confirmLoading.value = false;
      adminUserid.value = null;
      query();
    })
    .catch(() => {
      visible.value = true;
      confirmLoading.value = false;
    });
};

const disableAccount = (record: any) => {
  if (record && record.accountId) {
    disableAccountApi(record.accountId).then(() => {
      query();
    });
  }
};

const enableAccount = (record: any) => {
  if (record && record.accountId) {
    enableAccountApi(record.accountId).then(() => {
      query();
    });
  }
};

const delAdminUser = (record: any) => {
  if (record && record.id) {
    delAdminUsersApi(record.id).then(() => {
      query();
    });
  }
};
</script>

<style lang="scss" scoped></style>
