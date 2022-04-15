import { modelValueComponent } from '../../utils/vue3transform'
import ToggleWidget from '../components/Collapse/index'
import CheckboxWidget from '../components/Checkbox/index'
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
  }),
  toggle: ToggleWidget,
  head1: modelValueComponent('a-typography-title', {
    model: 'content',
    editable: { triggerType: 'text' }
  }),
  head2: modelValueComponent('a-typography-title', {
    model: 'content',
    level: 2,
    editable: { triggerType: 'text' }
  }),
  head3: modelValueComponent('a-typography-title', {
    model: 'content',
    level: 3,
    editable: { triggerType: 'text' }
  }),
  head4: modelValueComponent('a-typography-title', {
    model: 'content',
    level: 4,
    editable: { triggerType: 'text' }
  }),
  checkbox: CheckboxWidget
  //   SwitchWidget: modelValueComponent('a-switch', {
  //     model: 'checked'
  //   })
}

export default widgetComponents
