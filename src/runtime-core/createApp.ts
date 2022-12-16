import { render } from "./renderer"
import { createVnode } from "./vnode"

/*
 * @Description:
 * @Version: 
 * @Autor: jxj
 * @Date: 2022-12-14 11:57:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-14 20:39:14
 */
export function createApp (rootComponent) {

  return {
    mount (rootContainer) {
      // 先vnode
      // component -> vnode
      // 所有操作都是基于vnode

      const vnode = createVnode(rootComponent)

      render(vnode, rootContainer)
    }
  }
}
