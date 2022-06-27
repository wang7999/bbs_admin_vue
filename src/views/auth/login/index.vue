<template>
  <div class="login-container">
    <video
      poster="@/assets/images/login/video-cover.jpeg"
      loop
      autoplay
      muted
    >
      <source src="@/assets/images/login/night.mp4" />
    </video>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          系统登录
        </h3>
        <!-- <LangSelect :isWhite="true" class="set-language" /> -->
      </div>

      <el-form-item prop="account">
        <el-input
          ref="userNameRef"
          v-model="loginForm.account"
          placeholder="请输入账号"
          name="account"
          type="text"
          tabindex="1"
          autocomplete="on"
          size="large"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><i-ep-user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          :key="passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          size="large"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><i-ep-lock /></el-icon>
          </template>
          <template #suffix>
            <el-icon
              class="el-input__icon"
              @click="showPwd"
            >
              <i-ep-hide v-if="passwordType === 'password'" />
              <i-ep-view v-else />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        size="large"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>

    </el-form>

    <!-- <el-dialog :title="t('login.thirdparty')" v-model="showDialog">
      {{ t("login.thirdpartyTips") }}
      <br />
      <br />
      <br />
      <SocialSign />
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const loginFormRef = ref<FormInstance>(null)
const passwordType = ref('password')
const loading = ref(false)
const store = useStore()
const router = useRouter()

const loginForm = reactive({
  account: '',
  password: '',
  type: 2
})
const loginRules = reactive<FormRules>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
const handleLogin = () => {
  loginFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      store.dispatch('login', loginForm).then(() => {
        console.log('then')
        router.push('/')
      }).finally(() => {
        loading.value = false
      }).catch(() => {
        console.log('catch')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  video {
    position: absolute;
    /* Vertical and Horizontal center*/
    top: 0; left: 0; right: 0; bottom: 0;
    width:100%;
    height:100%;
    object-fit: cover;
    z-index: -1;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 22px;
      color: #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    // color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
