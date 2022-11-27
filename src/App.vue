<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
const locale = zhCN;
</script>

<style lang="scss">
@import "@/styles/globle.scss";
.ant-form-item-label > label {
  color: $ant-form-item-label-color !important;
}
</style>
