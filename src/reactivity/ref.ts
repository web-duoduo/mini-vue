/*
 * @Description: 
 * @Version: 
 * @Autor: jxj
 * @Date: 2022-10-22 01:54:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-22 20:41:30
 */

import { hasChanged, isObject } from "../shared"
import { isTracking, tarckEffects, triggerEffects } from "./effect"
import { reactive } from './reactive'
class RefImpl {
  private _value: any
  private dep
  private _rawValue: any
  private __v_isRef = true
  constructor (value) {
    // 用来存储原始value值
    this._rawValue = value
    // 处理 value 是对象的情况
    // this._value = value
    this._value = convert(value)
    this.dep = new Set()
  }

  get value () {
    // if (isTracking()) {
    //   tarckEffects(this.dep)
    // }
    trackRefValue(this)
    return this._value
  }

  set value (newValue) {

    // if (Object.is(newValue, this._value)) return

    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffects(this.dep)
    }
    // 一定要先给value 赋值  
    // this._value = newValue

    // triggerEffects(this.dep)
  }
}

function convert (value) {
  return isObject(value) ? reactive(value) : value
}

export function trackRefValue (ref) {
  if (isTracking()) {
    tarckEffects(ref.dep)
  }
}

export function ref (value) {
  return new RefImpl(value)
}

export function isRef (ref) {
  return !!ref.__v_isRef
}

export function unRef (ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs (objectWithRef) {
  return new Proxy(objectWithRef, {
    get (target, key) {
      // get ref  返回 .value
      return unRef(Reflect.get(target, key))
    },
    set (target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return target[key].value = value
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}