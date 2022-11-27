<template>
  <template v-if="routeInfo && routeInfo.children">
    <a-sub-menu :key="routeInfo.path">
      <template #title>
        <span>
          {{ routeInfo.meta?.name }}
        </span>
      </template>
      <div v-for="item in routeInfo.children" :key="item.path">
        <SiderItem :menuInfo="item" />
      </div>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="routeInfo.path">
      <span>{{ routeInfo.meta?.name }}</span>
    </a-menu-item>
  </template>
</template>
<script setup lang="ts">
import { computed, PropType, defineProps } from "vue";
import type { RouteRecordRaw } from "vue-router";

const props = defineProps({
  menuInfo: {
    type: Object as PropType<RouteRecordRaw> | undefined,
    required: true,
  },
});

const routeInfo: RouteRecordRaw = computed(() => props.menuInfo).value;
</script>

<style lang="scss" scope></style>
