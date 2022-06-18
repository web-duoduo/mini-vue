/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-16 19:51:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-18 17:44:07
 */

import { track, trigger } from "./effect";
import { ReactiveFlags, reactive, readonly } from "./reactive";
import { isObject } from "../shared";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

function createGetter(isReadonly = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    const res = Reflect.get(target, key);

    // 处理嵌套对象
    // 判断res 是否为对象类型
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }

    if (!isReadonly) {
      track(target, key);
    }

    return res;
  };
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);

    trigger(target, key);
    return res;
  };
}
export const mutableHandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} set 失败 因为 target 是 readonly`, target);
    return true;
  },
};
