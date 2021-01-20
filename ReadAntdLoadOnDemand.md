## react ts antd 基本配置

### react 创建 ts 项目

1，使用 yarn 创建 cra-template-typescript 项目。

```js
yarn create react-app your-demo-name --template typescript
```

### 安装 antd

1，使用 yarn 安装 antd。

```js
yarn add antd
```

### 配置 antd 按需加载

1，安装所需依赖：react-app-rewired customize-cra babel-plugin-import less less-loader@5.0.0

```js
yarn add react-app-rewired customize-cra babel-plugin-import less less-loader@5.0.0
```

2，**注意**：less-loader 需要安装 5.0.0 以下的，包括 5.0.0，否则打包会出现错误。

### 配置 package.json

1，将 scripts 中的属性改成如下：

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
},
```

### 配置 config.overrides.js

1，在项目根目录创建一个 config-overrides.js 的文件，用于修改默认配置。

```js
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
  }),
);
```