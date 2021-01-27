const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // 支持 less sass stylus
    style: true
  }),
  // 支持 antd 主题定制
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#ccc' },
  }),
);

// const {
//   addWebpackAlias,
//   addLessLoader,
//   fixBabelImports,
//   override,
//   addDecoratorsLegacy,
//   addWebpackPlugin
// } = require('customize-cra')

// const path = require('path')

// const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

// module.exports = override(
//   // @ 修饰器
//   addDecoratorsLegacy(),
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     // 支持 less sass stylus
//     style: true,
//   }),
//   // 支持 antd 主题定制
//   addLessLoader({
//     // 支持antd的按需加载
//     javascriptEnabled: true,
//     modifyVars: {
//       'primary-color': '#1890ff',
//       'link-color': '#1DA57A',
//       'border-radius-base': '2px',
//     },
//   }),
//   // 别名
//   addWebpackAlias({
//     "@": path.resolve(__dirname, 'src'),
//     "@@": path.resolve(__dirname, 'src/components'),
//   }),
//   addWebpackPlugin(new AntdDayjsWebpackPlugin()),
// )