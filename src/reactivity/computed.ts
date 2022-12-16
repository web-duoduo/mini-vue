/*
 * @Description:
 * @Version: 
 * @Autor: jxj
 * @Date: 2022-10-22 20:48:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-13 23:08:29
 */

import { ReactiveEffect } from "./effect"

class ComputedRefImpl {
  private _getter: any
  private _dirty: boolean = true
  private _value: any
  private _effect: ReactiveEffect
  constructor (getter) {
    this._getter = getter

    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
      }
    })
  }

  get value () {
    // get value => dirty -> true
    // 当依赖的响应式对象发生改变的时候
    // effect
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}


export function computed (getter) {
  return new ComputedRefImpl(getter)
}