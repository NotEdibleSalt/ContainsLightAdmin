<template>
  <div class="login-root">
    <div class="login-form-div">
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState.data"
        v-bind="layout"
        @finish="slidePuzzleVerification"
      >
        <a-form-item
          has-feedback
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input
            v-model:value="formState.data.username"
            type="input"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item
          has-feedback
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input
            v-model:value="formState.data.password"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
          <a-button type="primary" html-type="submit">登录</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
    <SlidePuzzleVerification
      ref="verify"
      @finish="verifyFinsh"
    ></SlidePuzzleVerification>
  </div>
</template>

<script lang="ts">
import SlidePuzzleVerification from "@/components/verify/SlidePuzzleVerification.vue";
import { defineComponent, reactive, ref } from "vue";
import router from "@/router";
import { login } from "@/api/login";
import { setStorage } from "@/utils/storage";
import { message } from "ant-design-vue";

export default defineComponent({
  components: { SlidePuzzleVerification },
  setup() {
    const verify = ref();
    const formRef = ref();
    const formState = reactive({
      data: {
        username: "",
        password: "",
      },
    });

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    // 是否开启滑动验证
    let enableSlideVerify = true;
    const slidePuzzleVerification = () => {
      if (enableSlideVerify) {
        verify.value.openModel();
      } else {
        login(formState.data.username, formState.data.password).then(
          (result: any) => {
            message.success("登录成功", 3);
            setStorage("token", result);
            router.push("/");
          }
        );
      }
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    function verifyFinsh(res: boolean) {
      verify.value.closeModel();
      if (res) {
        login(formState.data.username, formState.data.password).then(
          (result: any) => {
            message.success("登录成功", 3);
            setStorage("token", result);
            router.push("/");
          }
        );
        return;
      }
      throw new Error("验证失败");
    }

    return {
      formState,
      formRef,
      layout,
      slidePuzzleVerification,
      resetForm,
      verify,
      open,
      verifyFinsh,
    };
  },
});
</script>
<style lang="scss">
.login-root {
  width: 100%;
  height: 100vh;
  background: url("~@/assets/login.jpg") no-repeat;
  background-size: 100% 100%;
  .login-form-div {
    width: 30%;
    color: red;
    padding-top: 16%;
    margin: 0 auto;
  }
  .ant-form-item-label > label {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 32px;
    color: #ffffff !important;
    font-size: 14px;
  }
}
</style>
