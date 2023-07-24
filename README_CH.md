# DIY主机配置清单管理器
[English](README.md) | [日本語](README_JP.md)  

欢迎使用DIY主机配置清单管理器！该应用程序是一个基于Electron的项目，用于管理DIY主机配置清单。你可以在本地创建、保存和管理多个配置清单，并且还提供了打印和截图共享功能。

![logo](./public/img/totem.png)

## 界面
![主界面](./screenshot/screenshot_1.png)

![新配置清单界面](./screenshot/screenshot_2.png)

## 功能
- 显示已有的配置清单
- 加载指定的配置清单
- 删除指定的配置清单
- 创建新的配置清单
- 计算单个配件的总价格
- 计算所有配件的总价格
- 添加或者删除一行配件
- 保存新的配置清单
- 批量导入配置清单
- 从单个JSON文件导入新的配置清单
- 备份（导出）所有配置清单
- 查看所有配置清单
- 删除所有配置清单
- 打印配置清单
- 创建配置清单的截图
- 将配置清单导出CSV格式文件
- 复制配置清单的JSON数据

## 如何安装？
你可以选择在[Releases](https://github.com/Karasukaigan/pc-parts-lists-manager/releases)里直接下载打包好的程序，打开即用，无需安装Node.js和其他依赖。  

如果你有一定Node.js基础，或者想修改一些代码，可以选择从源代码运行。  

### 获取代码

- 从GitHub克隆项目：
  ```
  git clone https://github.com/Karasukaigan/pc-parts-lists-manager.git
  ```  

- 直接下载项目：
  从[GitHub页面](https://github.com/your-username/pc-parts-lists-manager)点击右上角“Code”按钮，再点击“Download ZIP”下载项目的ZIP压缩包，然后解压到本地目录。  

请确保你已经安装了**Node.js**。如果没有安装，你可以在[Node.js官网](https://nodejs.org/)下载并安装最新版本。

### 安装依赖

进入项目目录后，使用以下命令安装项目的依赖：
```
npm install
```  

### 运行应用

在安装完所有依赖后，你可以使用以下命令来运行DIY主机配置清单管理器：  
```
npm start
```  
这将启动Electron应用程序，并打开主机配置清单管理器界面。  

### 打包应用

如果你想将DIY主机配置清单管理器打包成可执行文件（exe），以便在其他计算机上使用，可以使用以下命令：
```
npm run package
```  
该命令将在项目的`dist/`目录下生成可执行文件。