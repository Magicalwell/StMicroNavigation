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
      const curProps = { ...props }
      console.log(curProps, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      const { field: fieldComponent, fieldProps } = getUiField(
        FIELDS_MAP,
        curProps
      )
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', fieldProps)
      return h(resolveComponent(fieldComponent), {
        // 这个地方需要捋一下component_map和resolveComponent方法的关系
        ...fieldProps,
        ...curProps
      })
    }
  }
}
