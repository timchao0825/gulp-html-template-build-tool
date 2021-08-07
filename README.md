### 檔案相關 / File reference
---
In the project directory, you can run:

#### `npm install`

Install dependencies about this application.

#### `gulp`

#### Required
* [Node JS](https://nodejs.org/en/) - Create build tool
* [NPM](https://www.npmjs.com/) - Install tool package
* [Gulp](https://gulpjs.com/) - Gulp tool official web site
* [jQuery 3.6.0](https://code.jquery.com/jquery/) - JQuery Verison

#### NPM package usage
* [Gulp-pug](https://www.npmjs.com/package/gulp-pug)
* [Gulp-formatHtml](https://www.npmjs.com/package/gulp-format-html)
* [Gulp-sass](https://www.npmjs.com/package/gulp-sass) 
	*  [Gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
	*  [Gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
* [Gulp-babel](https://www.npmjs.com/package/gulp-babel)
	*  [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
	*  [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [Gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
	* [imageminPngquant](https://www.npmjs.com/package/imagemin-pngquant)
	* [imageminGifsicle](https://www.npmjs.com/package/imagemin-gifsicle)
	* [imageminJpegRecompress](https://www.npmjs.com/package/imagemin-jpeg-recompress)
* [Gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont)
  * [gulp-consolidate](https://www.npmjs.com/package/gulp-consolidate)
* [Gulp-replace](https://www.npmjs.com/package/gulp-replace) 
* [Gulp-rename](https://www.npmjs.com/package/gulp-rename)
* [Gulp-changed](https://www.npmjs.com/package/gulp-changed)
* [Gulp-notify](https://www.npmjs.com/package/gulp-notify)
* [Gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
* [Gulp-sourcemaps](https://www.npmjs.com/search?q=Gulp-sourcemaps)
* [Gulp-inject-string](https://www.npmjs.com/package/gulp-inject-string)
* [Gulp-remove-code](https://www.npmjs.com/package/gulp-remove-code)
* [del](https://www.npmjs.com/package/del)
* [Browser-sync](https://www.browsersync.io/)

### 設置說明 / Setting info
---
##### HTML
* 使用PUG生成（HTML template架構）<br>
* 可使用自製 iconFont，詳細運用見Gulpfile.js
<br>
(參考iconfont生成後的html，請在網址列後加入/fonts/icons/)
範例：http://localhost:3000/fonts/icons/

##### SCSS
* 整體項目設定包含：h1-h6字體、字級、顏色、breakpoint、主要顯示寬度範圍...等基礎設定，放在_layout.scss
* 通用元素，一律放置於layout.sass or layout.scss，請參考layout/_layout.scss
* 各別頁面內的通用元素，一樣置頂

##### JS
* JS資料夾外層請放置各個頁面檔案配合JS
* JS > vendor 裡頭請放置專案用的外掛或是套件檔案
（沒壓縮或有壓縮檔皆可放置，Gulp編譯會自動判斷並產出.min檔案，所以js頁面載入時請統一載入壓縮.min檔）
* JS檔案已兼容 ES6 以及 ES5 可在檔案內撰寫，Gulp編譯後會自動產生 ES5 語法

### 紀錄 / Record
---
```diff

// 版本資訊
// Node version v14.15.0
// NPM version v6.14.0
// Gulp version v4.0.2
// Gulp CLI version v2.3.0
/ --------------------------------------------------
// Gulp工具 2021 修正列表
1.更新套件
+	更新套件至最新版本
- 移除CSS Framework(foundation) | 不一定每個專案都會用
2.新增產出後 HTML 自動格式化（beautify）
3.將scss結構調整，拆分為全部_pages.scss include page資料夾內的檔案內容，使得檔案更容易找到 
4.將產出的檔案（CSS , JS）都 uglify 處理過
- （CSS , JS）將不在產出原始檔案
5.新增Lint排版設定
+ 新增排版設定(Prettier , ESLint...)

/ --------------------------------------------------
// Gulp.js 2020/01 修正列表
1.js file 更動時，每次都會處理全部的js file檔案
+	修正每次js file更動，單次更動只會處理單檔（增進編譯速度）

// --------------------------------------------------
// Gulp.js 2019/12 修正列表
+	font icon 如果要和其他scss頁面使用時，提供變數的設置

// --------------------------------------------------
// Gulp.js 2019/07 修正列表
1.當 pug 頁面到達一定數量的時候，編譯速度將會大幅降低
+	修改gulp-pug的task編譯方式，以及調整pug layout編譯方式
2.JS 檔案 撰寫錯誤的時候將會停止JS編譯問題
+	調整Babel編譯順序
3.windows環境下，pngquant圖片壓縮會有 libpng 未下載錯誤訊息，並無法壓縮png檔案
+	npm imagemin pngquant 更新至 8.0.0版本後 windows 可以成功下載

// --------------------------------------------------
// Gulp.js 2019 修正列表
1.棄用gulp-ruby-sass，改使用gulp-sass
+	新增gulp-sass^4.0.2
-	移除gulp-ruby-sass（作者即將棄用；並不再更新）
2.JS檔案，支援ES5 , ES6 , ES7的寫法支援
+	新增gulp-babel，兼容各個ES寫法
+	更新gulp-babel最新套件
3.JS vendor 檔案格式重新建構
+	調整JS/vendor放置檔案，自動輸出js.min檔讓結構更簡單明瞭
4.CSS min 的source map支援
+	dist檔案載入css.min檔案，支援sourcemap
5.更新gulp-imagemin的套件
+	將圖片壓縮套件全部更新，支援全檔案壓縮
6.將browserSync更新，語法更新
+	現在有更快的HTML/CSS/JS的編譯了，檔案修改存檔後會直接快速的reload
-	移除每次存檔的網頁重新reload時間
7.重新架構新版本foundation framework , bootstrap framework
+	框架版本更新至官方最新版本
8.PUG支援
+	支援哈巴狗ಠ_ಠ

// -------------------------
// 問題
-	1.windows環境下，pngquant圖片壓縮會有 libpng 未下載錯誤訊息，並無法壓縮png檔案
-	2.SASS編譯如果發生格式錯誤，目前只會顯示在終端機不會顯示在編譯後的網頁畫面
+	新增node sass 錯誤發生時，將會把錯誤訊息新增至頁面html上
```