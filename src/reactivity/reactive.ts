/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-15 22:13:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-17 22:09:00
 */

import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

export function isReactive (value) {
  // 触发 get 操作
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly (value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

function createActiveObject(raw:any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}