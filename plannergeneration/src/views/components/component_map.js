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
  'a-textarea': modelValueComponent('a-textarea')
  //   SwitchWidget: modelValueComponent('a-switch', {
  //     model: 'checked'
  //   })
}

export default widgetComponents
