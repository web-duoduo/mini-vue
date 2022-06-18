/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-15 21:50:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-17 22:04:07
 */
import { reactive, isReactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
  });
});
