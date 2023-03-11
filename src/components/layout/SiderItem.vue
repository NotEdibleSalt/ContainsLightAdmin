<template>
  <template v-if="routeInfo && routeInfo.children">
    <a-sub-menu :key="routeInfo.routePath">
      <template #title>
        <span>
          {{ routeInfo.title }}
        </span>
      </template>
      <div v-for="item in routeInfo.children" :key="item.routePath">
        <SiderItem :menuInfo="item" />
      </div>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="routeInfo.routePath">
      <span>{{ routeInfo.title }}</span>
    </a-menu-item>
  </template>
</template>
<script setup lang="ts">
import { IMenuTree } from "@/store/modules/MenuTreeStore";
import { computed, PropType, defineProps } from "vue";

const props = defineProps({
  menuInfo: {
    type: Object as PropType<IMenuTree> | undefined,
    required: true,
  },
});

const routeInfo = computed(() => props.menuInfo).value;
</script>

<style lang="scss" scope></style>
