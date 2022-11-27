<template>
  <a-layout class="layout-class">
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <Sider />
    </a-layout-sider>

    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <Header />
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div class="content-div-class">
          <Content />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">{{ date() }}</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Sider from "@/components/layout/Sider.vue";
import Header from "@/components/layout/Header.vue";
import Content from "./Content.vue";
export default defineComponent({
  components: {
    Sider,
    Header,
    Content,
  },
  setup() {
    const date = (): string => {
      const date = new Date();
      let month: string | number = date.getMonth() + 1;
      let strDate: string | number = date.getDate();

      if (month <= 9) {
        month = "0" + month;
      }
      if (strDate <= 9) {
        strDate = "0" + strDate;
      }

      // eslint-disable-next-line
      return date.getFullYear() + "-" + month + "-" + strDate;
    };

    return {
      date,
    };
  },
});
</script>
<style lang="scss" scope>
@import "@/styles/globle.scss";
.layout-class {
  height: 100vh;

  .ant-layout-header {
    height: 40px;
    padding: 0 50px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 40px;
    background: #001529;
  }
  .content-div-class {
    background: #fff;
    height: 89vh;
    min-height: 500px;
  }
}

.ant-layout-footer {
  padding: 0px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  background: $globle-background-color;
}
</style>
