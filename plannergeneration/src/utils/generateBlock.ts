import { guid, getBlockMap } from './index'
export default {
  generateBlockType(blockId = 1): any {
    const blockItem = {
      object: 'block',
      id: guid(),
      created_time: new Date().valueOf(),
      created_by: {
        object: 'user'
        // id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547' 暂时不做多人编辑 只显示谁编辑了
      },
      last_edited_time: new Date().valueOf(),
      last_edited_by: {
        object: 'user'
        // id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6' 暂时不做多人编辑 只显示谁编辑了
      },
      has_children: false,
      type: getBlockMap(blockId),
      archived: false,
      to_do: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Lacinato kale',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'Lacinato kale',
            href: null
          }
        ],
        checked: false,
        color: 'default'
      }
    }
    return blockItem
  }
  //   blockItem: {
  //     object: 'block',
  //     id: '9bc30ad4-9373-46a5-84ab-0a7845ee52e6',
  //     created_time: '2021-03-16T16:31:00.000Z',
  //     created_by: {
  //       object: 'user',
  //       id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547'
  //     },
  //     last_edited_time: '2021-03-16T16:32:00.000Z',
  //     last_edited_by: {
  //       object: 'user',
  //       id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
  //     },
  //     has_children: false,
  //     type: 'to_do',
  //     archived: false,
  //     to_do: {
  //       rich_text: [
  //         {
  //           type: 'text',
  //           text: {
  //             content: 'Lacinato kale',
  //             link: null
  //           },
  //           annotations: {
  //             bold: false,
  //             italic: false,
  //             strikethrough: false,
  //             underline: false,
  //             code: false,
  //             color: 'default'
  //           },
  //           plain_text: 'Lacinato kale',
  //           href: null
  //         }
  //       ],
  //       checked: false,
  //       color: 'default'
  //     }
  //   }
}
