<template>
  <div>
    <a-form
      :layout="'horizontal'"
      ref="formRef"
      :model="formState.data"
      :label-col="{ style: { width: '100px' } }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="类型" name="articleType">
        <a-select
          v-model:value="formState.data.articleType"
          :options="articleTypeOptions"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="简介" name="introduction">
        <a-textarea v-model:value="formState.data.introduction" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, defineExpose, ref, defineProps } from "vue";
import type { FormInstance } from "ant-design-vue";
import { saveArticleTypeAndIntroductionApi } from "@/api/article";
import { dictDataUtil } from "@/utils/DictUtil";
import { putSubmit } from "@/utils/FormUtil";

const props = defineProps({
  articleId: {
    type: String,
    default: "",
  },
});

let formState = reactive({
  data: {
    articleType: "",
    introduction: "",
  },
});

const articleTypeOptions = computed(() => {
  return dictDataUtil("ArticleType");
});

const formRef = ref<FormInstance>();
const updateDict = () =>
  putSubmit(
    formRef.value,
    saveArticleTypeAndIntroductionApi,
    props.articleId,
    formState.data
  );
const save = () => {
  return updateDict();
};

defineExpose({ save });
</script>

<style lang="scss" scoped></style>
