<template>
  <div class="sider-title">ContainsLightAdmin</div>
  <a-menu theme="dark" mode="inline" @click="clickMenuItem">
    <SiderItem v-for="route in routes" :menuInfo="route" :key="route.name" />
  </a-menu>
</template>
<script setup lang="ts">
import router from "@/router";
import SiderItem from "./SiderItem.vue";

const routes = router.options.routes
  .find((item) => item.meta?.name && item.name === "Home")
  ?.children;

const clickMenuItem = (menuItem: { key: string }): void => {
  router.push(menuItem.key);
};
</script>

<style lang="scss" scope>
.sider-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #faad14;
}
</style>
