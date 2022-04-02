const blockItemMap = new Map([
  [1, 'head1'],
  [2, 'head2'],
  [3, 'head3'],
  [4, 'head4']
])
export function guid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getBlockMap(blockId: any): any {
  return blockItemMap.get(blockId)
}
