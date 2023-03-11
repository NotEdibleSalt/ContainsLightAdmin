<template>
  <div class="article-root">
    <div>
      <div class="title-div">
        <a-input
          class="title-input"
          :disabled="true"
          v-model:value="formState.title"
        />
      </div>
      <div>
        <div id="vditor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import router from "@/router";
import { getArticleByIdApi } from "@/api/article";

const formState = reactive({ title: "", content: "" });

const vditor = ref<Vditor>();
onMounted(async () => {
  const articleId = router.currentRoute.value.fullPath.replace("/views/", "");
  const res = await getArticleByIdApi(articleId);
  formState.title = res.title;
  formState.content = res.content;

  vditor.value = new Vditor("vditor", {
    minHeight: 850,
    counter: {
      enable: true,
    },
    toolbar: [],
    toolbarConfig: {
      hide: true,
    },
    preview: {
      hljs: {
        enable: true,
        lineNumber: true,
        style: "github",
      },
      markdown: {
        autoSpace: true,
        paragraphBeginningSpace: true,
      },
      theme: {
        current: "ant-design",
      },
      math: {
        inlineDigit: true,
      },
    },
    after: () => {
      vditor.value!.setValue(formState.content);
      vditor.value!.disabled();
    },
  });
});
</script>

<style lang="scss" scope>
.article-root {
  width: 60%;
  margin: 0 auto;

  .title-div {
    height: 5rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 100;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    .title-input {
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      outline: none;
    }
  }
}
</style>
