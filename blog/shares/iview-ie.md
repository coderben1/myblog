# iview不兼容ie的坑

## 前情提要
项目中有按需引入了iview的部分组件，但发现在ie（甚至ie11）上会出现不兼容的情况。
![](/images/shares/share4/pic1.png)

具体有以下几个问题及解决办法：

## 问题1
### ie浏览器几乎不支持所有es6新增方法
解决办法：

1.安装babel-polyfill
```
npm install babel-polyfill --save
```
2.在main.js中引入
```
import 'babel-polyfill'
```
或者

3.对build/webpack.base.conf.js中入口文件配置做修改
```js
entry: {
  app: ["babel-polyfill", "./src/main.js"]
}
```

★补充：

在全局引入 babel-polyfill，这样打包后的整个文件体积会比较大。

可以通过在文件.babelrc 中设置 "useBuiltIns": "usage" 能够把 babel-polyfill 中你需要用到的部分提取出来，不需要的去除。

![](/images/shares/share4/pic2.png)

useBuiltIns 参数说明：

◆ false: 不对 polyfills 做任何操作

◆ entry: 根据 target 中浏览器版本的支持，将 polyfills 拆分引入，仅引入有浏览器不支持的 polyfill

◆ usage(新)：检测代码中 ES6/7/8 等的使用情况，仅仅加载代码中用到的 polyfills

## 问题2
### ie10以下，iview的日期组件在选择时间的时候出不来，以及下拉框无法选中
原因：ie10及以下不支持dataset导致的，而iview的transfer-dom.js使用了这个属性

解决办法：

1.安装element-dataset
```
npm install element-dataset --save
```
2.在main.js中引入
```js
import ElementDataset from 'element-dataset';
ElementDataset()
```
## 问题3
### es6转码es5不彻底，出现一些莫名其妙的语法报错
解决办法：

1.对iview的源码用babel-loader处理一下，修改build/webpack.base.conf.js，把iview的源码include进来，这样webpack在打包时会自动用babel转译iview源码中的es6编码
```js
{    
    test: /\.js$/,    
    loader: 'babel-loader',    
    include: [..., resolve('/node_modules/iview/src')]
},
```

讲道理，我更喜欢用隔壁的element-ui，两个框架用的都比较多，有时间认真做下对比，写篇博客🤕
## 完
