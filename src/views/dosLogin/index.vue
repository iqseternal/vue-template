<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import { type FormInstance, FormRules } from "element-plus"
import { getLoginCodeApi, type LoginApiData } from "@/api/login"
import { ElForm, ElFormItem, ElInput, ElImage, ElIcon, ElButton } from 'element-plus';
import { DASHBOARD_PATH, RECEPTION_PATH } from '@router/constant';

const router = useRouter();
const loginFormRef = ref<FormInstance | null>(null);

/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
const codeUrl = ref("")
/** 登录表单数据 */
const loginForm: LoginApiData = reactive({
  username: "admin",
  password: "12345678",
  code: ""
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean): boolean | void => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login({
          username: loginForm.username,
          password: loginForm.password,
          code: loginForm.code
        })
        .then(() => {
          router.replace(DASHBOARD_PATH);
        })
        .catch(() => {
          createCode()
          loginForm.password = ""
        })
        .finally(() => {
          loading.value = false;
        })
    } else {
      return false
    }
  })
}
/** 创建验证码 */
const createCode = () => {
  // 先清空验证码的输入
  loginForm.code = ""
  // 获取验证码
  codeUrl.value = ""
  getLoginCodeApi().then((res) => {
    codeUrl.value = res.data;
  })
}

/** 初始化验证码 */
createCode();
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layout/logo-text-2.png" />
      </div>

      <div class="content">
        <ElForm ref="loginFormRef" :model="loginForm" :rules="loginFormRules" @keyup.enter="handleLogin">
          <ElFormItem prop="username">
            <ElInput
              v-model.trim="loginForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model.trim="loginForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </ElFormItem>
          <ElFormItem prop="code">
            <ElInput
              v-model.trim="loginForm.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <ElImage :src="codeUrl" @click="createCode" draggable="false">
                  <template #placeholder>
                    <ElIcon><Picture /></ElIcon>
                  </template>
                  <template #error>
                    <ElIcon><Loading /></ElIcon>
                  </template>
                </ElImage>
              </template>
            </ElInput>
          </ElFormItem>
          <ElButton :loading="loading" type="primary" size="large" @click.prevent="handleLogin"> 登 录 </ElButton>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 400px;
  // min-height: 100%;
  height: 100vh;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
