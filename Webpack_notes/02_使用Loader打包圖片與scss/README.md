### 使用Loader打包圖片

`npm i file-loader --save-dev`

```
const path = require('path');

module.exports = {
	mode : "development", 
	entry : "打包路徑", 
	output : {
		filename : "bundle.js", 
		path : path.resolve(__dirname, "dist") 
	},
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/, // 匹配與什麼什麼為結尾的文件
				use: {
					loader:  'file-loader'  // 引入 loader
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'file-loader'
				}
			}
		]
	}
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
}

```

### 使用Loader打包圖片2

`npm i url-loader --save-dev`

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./index.js",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/, // 匹配與什麼什麼為結尾的文件
				use: {
					loader:  'url-loader', // 引入 loader
					options: {
						outputPath:  'images/', // 圖片打包後的路徑位置
						name:  '[name]_[hash].[ext]', // 讓圖片重新命名，[name] 是原來圖片的名子，再拚上哈希值，跟格式檔
						limit:  10240  // 當圖片大小小於這個限制時，他會把圖片打包成base64在程式碼中，當圖片大小大於這個限制時，他會打包成一個單獨的圖片檔，所以平時用的話是需要用這個url-loader，如果圖片大小就1k2k，那就沒必要因為這張圖片再發一個http請求，直接可以打包到你的程式碼中，但如果圖片很大的話，打包到程式碼中，那加載可能會很慢，所以根據圖片大小去考慮要打包到程式碼中還是打包在外面
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			}
		]
	}
<---------------------------------------------------------------------------------------------------------------------------------------------------------->
}
```

### 使用 Loader 打包 css

`npm i style-loader css-loader --save-dev`

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./index.js",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/', 
						name:  '[name]_[hash].[ext]', 
						limit:  10240  
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			},
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
			{
				test: /\.css$/, 
				use: ['style-loader', 'css-loader'] // css-loader 處理css文件，style-loader將編譯完的css插入html中的工具。
			}
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		]
	}

}
```

### 使用 Loader 打包 scss

`npm i sass-loader node-sass --save-dev`  node-sass : 把sass和scss文件轉為 css

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./index.js",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/', 
						name:  '[name]_[hash].[ext]', 
						limit:  10240  
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			},
			{
				test : /\.css$/, 
				use : ['style-loader', 'css-loader'] 
			},
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
			{
				test : /\.scss$/, 
				use : ['style-loader', 'css-loader', 'sass-loader']	// sass-loader : 編譯 sass 的loader	 css-loader : 處理css文件，style-loader : 將編譯完的css插入
			}
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		]
	}

}
```

### 使用 Loader 打包 scss 加上 postcss-loader

**什麼是 PostCSS？**

`npm i postcss-loader autoprefixer --save-dev` 

-   加入各家瀏覽器的前綴詞（prefix），例如：-webkit-、-moz-。
-   將先進的功能轉為目前主流瀏覽器所能支援的語法。
-   語法檢查和報錯。
-   支援 Grid System。
-   使用類似 SASS 的功能，例如：變數。

 autoprefixer : 加入各家瀏覽器的前綴詞

```
const  path = require('path');

module.exports = {
	mode:  "development",
	entry:  "./index.js",
	output: {
		filename:  "bundle.js",
		path:  path.resolve(__dirname, "dist")
	},
	module: { // 配置loader
		rules: [
			{
				test: /\.png$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/', 
						name:  '[name]_[hash].[ext]', 
						limit:  10240  
					}
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader:  'url-loader',
					options: {
						outputPath:  'images/',
						name:  '[name]_[hash].[ext]',
						limit:  10240
					}
				}
			},
			{
				test : /\.css$/, 
				use : ['style-loader', 'css-loader'] 
			},
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
			{
				test : /\.scss$/, 
				use : ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']	// sass-loader : 編譯 sass 的loader	 css-loader : 處理css文件， postcss-loader : 調用postcss ，style-loader : 將編譯完的css插入
			}
			<---------------------------------------------------------------------------------------------------------------------------------------------------------->
		]
	}

}
```

再項目的根目錄下新增 postcss.config.js 檔 
```
// postcss.config.js

module.exports = {
	plugins : [
		require('autoprefixer')	
	]
}
```