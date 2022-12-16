import { h } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  render() {
    return h("hello!" + this.name);
  },

  setup() {
    return {
      name: "duoduo",
    };
  },
};
