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
            <a-form-item label="类型">
              <a-select
                :allowClear="true"
                v-model:value="formState.articleType"
                :options="articleTypeOptions"
              />
            </a-form-item>
            <a-form-item label="状态">
              <a-select
                :allowClear="true"
                v-model:value="formState.articleStatus"
                :options="articleStatusOptions"
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
        <a-button type="primary" @click="openAddWindow">新增文章</a-button>
      </div>
      <a-table
        :bordered="true"
        :columns="columns"
        :data-source="dataSource.value"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'articleType'">
            <span>
              {{ dictDataLable("ArticleType", record.articleType) }}
            </span>
          </template>
          <template v-if="column.dataIndex === 'articleStatus'">
            <span>
              {{ dictDataLable("ArticleStatus", record.articleStatus) }}
            </span>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button
              type="primary"
              :size="'small'"
              v-if="
                record.articleStatus === 'DRAFT' ||
                record.articleStatus === 'LOWER_SHELF'
              "
              @click="openUpdateWindow(record)"
              >编辑</a-button
            >
            <span>&nbsp;</span>
            <a-button
              type="primary"
              :size="'small'"
              v-if="
                record.articleStatus === 'DRAFT' ||
                record.articleStatus === 'LOWER_SHELF'
              "
              @click="viewArticle(record)"
              >预览</a-button
            >
            <span>&nbsp;</span>
            <a-button
              style="background-color: #30f7fb"
              :size="'small'"
              v-if="
                record.articleStatus === 'DRAFT' ||
                record.articleStatus === 'LOWER_SHELF'
              "
              @click="publishArticle(record)"
              >发布</a-button
            >
            <span>&nbsp;</span>
            <a-button
              style="background-color: #30f7fb"
              :size="'small'"
              v-if="record.articleStatus === 'PUBLISHING'"
              @click="lowerShelfArticle(record)"
              >下架</a-button
            >
            <span>&nbsp;</span>
            <a-button
              type="primary"
              :size="'small'"
              v-if="
                record.articleStatus === 'DRAFT' ||
                record.articleStatus === 'LOWER_SHELF'
              "
              danger
              @click="delArticle(record)"
              >删除</a-button
            >
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
import router from "@/router";
import { dictDataUtil } from "@/utils/DictUtil";
import {
  getArticlesApi,
  GetArticlesParamI,
  publishArticleApi,
  lowerShelfArticleApi,
  delArticleApi,
} from "@/api/article";
import { defaultPageParam } from "@/types/gConfig";

const formState = reactive({ author: "", articleType: "", articleStatus: "" });
const columns = [
  { dataIndex: "title", title: "  标题", align: "center" },
  { dataIndex: "articleType", title: "类型", align: "center" },
  { dataIndex: "articleStatus", title: "状态", align: "center" },
  { dataIndex: "introduction", title: "简介", align: "center", ellipsis: true },
  { dataIndex: "createAt", title: "创建时间", align: "center" },
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
  let getArticlesParam: GetArticlesParamI = {
    ...formState,
    pageSize: pageSize.value,
    pageNumber: current.value,
  };

  getArticlesApi(getArticlesParam).then((res) => {
    dataSource.value = res.list;
    total.value = res.total;
  });
};

const publishArticle = (record: any) => {
  publishArticleApi(record.id).then(() => {
    query();
  });
};

const lowerShelfArticle = (record: any) => {
  lowerShelfArticleApi(record.id).then(() => {
    query();
  });
};

const delArticle = (record: any) => {
  delArticleApi(record.id).then(() => {
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

const openAddWindow = () => {
  let routeUrl = router.resolve({
    path: "/articles/new",
  });
  window.open(routeUrl.href, "_blank");
};

const openUpdateWindow = (record: any) => {
  let routeUrl = router.resolve({
    path: "/articles/" + record.id,
  });
  window.open(routeUrl.href, "_blank");
};

const viewArticle = (record: any) => {
  let routeUrl = router.resolve({
    path: "/views/" + record.id,
  });
  window.open(routeUrl.href, "_blank");
};

const articleStatusOptions = computed(() => {
  return dictDataUtil("ArticleStatus");
});
const articleTypeOptions = computed(() => {
  return dictDataUtil("ArticleType");
});
</script>

<style lang="scss" scoped></style>
