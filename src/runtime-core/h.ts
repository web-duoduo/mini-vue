/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-12-15 22:57:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-15 22:59:29
 */
import { createVnode } from "./vnode";

export function h(type, props?, children?) {
  return createVnode(type, props, children);
}
