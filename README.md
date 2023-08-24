# DIY主机配置清单管理器（DIY PC Parts Lists Manager）

![主界面](./screenshot/screenshot_1.png)  

欢迎使用DIY主机配置清单管理器！该应用程序是一个基于Electron的项目，用于管理DIY主机配置清单。你可以在本地创建、保存和管理多个配置清单，并且还提供了打印和截图共享功能。  

Welcome to the DIY PC Parts Lists Manager! This application is an Electron-based project designed to manage DIY PC parts lists. You can create, save, and manage multiple parts lists locally, and it also offers printing and screenshot sharing functionalities.  

已更新至[V1.2.0](#v120)  

Updated to [V1.2.0](#v120)  

![logo](./public/img/totem.png)  

## 功能

- 加载指定的配置清单（Load the specified parts list）

- 删除指定的配置清单（Delete the specified parts list）

- 创建新的配置清单（Create a new parts list）  
  ![新配置清单界面](./screenshot/screenshot_2.png)  

- 计算单个配件的总价格（Calculate the total price of an individual part）

- 计算所有配件的总价格（Calculate the total price of all parts）

- 调整配件的排列顺序（Adjust the order of parts in the list）

- 批量导入配置清单（Bulk import parts lists）

- 从JSON文件导入新的配置清单（Import new parts list from JSON file）

- 备份（导出）所有配置清单（Backup (export) all parts lists）

- 打印配置清单（Print the parts list）  
  你可以在菜单栏的设置里点击“info.js”打开配置文件。修改`defaultAuthor`或者`defaultNote`来改变打印时默认显示的作者和备注信息。  

- 创建配置清单的截图（Generate a screenshot of the parts list）

- 复制配置清单的文本（Copy the text of the parts list）

- 将配置清单导出CSV格式文件（Export the parts list to a CSV format file）

- 复制配置清单的JSON数据（Copy the JSON data of the parts list）
- ……

## 安装与部署
你可以选择在[GitHub](https://github.com/Karasukaigan/pc-parts-lists-manager/releases)或者[Gitee](https://gitee.com/karasukaigan/pc-parts-lists-manager/releases)的Releases里直接下载打包好的程序，解压即用，无需安装Node.js和其他依赖。  

你也可以选择从源代码运行。  

- 从GitHub或者Gitee克隆项目：  
  ```
  git clone https://github.com/Karasukaigan/pc-parts-lists-manager.git
  ```  
  或者  
  ```
  git clone https://gitee.com/karasukaigan/pc-parts-lists-manager.git
  ```  

- 请确保你已经安装了**Node.js**。如果没有安装，你可以在[Node.js官网](https://nodejs.org/)下载并安装最新版本。

- 进入项目目录后，使用以下命令安装项目的依赖：  
  ```
  npm install
  ```  

- 在安装完所有依赖后，你可以使用以下命令来运行 DIY主机配置清单管理器：  
  ```
  npm start
  ```  

- 如果你想将DIY主机配置清单管理器打包成可执行文件（exe），以便在其他计算机上使用，可以使用以下命令：  
  ```
  npm run package
  ```  
  该命令将在项目的`dist/`目录下生成可执行文件。   

## 版本更新

### V1.1.0<span id="v110"></span>

1. 将“创建配置清单”按钮更名为“新建配置清单”
2. 修复了截图时出现的元素错位
3. 修复了新建配置清单页面的按钮样式错误
4. 在新建配置清单页面为每一行配件添加了上移、下移按钮，实现了配件的手动排序
5. 在新建配置清单页面，如果仅剩最后一行配件，删除按钮将无效
6. 调整了新建配置清单页面的样式
7. 新建配置清单页面中配置清单的JSON数据默认设置为隐藏
8. 在新建配置清单页面添加了显示/隐藏JSON按钮
9. 将新建配置清单时自定义的配置清单名称长度限制提升至50个字符（但依然不建议使用过长的名称）
10. 在菜单栏添加了设置菜单，便于直接打开main.js和info.js进行修改

### V1.2.0<span id="v120"></span>

1. 添加了“复制文本”按钮，可以当前加载的配置清单一键复制到剪切板，便于分享。
2. “截图分享”按钮的文本改为“截图”，并且截图不再包含版权信息。
3. 打包后的EXE文件会显示正确的图标。
4. 提供“快速开始.json”以便于更快地创建配置清单。

### 待修复的问题（欢迎反馈）
1. 配置清单名称中包含某些特殊字符会导致该配置清单无法被删除。