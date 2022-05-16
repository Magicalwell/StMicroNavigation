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
      <a-button type="dashed">Dashed Button</a-button>
      <a-button type="dashed">Dashed Button</a-button>
      <a-button type="dashed">Dashed Button</a-button>
      <a-button type="dashed">Dashed Button</a-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Home',
  components: {
    MailOutlined,
    AppstoreOutlined
  },
  setup() {
    const current = ref(['notes'])
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
