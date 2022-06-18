/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-16 19:05:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-18 17:27:23
 */
// 通用js 方法

export const extend = Object.assign;
export const isObject = value => {
  return value !== null && typeof value === 'object'
}