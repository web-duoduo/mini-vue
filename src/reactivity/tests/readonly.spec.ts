/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-16 19:12:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-18 22:15:11
 */
import { readonly, isReadonly, isProxy } from "../reactive";
describe("readonly", () => {
  it("happy path", () => {
    // not set
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)

    // 嵌套对象
    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(original.bar)).toBe(false)
    // isProxy
    expect(isProxy(wrapped)).toBe(true)
    expect(wrapped.foo).toBe(1);
  });


  it("should call console.warn when set", () => {
    // console.warn()
    // mock
    console.warn = jest.fn()
    const user = readonly({age: 10})

    user.age = 11


    expect(console.warn).toBeCalled()
  })
});
