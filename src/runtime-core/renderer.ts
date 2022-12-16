import { createComponentInstance, setupComponent } from "./component";

/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-12-14 20:38:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-15 19:17:56
 */
export function render(vnode, container) {
  // patch 为了递归处理

  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  processComponent(vnode, container);

  // 判断是不是element类型
}

function processComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();

  // vnode -> patch

  // vnode -> element -> mountElement

  patch(subTree, container);
}
