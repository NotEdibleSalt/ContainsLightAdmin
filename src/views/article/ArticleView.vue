<template>
  <div>
    <a-input
      :disabled="true"
      placeholder="请输入标题"
      v-model:value="formState.title"
    />
  </div>
  <div>
    <md-editor
      :preview-only="true"
      :preview-theme="'vuepress'"
      v-model="content"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { getArticleByIdApi } from "@/api/article";
import router from "@/router";

let content = ref("");
const formState = reactive({ title: "", content: "" });

onMounted(() => {
  const articleId = router.currentRoute.value.fullPath.replace("/views/", "");
  getArticleByIdApi(articleId).then((res) => {
    formState.title = res.title;
    content.value = res.content;
  });
});
</script>
