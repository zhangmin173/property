# 物业管理系统

---

## 基本介绍

为某物业公司开发的一套微信端物业管理系统，其中物业保修和留言处理为主要功能，包含用户端、管理端、维修端三个用户纬度。

## 项目配置

#### 安装node环境

自行百度，本次开发版本v8.11.1

#### npm环境，安装node会自动安装

本次开发版本5.6.0

#### 拷贝工程到本地

1.用git拷贝，推荐方案

```
git clone git@github.com:zhangmin173/property.git
```

2.下载项目压缩包，可选方案

访问[项目地址](https://github.com/zhangmin173/property)，选择Download ZIP

#### 安装依赖

```
npm install
```

#### 项目目录

```
config // 环境配置目录
dist // 打包生产环境代码，可直接替换线上
libs // 插件库
mock // mock数据
node_modules // 第三方类库
src // 开发源代码
webpack // webpack插件
.babelrc
.gitignore
github.png
package.json
```

## 快速开始

开发环境

```
项目根目录控制台运行：npm run dev
浏览器打开http://localhost:5555/即可访问
```

生产环境
```
项目根目录控制台运行：npm run build
生成的代码在dist文件夹，替换线上即可
```

## 关于作者

welcome to my blog!  

[Life is brief, and then you die, you know](https://zhangmin173.github.io/blog/#/)