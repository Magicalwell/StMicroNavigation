<template>
  <div class="tool-box">
    <div style="padding: 10px">
      <div
        class="tool-item"
        v-for="(item, index) in defaultComponents"
        :key="index"
        :draggable="true"
        @dragstart="saveDragType(item)"
      >
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
export default defineComponent({
  computed: {
    ...mapState(['defaultComponents'])
  },
  methods: {
    ...mapMutations(['ADD_DARGACTIVEITEM']),
    saveDragType(item) {
      this.ADD_DARGACTIVEITEM({ type: item.component })
    }
  }
})
</script>

<style lang="scss" scoped>
.tool-box {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 2px 0px 12px rgba($color: #000000, $alpha: 0.12);
  width: 260px;
  left: 0;
}
.tool-item {
}
</style>
