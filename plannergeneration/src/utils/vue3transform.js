import { defineComponent, h, resolveComponent as _resolveComponent } from 'vue'

// 内部使用 . ，配置数据key不能出现.
const pathSeparator = '.'

// 删除当前path值
export function deletePathVal(vueData, name) {
  delete vueData[name]
}

// 设置当前path值
export function setPathVal(obj, path, value) {
  const pathArr = path.split(pathSeparator)
  for (let i = 0; i < pathArr.length; i += 1) {
    if (pathArr.length - i < 2) {
      // 倒数第一个数据
      obj[pathArr[pathArr.length - 1]] = value
      break
    }
    obj = obj[pathArr[i]]
  }
}
export function resolveComponent(component) {
  if (typeof component === 'string') return _resolveComponent(component)

  return component
}
export function getUiField(FIELDS_MAP, { editorItem = {}, uiSchema = {} }) {
  console.log(editorItem)
  //   const field = schema['ui:field'] || uiSchema['ui:field']
  // vue 组件，或者已注册的组件名
  //   if (
  //     typeof field === 'function' ||
  //     typeof field === 'object' ||
  //     typeof field === 'string'
  //   ) {
  //     return {
  //       field,
  //       fieldProps: uiSchema['ui:fieldProps'] || schema['ui:fieldProps'] // 自定义field ，支持传入额外的 props
  //     }
  //   }
  // 类型默认 field
  const fieldCtor = FIELDS_MAP[editorItem.component]
  if (fieldCtor) {
    return {
      field: fieldCtor
    }
  } else {
    return {
      field: editorItem.component
    }
  }
  //   // 如果包含 oneOf anyOf 返回空不异常
  //   // SchemaField 会附加onyOf anyOf信息
  //   if (!fieldCtor && (schema.anyOf || schema.oneOf)) {
  //     return {
  //       field: null
  //     }
  //   }
  //   // 不支持的类型
  //   throw new Error(`不支持的field类型 ${schema.type}`)
}
// 转换antdv、naive等非moduleValue的v-model组件
export const modelValueComponent = (component, { model = 'value' } = {}) =>
  defineComponent({
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      return () => {
        const {
          modelValue: value,
          'onUpdate:modelValue': onUpdateValue,
          ...otherAttrs
        } = attrs
        // 这个地方的attrs是要在引入item组件的时候v-bind绑定的！！
        console.log(attrs, '---------------------------')
        // eg: 'a-input'
        return h(
          resolveComponent(component),
          {
            [model]: value,
            [`onUpdate:${model}`]: onUpdateValue,
            ...otherAttrs
          },
          slots
        )
      }
    }
  })
