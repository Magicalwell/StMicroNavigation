<template>
  <table border="1" class="table-widgets-box">
    <colgroup>
      <col span="1" @click="testalr" />
      <col span="1" />
    </colgroup>
    <tr v-for="(out, index) in selfData.children" :key="index">
      <div class="row-line"></div>
      <th v-for="(inner, index1) in out.children" :key="index1" class="cell">
        <div class="col-line" v-if="index1 !== out.children.length - 1" @mouseenter="addClass"></div>
        <text-widget />
      </th>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import TextWidget from './textwidge.vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  name: 'st-table',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    TextWidget
  },
  setup(props) {
    const { editorItem: selfData } = toRefs(props)
    function testalr() {
      console.log('asgdsgdsgfh')
    }
    return { selfData, testalr }
  }
})
</script>

<style lang="scss" scoped>
.table-widgets-box {
  position: relative;
}
.row-line {
  height: 3px;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: blueviolet;
}
.cell {
  position: relative;
}
.col-line {
  width: 3px;
  height: 100%;
  position: absolute;
  right: -1px;
  background-color: chartreuse;
}
</style>
