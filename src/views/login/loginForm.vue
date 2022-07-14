<template>
  <div class="login-form" v-show="getState">
    <h2 style="text-align: center; margin: 0 0 10px 0">登录</h2>
    <n-form ref="formRef" :model="formValue" :show-label="false">
      <n-form-item label="姓名" path="userName">
        <n-input v-model:value="formValue.userName" placeholder="输入账号" />
      </n-form-item>
      <n-form-item label="年龄" path="passWord">
        <n-input v-model:value="formValue.passWord" placeholder="输入密码" />
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input
          v-model:value="formValue.authCode"
          placeholder="验证码"
          class="mgr10"
        />
        <span style="white-space: nowrap">验证码:7788</span>
      </n-form-item>
      <div style="display: flex">
        <n-button
          type="info"
          class="login-btn"
          @click="handleLogin"
          :loading="loading"
        >
          登录
        </n-button>
        <n-button
          type="info"
          style="width: 50px"
          @click="setLoginState(LoginStateEnum.REGISTER)"
        >
          注册
        </n-button>
      </div>
    </n-form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, unref, ref } from 'vue'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useLoginState, LoginStateEnum } from './useLogin'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const formValue = reactive({ userName: '', passWord: '', authCode: null })
    const loading = ref(false)
    const userStore = useStore()
    const getState = computed(
      () => unref(getLoginState) === LoginStateEnum.LOGIN
    )
    const { setLoginState, getLoginState } = useLoginState()
    async function handleLogin() {
      //   const data = await validForm()
      const data = formValue
      if (!data) return
      try {
        loading.value = true
        const { userInfo } = await userStore.dispatch('user/login', {
          password: data.userName,
          username: data.passWord,
          authCode: data.authCode
        })
        if (userInfo) {
          //   notification.success({
          //     message: t('sys.login.loginSuccessTitle'),
          //     description: `${t('sys.login.loginSuccessDesc')}: ${
          //       userInfo.realname
          //     }`,
          //     duration: 3
          //   })
        }
      } catch (error) {
        // notification.error({
        //   message: t('sys.api.errorTip'),
        //   description: error.message || t('sys.api.networkExceptionMsg'),
        //   duration: 3
        // })
        loading.value = false

        // handleChangeCheckCode()
      }
    }
    return {
      getLoginState,
      getState,
      formValue,
      setLoginState,
      LoginStateEnum,
      handleLogin,
      loading
    }
  },
  components: { NForm, NFormItem, NInput, NButton }
})
</script>

<style lang="scss" scoped>
@import '/src/styles/default.scss';

.login-form {
  width: 100%;
  max-width: 400px;
  margin: auto;
  .login-btn {
    flex: 1;
    @include mgr10(10px);
  }
}
.mgr10 {
  @include mgr10(10px);
}
</style>
