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
    modifyVars: { '@primary-color': '#8cb4f5' },
  }),
);