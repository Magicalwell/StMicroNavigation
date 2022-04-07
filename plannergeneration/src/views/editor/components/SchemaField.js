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
      console.log(props)
      const curProps = { ...props }
      const { field: fieldComponent, fieldProps } = getUiField(
        FIELDS_MAP,
        curProps
      )
      console.log(111111, fieldComponent)
      return h(resolveComponent(fieldComponent), {})
    }
  }
}
