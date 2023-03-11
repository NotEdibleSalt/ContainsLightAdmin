<template>
  <div class="article-root">
    <div>
      <div class="title-div">
        <div class="left-box"></div>
        <a-input
          class="title-input"
          placeholder="请输入标题"
          v-model:value="formState.title"
        />
        <div class="right-box">
          <div class="status-text status-text with-padding">内容将自动保存</div>
          <a-button
            type="primary"
            class="xitu-btn btn-drafts with-padding xitu-btn-outline"
            @click="openSaveArticleWindow"
            >发布</a-button
          >
        </div>
      </div>
      <div>
        <div id="vditor" />
      </div>
    </div>
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
import { ref, onMounted, reactive, watch } from "vue";
import Vditor from "vditor";
import SaveArticle from "./SaveArticle.vue";
import "vditor/dist/index.css";
import router from "@/router";
import {
  addArticleApi,
  getArticleByIdApi,
  updateArticleApi,
} from "@/api/article";

const formState = reactive({ title: "", content: "" });
let articleId = ref("");
let isCreate: boolean;

/**
 * 监听文章内容改变，如果改变则保存最新的
 */
watch(
  [() => formState.title, () => formState.content],
  ([newTitle, newContent]) => {
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
  }
);

let saveArticlerRef = ref();
const visible = ref<boolean>(false);
let saveTitle = ref("发布文章");
const openSaveArticleWindow = () => {
  visible.value = true;
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

const vditor = ref<Vditor>();
onMounted(async () => {
  if (router.currentRoute.value.fullPath !== "/articles/new") {
    articleId.value = router.currentRoute.value.fullPath.replace(
      "/articles/",
      ""
    );
    isCreate = false;

    const res = await getArticleByIdApi(articleId.value);
    formState.title = res.title;
    formState.content = res.content;
  } else {
    isCreate = true;
  }

  vditor.value = new Vditor("vditor", {
    minHeight: 850,
    counter: {
      enable: true,
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
    },
    input: (md: string) => {
      formState.content = md;
    },
  });
});
</script>

<style lang="scss" scope>
.article-root {
  width: 60%;
  margin: 0 auto;

  .title-div {
    padding: 0 10px 0 15px;
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

    .left-box {
      padding-right: 14px;
      cursor: pointer;
    }

    .title-input {
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      outline: none;
      width: 80%;
    }

    .right-box {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;

      .status-text {
        font-size: 14px;
        white-space: nowrap;
        color: #c9cdd4;
        cursor: default;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .with-padding {
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
}
</style>
