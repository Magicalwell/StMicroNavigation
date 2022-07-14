<template>
  <div class="register-form" v-show="getState">注册</div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, unref } from 'vue'
// import { NForm, NFormItem, NInput } from 'naive-ui'
import { useLoginState, LoginStateEnum } from './useLogin'
export default defineComponent({
  setup() {
    const formValue = reactive({})
    const getState = computed(
      () => unref(getLoginState) === LoginStateEnum.REGISTER
    )
    const { setLoginState, getLoginState } = useLoginState()
    return { getLoginState, getState }
  }
})
</script>
