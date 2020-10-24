### 基本介紹

在webpack中有一個入口文件，通過入口文件告訴webpack從哪裡開始，並根據依賴關係確認需要打包的內容，最後通過出口文件把文件打包出來。

中間的過程要經過一些處理，比如說loader在webpack中將所有的資源視為模塊，但是webpack只認識js為結尾的文件，那其他的不是js文件怎麼處理呢?他會通過loader對這些元件的程式碼進行轉換。

loader只能針對某些特定類型的文件進行轉換，而plugin的功能會更強大一些，plugin用來解決loader無法解決的其他問題，也就是說loader是預處理文件，plugin能對我們loader處理完的文件進行二次的優化處理，比如說他可以對我們的程式碼進行壓縮減少體積。

### 使用webpack

`npm i webpack --save-dev` 安裝webpack 
`npm i webpack-cli --save-dev` 安裝webpack 命令行工具

在webpack他會有個默認的配置也就是在項目的根目錄下尋找webpack.config.js的配置文件，在這個文件中他會配置我們的打包位置與流程，以下是基本配置 :
```
const path = require('path');

module.exports = {
	mode : "development",  // 兩種模式選擇 production(壓縮後要拿來上線的程式碼)、development(在開發的模式下，不會壓縮的版本，速度上會稍微快些因為沒有壓縮的動作)
	entry : "打包路徑的js檔",  // 配置入口文件(也就是從哪個位置開始打包)
	output : {
		filename : "bundle.js",  // 配置出口文件(打包完成後的檔案名稱默認是main.js)
		path : path.resolve(__dirname, "dist")  // 打包後存放位置的路徑		
	}  
}
```
在 package.json 加入 npm 指令
```
"script":{
	"build" : "webpack"
}
```
最後輸入 `npm run build` 就可以把入口文件的 js 檔打包，隨後自動產生出一個 dist 資料夾，裡面會有 bundle.js 打包後的檔案。