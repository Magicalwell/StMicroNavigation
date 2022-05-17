<template>
  <div class="generation-head">
    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      @click="handleClick"
    >
      <a-menu-item key="notes">
        <template #icon>
          <mail-outlined />
        </template>
        <router-link to="/Home/notes">三石笔记</router-link>
      </a-menu-item>
      <a-menu-item key="planner">
        <template #icon>
          <appstore-outlined />
        </template>
        <router-link to="/Home/planner">手账生成器</router-link>
      </a-menu-item>
    </a-menu>
    <div>
      <span style="margin-right: 24px">
        <a-badge :count="1">
          <a-avatar shape="square">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </a-badge>
      </span>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  MailOutlined,
  AppstoreOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Home',
  components: {
    MailOutlined,
    AppstoreOutlined,
    UserOutlined
  },
  setup() {
    const current = ref(['notes'])
    const router = useRouter()
    watch(
      () => router.currentRoute.value.name,
      (newValue, oldValue) => {
        console.log('watch', newValue)
        current.value = [newValue]
      },
      { immediate: true }
    )

    function handleClick({ item, key, keyPath }) {
      console.log(item, key, keyPath)
    }
    return {
      current,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.generation-head {
  width: 100%;
  height: 50px;
  padding: 0 2% 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px rgba($color: #000000, $alpha: 0.2);
}
</style>
