<template>
  <div>
    <a-form
      :layout="'horizontal'"
      ref="formRef"
      :model="formState.data"
      :label-col="{ style: { width: '100px' } }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item
        label="姓名"
        name="name"
        :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <a-input v-model:value="formState.data.name" />
      </a-form-item>
      <a-form-item
        label="性别"
        name="gender"
        :rules="[{ required: true, message: '请选择性别' }]"
      >
        <a-select
          v-model:value="formState.data.gender"
          :options="genderOptions"
        />
      </a-form-item>
      <a-form-item
        label="昵称"
        name="nickname"
        :rules="[{ required: true, message: '请输入昵称' }]"
      >
        <a-input v-model:value="formState.data.nickname" />
      </a-form-item>
      <a-form-item
        label="手机号"
        name="phone"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <a-input v-model:value="formState.data.phone" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="formState.data.email" />
      </a-form-item>
      <a-form-item label="头像">
        <a-input v-model:value="formState.data.avatar" />
      </a-form-item>
      <a-form-item
        label="用户名"
        v-if="show"
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <a-input v-model:value="formState.data.username" />
      </a-form-item>
      <a-form-item
        label="密码"
        v-if="show"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input v-model:value="formState.data.password" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        v-if="show"
        name="confirmPassword"
        :rules="[{ required: true, message: '请输入确认密码' }]"
      >
        <a-input v-model:value="formState.data.confirmPassword" />
      </a-form-item>

      <a-form-item label="角色">
        <a-select
          v-model:value="formState.data.roles"
          show-search
          mode="multiple"
          placeholder="请选择角色"
          option-label-prop="label"
          :options="rolesOptions.values"
        >
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  defineExpose,
  ref,
  defineProps,
} from "vue";
import type { FormInstance } from "ant-design-vue";
import {
  addAdminUsersApi,
  updateAdminUsersApi,
  getAdminUsersByIdApi,
} from "@/api/admin-user";
import { dictDataUtil } from "@/utils/DictUtil";
import { getAllRolesApi } from "@/api/role";
import { submit, putSubmit } from "@/utils/FormUtil";

const props = defineProps({
  adminUserid: {
    type: String,
    default: "",
  },
});

let formState = reactive({
  data: {
    name: "",
    gender: "",
    nickname: "",
    phone: "",
    email: "",
    avatar: "",
    username: "",
    password: "",
    confirmPassword: "",
    roles: [],
  },
});

const genderOptions = computed(() => {
  return dictDataUtil("Sex");
});

let rolesOptions = reactive([]);
let show = ref<boolean>(false);
onMounted(() => {
  if (props && props.adminUserid) {
    getAdminUsersByIdApi(props.adminUserid).then(
      (res) => (formState.data = res)
    );
  } else {
    show.value = true;
  }

  getAllRolesApi().then((res) => {
    rolesOptions.values = res.map((item: any) => {
      return {
        id: item.id,
        lable: item.name,
        value: item.name,
      };
    });
  });
});

const formRef = ref<FormInstance>();
const addAdminUsers = () =>
  submit(formRef.value, addAdminUsersApi, formState.data);
const updateAdminUsers = () =>
  putSubmit(
    formRef.value,
    updateAdminUsersApi,
    props.adminUserid,
    formState.data
  );

const save = () => {
  if (props && props.adminUserid) {
    return updateAdminUsers();
  } else {
    return addAdminUsers();
  }
};

defineExpose({ save });
</script>

<style lang="scss" scoped></style>
