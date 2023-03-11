<template>
  <Page>
    <template class="page-form" v-slot:query>
      <a-row type="flex" :style="{ width: '100%' }">
        <a-col flex="auto">
          <a-form
            :layout="'inline'"
            :model="formState"
            :label-col="{ style: { width: '100px' } }"
            :wrapper-col="{ span: 20 }"
          >
            <a-form-item label="角色名称">
              <a-input v-model:value="formState.data.name" />
            </a-form-item>
            <a-form-item label="状态">
              <a-select
                :allowClear="true"
                v-model:value="formState.data.status"
                :options="roleStatusOptions"
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
        <a-button type="primary" @click="openAddWindow">新增角色</a-button>
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
          <template v-else-if="column.dataIndex === 'associatedAuthoity'">
            <div>
              <a-space width="100%">
                <a-button
                  class="associated-menu-button"
                  type="primary"
                  :size="'small'"
                  @click="openAssociatedMenuWindow(record)"
                  >关联菜单</a-button
                >
                <a-button
                  type="primary"
                  :size="'small'"
                  @click="openAssociatedAuthoityWindow(record)"
                  >关联权限</a-button
                >
              </a-space>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <div v-if="record.status === 'ENABLE'">
              <a-button
                type="primary"
                danger
                :size="'small'"
                @click="disableRole(record)"
                >禁用</a-button
              >
            </div>
            <div v-else>
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
                @click="enableRole(record)"
                >启用</a-button
              >
              <span>&nbsp;</span>
              <a-button
                type="primary"
                :size="'small'"
                danger
                @click="delRole(record)"
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
      <Role ref="userRef" :roleId="roleId" />
    </a-modal>
  </div>
  <div>
    <a-modal
      v-model:visible="associatedMenuVisible"
      :destroyOnClose="true"
      :title="associatedMenuTitle"
      :confirm-loading="confirmLoading"
      @ok="associatedMenuHandleOk"
    >
      <AssociatedMenu ref="associatedMenuRef" :roleId="roleId" />
    </a-modal>
  </div>
  <div>
    <a-modal
      v-model:visible="associatedAuthoityvisible"
      :destroyOnClose="true"
      :title="associatedAuthoityTitle"
      :confirm-loading="confirmLoading"
      @ok="associatedAuthoityHandleOk"
    >
      <AssociatedAuthoity ref="associatedAuthoityRef" :roleId="roleId" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from "vue";
import type { TableProps } from "ant-design-vue";
import Page from "@/components/page/Page.vue";
import Role from "./Role.vue";
import AssociatedAuthoity from "./AssociatedAuthoity.vue";
import AssociatedMenu from "./AssociatedMenu.vue";
import {
  GetRolesParamI,
  getRolesApi,
  delRoleApi,
  disableRoleApi,
  enableRoleApi,
} from "@/api/role";
import { dictDataUtil } from "@/utils/DictUtil";
import { defaultPageParam } from "@/types/global_config";

const formState = reactive({
  data: { name: "", status: "" },
});
const columns = [
  { dataIndex: "name", title: "角色名称", align: "center" },
  { dataIndex: "description", title: "角色描述", align: "center" },
  { dataIndex: "status", title: "状态", align: "center" },
  { dataIndex: "associatedAuthoity", title: "关联权限", align: "center" },
  { dataIndex: "action", title: "操作", align: "center" },
];

const roleStatusOptions = computed(() => {
  return dictDataUtil("AvailableStatus");
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
  let getRolesParamI: GetRolesParamI = {
    ...formState.data,
    pageSize: pageSize.value,
    pageNumber: current.value,
  };

  getRolesApi(getRolesParamI).then((res) => {
    dataSource.value = res.list;
    total.value = res.total;
  });
};

const disableRole = (record) => {
  if (record && record.id) {
    disableRoleApi(record.id).then(() => {
      query();
    });
  }
};

const enableRole = (record) => {
  if (record && record.id) {
    enableRoleApi(record.id).then(() => {
      query();
    });
  }
};

const delRole = (record) => {
  if (record && record.id) {
    delRoleApi(record.id).then(() => {
      query();
    });
  }
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
const openAddWindow = () => {
  visible.value = true;
  roleId.value = "";
  saveTitle.value = "新增角色";
};

let roleId = ref("");
const openUpdateWindow = (record) => {
  visible.value = true;
  roleId.value = record.id;
  saveTitle.value = "更新角色";
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
      roleId.value = "";
      query();
    })
    .catch(() => {
      visible.value = true;
      confirmLoading.value = false;
    });
};

const associatedMenuTitle = ref("关联菜单");
const associatedMenuVisible = ref<boolean>(false);

/**
 * 打开关联权限页面
 * @param record
 */
const openAssociatedMenuWindow = (record) => {
  associatedMenuVisible.value = true;
  roleId.value = record.id;
};

const associatedMenuRef = ref();
const associatedMenuHandleOk = () => {
  confirmLoading.value = true;

  associatedMenuRef.value
    .save()
    .then(() => {
      associatedMenuVisible.value = false;
      confirmLoading.value = false;
      query();
    })
    .catch(() => {
      associatedMenuVisible.value = true;
      confirmLoading.value = false;
    });

  roleId.value = "";
};

const associatedAuthoityTitle = ref("关联权限");
const associatedAuthoityvisible = ref<boolean>(false);

/**
 * 打开关联权限页面
 * @param record
 */
const openAssociatedAuthoityWindow = (record) => {
  associatedAuthoityvisible.value = true;
  roleId.value = record.id;
};

const associatedAuthoityRef = ref();
const associatedAuthoityHandleOk = () => {
  confirmLoading.value = true;

  associatedAuthoityRef.value
    .save()
    .then(() => {
      associatedAuthoityvisible.value = false;
      confirmLoading.value = false;
      query();
    })
    .catch(() => {
      associatedAuthoityvisible.value = true;
      confirmLoading.value = false;
    });

  roleId.value = "";
};
</script>

<style lang="scss" scoped>
.associated-menu-button {
  color: #fff;
  background: #f18818;
  border-color: #f18818;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}
</style>
