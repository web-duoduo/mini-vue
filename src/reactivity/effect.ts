/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-15 22:22:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-13 23:03:29
 */

import { extend } from "../shared";

let activeEffect;
let shouldTrack;


export class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;
  public scheduler: Function | undefined;
  constructor(fn, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    // 会搜集依赖
    // shouldTrack 来做区分
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this
    
    let result = this._fn()
    // reset
    shouldTrack= false
    return result
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
  effect.deps.length = 0
}

const targetMap = new Map();
export function track(target, key) {
  if (!isTracking()) return 

  // target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }


  // 如果dep 中已经有 activeEffect 
  // if (dep.has(activeEffect)) return
  // dep.add(activeEffect);
  // activeEffect.deps.push(dep);
  tarckEffects(dep)
}

export function tarckEffects (dep) {
  if (dep.has(activeEffect)) return 
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function isTracking () {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);

  // for (const effect of dep) {
  //   if (effect.scheduler) {
  //     effect.scheduler();
  //   } else {
  //     effect.run();
  //   }
  //   // effect.run();
  // }

  triggerEffects(dep)
}

export function triggerEffects (dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // options
  extend(_effect, options);

  _effect.run();

  const runner: any = _effect.run.bind(_effect);

  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
