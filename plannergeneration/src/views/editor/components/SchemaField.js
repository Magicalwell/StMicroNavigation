import vueProps from './vueProps.js'
import { h } from 'vue'
export default {
  name: 'SchemaField',
  props: vueProps,
  functional: true,
  render(props) {
    console.log(111111, props.editorItem)
    return h('span', null, '123')
  }
}
