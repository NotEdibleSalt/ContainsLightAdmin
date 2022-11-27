<template>
  <div class="menu-root-div">
    <a-row type="flex">
      <a-col flex="450px">
        <div class="button-div">
          <a-button type="primary" @click="openAddWindow">新增菜单</a-button>
        </div>
        <div>
          <a-input-search
            v-model:value="searchValue"
            style="margin-bottom: 8px"
            placeholder="Search"
          />
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:checkedKeys="checkedKeys"
            :checkable="false"
            :tree-data="treeData.value"
            :show-line="showLine"
            :defaultExpandAll="true"
            :autoExpandParent="true"
            :show-icon="false"
            @select="clickTreeNode"
          >
            <template #title="{ title }">
              <span v-if="title.indexOf(searchValue) > -1">
                {{ title.substr(0, title.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{
                  title.substr(title.indexOf(searchValue) + searchValue.length)
                }}
              </span>
              <span v-else>{{ title }}</span>
            </template>
          </a-tree>
        </div>
      </a-col>
      <a-col flex="auto">
        <div class="form-div">
          <a-form
            :layout="'horizontal'"
            ref="formRef"
            :model="formState.data"
            :label-col="{ style: { width: '100px' } }"
            :wrapper-col="{ span: 18 }"
          >
            <a-form-item label="id" v-show="false" name="id">
              <a-input :disabled="true" v-model:value="formState.data.id" />
            </a-form-item>
            <a-form-item
              label="菜单类型"
              placeholder="请选择菜单类型"
              name="type"
              :rules="[{ required: true, message: '请选择菜单类型' }]"
            >
              <a-select
                :disabled="true"
                :allowClear="true"
                v-model:value="formState.data.type"
                :options="menuTypeOptions"
              />
            </a-form-item>

            <a-form-item
              label="上级菜单"
              name="parentId"
              v-if="formState.data.type !== 'TopMenu'"
            >
              <a-tree-select
                v-model:value="formState.data.parentId"
                placeholder="请选择上级菜单"
                :tree-line="true"
                :tree-data="treeData.value"
              >
                <template #title="{ title }">
                  {{ title }}
                </template>
              </a-tree-select>
            </a-form-item>

            <a-form-item
              label="菜单名"
              placeholder="请输入菜单名"
              name="name"
              :rules="[{ required: true, message: '请输入菜单名' }]"
            >
              <a-input v-model:value="formState.data.name" />
            </a-form-item>
            <a-form-item
              label="菜单路径"
              placeholder="请输入菜单路径"
              name="path"
              :rules="[{ required: true, message: '请输入菜单路径' }]"
            >
              <a-input v-model:value="formState.data.path" />
            </a-form-item>

            <a-form-item
              label="路由名"
              placeholder="请输入路由名"
              name="routeName"
              :rules="[{ required: true, message: '请输入路由名' }]"
            >
              <a-input v-model:value="formState.data.routeName" />
            </a-form-item>

            <a-form-item
              label="路由路径"
              placeholder="请输入路由路径"
              name="routePath"
              :rules="[{ required: true, message: '请输入路由路径' }]"
            >
              <a-input v-model:value="formState.data.routePath" />
            </a-form-item>

            <a-form-item
              label="描述"
              placeholder="请输入描述信息"
              name="description"
            >
              <a-input v-model:value="formState.data.description" />
            </a-form-item>
            <a-form-item
              label="排序号"
              placeholder="请输入排序号"
              name="sortNumber"
            >
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
              placeholder="请选择菜单可用状态"
              name="status"
              :rules="[{ required: true, message: '请选择菜单可用状态' }]"
            >
              <a-select
                :allowClear="true"
                v-model:value="formState.data.status"
                :options="statusOptions"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 9 }">
              <a-space width="100%">
                <a-button type="primary" @click="updateMenu">保存</a-button>
                <a-popconfirm
                  title="确实是否删除所选菜单？"
                  ok-text="继续删除"
                  cancel-text="放弃删除"
                  @confirm="confirm"
                >
                  <a-button danger>删除</a-button>
                </a-popconfirm>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>

  <div>
    <a-modal
      v-model:visible="visible"
      :destroyOnClose="true"
      :title="'新增菜单'"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <Menu ref="menuRef"></Menu>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onBeforeMount, watch } from "vue";
import { TreeProps } from "ant-design-vue";
import Menu from "./Menu.vue";
import {
  getMenuByIdApi,
  getMenuTreeApi,
  updateMenuApi,
  delMenuApi,
} from "@/api/menu";
import { dictDataUtil } from "@/utils/DictUtil";
import type { FormInstance } from "ant-design-vue";

const formState = reactive({
  data: {
    id: "",
    parentId: "",
    type: "",
    name: "",
    path: "",
    routeName: "",
    routePath: "",
    description: "",
    sortNumber: "",
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

const treeData: TreeProps["treeData"] = reactive([]);
const expandedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);
const showLine = ref<boolean>(true);

const searchValue = ref<string>("");
watch(searchValue, (value) => {
  if (value && treeData) {
    expandedKeys.value = [];

    for (const item of treeData.value) {
      if (item.title.includes(value)) {
        expandedKeys.value.push(item.key);
      }

      if (item.children) {
        for (const item1 of item.children) {
          if (item1.title.includes(value)) {
            expandedKeys.value.push(item1.key);
          }

          if (item1.children) {
            for (const item2 of item1.children) {
              if (item2.title.includes(value)) {
                expandedKeys.value.push(item2.key);
              }
            }
          }
        }
      }
    }
  }
});

const clickTreeNode = (selectedKeys: string[]) => {
  getMenuByIdApi(selectedKeys[0]).then((res) => {
    formState.data = res;
  });
};

/**
 * 更新菜单
 */
const updateMenu = () => {
  updateMenuApi(formState.data.id, formState.data).then(() => {
    getTreeData();
  });
};

const visible = ref<boolean>(false);
const openAddWindow = () => {
  visible.value = true;
};

const menuRef = ref();
const confirmLoading = ref<boolean>(false);
const handleOk = () => {
  confirmLoading.value = true;

  menuRef.value
    .save()
    .then(() => {
      visible.value = false;
      confirmLoading.value = false;
      getTreeData();
    })
    .catch(() => {
      visible.value = true;
      confirmLoading.value = false;
    });
};

const getTreeData = () => {
  getMenuTreeApi().then((res) => {
    treeData.value = res;
  });
};

onBeforeMount(() => {
  getTreeData();
});

const confirm = () => {
  delMenuApi(formState.data.id).then(() => {
    getTreeData();
    formState.data = {};
  });
};
</script>

<style lang="scss" scoped>
.menu-root-div {
  padding: 20px 30px 30px 30px;

  .button-div {
    margin: 0px 0px 20px 20px;
    display: flex;
    justify-content: right;
  }

  .form-div {
    margin: 52px 0px 20px 20px;
    width: 80%;
  }
}
</style>
