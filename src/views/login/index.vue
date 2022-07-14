<template>
  <div class="login-box">
    <n-button
      strong
      quaternary
      round
      type="info"
      class="backbtn"
      @click="goback"
    >
      ⬅ 后退
    </n-button>
    <n-grid
      :cols="2"
      item-responsive
      responsive="screen"
      style="height: 100%; margin: 0 auto; max-width: 1400px"
    >
      <n-grid-item span="0 l:1">
        <div class="holder"></div>
      </n-grid-item>
      <n-grid-item span="2 l:1">
        <div class="form-container">
          <LoginForm />
          <RegisterForm />
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { NGrid, NGridItem, NButton } from 'naive-ui'
import LoginForm from './loginForm.vue'
import RegisterForm from './registerForm.vue'
import { useLoginState } from './useLogin'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const formValue = reactive({})
    const router = useRouter()
    const { handleBackLogin } = useLoginState()
    const goback = () => {
      router.go(-1)
    }
    handleBackLogin()
    return { formValue, goback }
  },
  components: { NGrid, NGridItem, NButton, LoginForm, RegisterForm }
})
</script>
<style lang="scss" scoped>
.login-box {
  box-sizing: border-box;
  height: 100vh;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: cornflowerblue, #fff;
}
.holder {
  width: 100%;
  height: 100%;
}
.form-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.backbtn {
  position: absolute;
  top: 1rem;
}
</style>
