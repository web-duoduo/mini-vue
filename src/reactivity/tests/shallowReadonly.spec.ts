/*
 * @Description: 
 * @Version: 
 * @Autor: jxj
 * @Date: 2022-06-18 20:33:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-18 22:01:27
 */
import { isReadonly, shallowReadonly } from "../reactive";

describe("shallowReadonly", () => {
  test("should not make non-reactive properies reactive", () => {
    const props = shallowReadonly({n: {foo: 1}})
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })
  it("should call console.warn when set", () => {
    // console.warn()
    // mock
    console.warn = jest.fn()
    const user = shallowReadonly({age: 10})

    user.age = 11


    expect(console.warn).toBeCalled()
  })
})