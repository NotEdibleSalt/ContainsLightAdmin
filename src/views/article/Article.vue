<template>
  <div>
    <a-input placeholder="请输入标题" v-model:value="formState.title" />
  </div>
  <div>
    <md-editor
      v-model="content"
      :preview-theme="'vuepress'"
      @onSave="openSaveArticleWindow"
    />
  </div>
  <div>
    <a-modal
      v-model:visible="visible"
      :destroyOnClose="true"
      :title="saveTitle"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <SaveArticle ref="saveArticlerRef" :articleId="articleId" />
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { watch, ref, onMounted, reactive } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import SaveArticle from "./SaveArticle.vue";
import {
  addArticleApi,
  updateArticleApi,
  getArticleByIdApi,
} from "@/api/article";
import router from "@/router";

let content = ref("");
const formState = reactive({ title: "", content: "" });

let articleId = ref("");
let isCreate: boolean;
/**
 * 监听文章内容改变，如果改变则保存最新的
 */
watch([() => formState.title, content], ([newTitle, newContent]) => {
  formState.title = newTitle;
  formState.content = newContent;
  if (router.currentRoute.value.fullPath === "/articles/new" && isCreate) {
    // 防止多次请求创建新文章
    isCreate = false;
    addArticleApi(formState)
      .then((res) => {
        articleId.value = res.id;
        router.push("/articles/" + articleId.value);
      })
      .catch(() => {
        isCreate = true;
      });
  } else {
    if (articleId.value && articleId.value !== "") {
      updateArticleApi(articleId.value, formState);
    }
  }
});

let saveArticlerRef = ref();
const visible = ref<boolean>(false);
let saveTitle = ref();
const openSaveArticleWindow = () => {
  visible.value = true;
  saveTitle.value = "保存文章";
};

const confirmLoading = ref<boolean>(false);
const handleOk = () => {
  confirmLoading.value = true;

  saveArticlerRef.value
    .save()
    .then(() => {
      visible.value = false;
      confirmLoading.value = false;

      router.push("/views/" + articleId.value);
    })
    .catch(() => {
      visible.value = true;
      confirmLoading.value = false;
    });
};

onMounted(() => {
  if (router.currentRoute.value.fullPath !== "/articles/new") {
    articleId.value = router.currentRoute.value.fullPath.replace(
      "/articles/",
      ""
    );
    isCreate = false;

    getArticleByIdApi(articleId.value).then((res) => {
      formState.title = res.title;
      content.value = res.content;
    });
  } else {
    isCreate = true;
  }
});
</script>
