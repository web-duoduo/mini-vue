/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-16 19:05:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-22 19:09:26
 */
// 通用js 方法

export const extend = Object.assign;
export const isObject = value => {
  return value !== null && typeof value === 'object'
}

export const hasChanged = (val, newVal) => !Object.is(val, newVal)