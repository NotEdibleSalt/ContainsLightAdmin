<template>
  <div class="header-root">
    <a-dropdown class="dropdown-class">
      <a-avatar
        class="ant-dropdown-link"
        shape="circle"
        @click.prevent
        size="small"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      >
      </a-avatar>
      <template #overlay>
        <a-menu @click="onClick">
          <a-menu-item key="1">个人中心</a-menu-item>
          <a-menu-item key="2">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts">
interface MenuInfo {
  key: string;
  keyPath: string[];
  item: any;
  domEvent: MouseEvent;
}
import { defineComponent } from "vue";
import router from "@/router";
import { removeAllStore } from "@/utils/storage";
export default defineComponent({
  setup() {
    const onClick = ({ key }: MenuInfo) => {
      if (key === "1") {
        router.push("/home");
      } else {
        removeAllStore();
        router.push("/login");
      }
    };
    return {
      onClick,
    };
  },
});
</script>
<style lang="scss" scope>
.header-root {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .dropdown-class {
    margin-right: 20px;
    margin-top: 8px;
  }
}
</style>
