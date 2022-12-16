/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-12-14 11:50:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-16 15:40:24
 */
// vue3

import { createApp } from "../../lib/guide-mini-vue.esm.js";
import { App } from "./App.js";

const rootContainer = document.querySelector("#app");
createApp(App).mount(rootContainer);
