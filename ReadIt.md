## prettier
导入排序规则包 [@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports)，如果v6没有发布，就使用这个插件包[prettier-plugin-sort-imports](https://github.com/SanderRonde/prettier-plugin-sort-imports)

`prettier.config.cjs` 推荐配置如下
```js
const pluginPath = require.resolve('prettier-plugin-sort-imports');

module.exports = {
  tabWidth: 2, // 缩进2个空格
  useTabs: false, // 缩进单位是否使用tab替代空格
  semi: true, // 句尾添加分号
  singleQuote: true, // 使用单引号代替双引号
  printWidth: 100000, // 个人不喜欢换行
  plugins: [pluginPath],
  sortingMethod: 'lineLength',
  sortingOrder: 'ascending',
};
```

配置好后，如果编辑器的右键格式化不生效，可以重启下试试！



