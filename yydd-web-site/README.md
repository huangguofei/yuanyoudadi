## 源优大地官网（web, wap）
## 基于gulp的多页应用打包
### 使用方法

#### 1. 依赖安装

    - 安装nodejs 本机采用v6.10.1版本;

    - 全局安装gulp:npm install gulp -g

    - 运行npm install 等待安装即可;

#### 2. 代码目录

		|——config
		|		wap.dev.js   移动端打包配置
		|		web.dev.js   PC端打包配置
		|
		|——dist				 生产环境目录
		|		wap          移动端项目
		|		web	         PC项目
		|
		|——src				 开发环境目录
		|		wap          移动端项目
		|		web          PC项目
		|

#### 3. 开发环境代码src目录
		
		|
		|——wap
		|		lib           移动端公用资源		
		|			imgs      图片库
		|			js		  公共js和引用插件
		|			less
		|       pages		  页面模板
		|			index	  主页目录
		|				js    主页引用js
		|				less  主页引用less
		|				index.html  主页内容
		|
		|			include   公共页面模块
		|

#### 4. 资源导出目录
     -资源导出目录dist为文件资源导出目录


#### 5. 开发

	-在当前文件根目录下执行命令 npm run dev；
	-修改src相关文件，dist相关文件也会进行相应更新

#### 6. 发布

	>在当前文件根目录下执行命令 npm run build，dist文件即为发布文件
