/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-06-15 21:50:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-18 22:16:47
 */
import { reactive, isReactive, isProxy } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);
    // isProxy
    expect(isProxy(original)).toBe(false);
    expect(isProxy(observed)).toBe(true);
  });

  test("nested reactive", () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    };

    const observed = reactive(original);
    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});
