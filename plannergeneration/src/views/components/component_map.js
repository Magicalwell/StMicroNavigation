import { modelValueComponent } from '../../utils/vue3transform'
const widgetComponents = {
  //   CheckboxesWidget,
  //   RadioWidget,
  //   InputWidget: modelValueComponent('a-input'),
  //   ColorWidget: {
  //     setup(props, { attrs }) {
  //       return () =>
  //         h(
  //           widgetComponents.InputWidget,
  //           {
  //             ...attrs,
  //             style: {
  //               ...(attrs.style || {}),
  //               maxWidth: '180px'
  //             }
  //           },
  //           {
  //             addonAfter: () =>
  //               h('input', {
  //                 disabled: attrs.disabled,
  //                 readonly: attrs.readonly,
  //                 value: attrs.modelValue,
  //                 onInput(e) {
  //                   attrs['onUpdate:modelValue'](e.target.value)
  //                 },
  //                 onChange(e) {
  //                   attrs['onUpdate:modelValue'](e.target.value)
  //                 },
  //                 type: 'color',
  //                 style: {
  //                   padding: '0',
  //                   width: '50px'
  //                 }
  //               })
  //           }
  //         )
  //     }
  //   },
  //   TextAreaWidget: modelValueComponent('a-textarea')
  paragraph: modelValueComponent('a-textarea', {
    // 原版输入框是可以支持富文本的，这个需要自己封装组件，计划后期完善
    'auto-size': true,
    bordered: false
  })
  //   SwitchWidget: modelValueComponent('a-switch', {
  //     model: 'checked'
  //   })
}

export default widgetComponents
