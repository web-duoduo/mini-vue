/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-16 19:12:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-17 22:11:29
 */
import { readonly, isReadonly } from "../reactive";
describe("readonly", () => {
  it("happy path", () => {
    // not set
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(wrapped.foo).toBe(1);
  });


  it("warn then call set", () => {
    // console.warn()
    // mock
    console.warn = jest.fn()
    const user = readonly({age: 10})

    user.age = 11


    expect(console.warn).toBeCalled()
  })
});