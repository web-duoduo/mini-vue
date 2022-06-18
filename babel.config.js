/*
 * @Description: 
 * @Version: 
 * @Autor: jxj
 * @Date: 2022-06-15 19:05:13
 * @LastEditors: 
 * @LastEditTime: 2022-06-15 19:05:30
 */
module.exports = {
  // 以当前 node 版本为基础进行转换
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};