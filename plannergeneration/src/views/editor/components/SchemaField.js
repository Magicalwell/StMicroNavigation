import vueProps from './vueProps.js'
import { h } from 'vue'
import { resolveComponent, getUiField } from '../../../utils/vue3transform.js'
import FIELDS_MAP from '../../components/component_map'
export default {
  name: 'SchemaField',
  props: vueProps,
  functional: true,
  setup(props) {
    return () => {
      console.log(props, '-------======================')
      const { editorItem } = { ...props }
      const curProps = { ...props }
      const { field: fieldComponent, fieldProps } = getUiField(
        FIELDS_MAP,
        curProps
      )
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', fieldComponent)
      return h(resolveComponent(fieldComponent), {
        // 这个地方需要捋一下component_map和resolveComponent方法的关系
        modelValue: editorItem.value,
        'onUpdate:modelValue': function updateFileList(val) {
          editorItem.value = val
        }
      })
    }
  }
}
