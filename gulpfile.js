// init plugin
// const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require('gulp');
const rename = require('gulp-rename'), // 檔案重新命名
      notify = require('gulp-notify'), // 通知訊息
      del = require('del'), // 清除檔案
      sass = require('gulp-sass'), // [css] Sass 編譯
      autoprefixer = require('gulp-autoprefixer'), // [css] CSS自動前綴
      cleancss = require('gulp-clean-css'), // [css] CSS壓縮
      jshint = require('gulp-jshint'), // [JS] JS檢查錯誤
      uglify = require('gulp-uglify'), // [JS] 壓縮JS
      babel = require('gulp-babel'), // [JS] 轉換ES6為ES5，將ES6語法轉換成瀏覽器能讀的ES5
      gulpif = require('gulp-if'), // 就是 if ಠ_ಠ
      inject = require('gulp-inject-string'), // HTML 插入 code
      removeCode = require('gulp-remove-code'), // gulp 移除code
      imagemin = require('gulp-imagemin'), // [IMG] Image壓縮
      // imageminPngquant = require('imagemin-pngquant'), // [IMG] PNG壓縮
      imageminGifsicle = require('imagemin-gifsicle'), // [IMG] GIF壓縮
      imageminJpegRecompress = require('imagemin-jpeg-recompress'), // [IMG] JPG壓縮
      plumber = require('gulp-plumber'), // [例外處理] gulp發生編譯錯誤後仍然可以繼續執行，不會強迫中斷
      changed = require('gulp-changed'), // [例外處理] 找出哪些檔是被修改過的
      cached = require('gulp-cached'), // [快取機制] 只傳遞修改過的文件
      runSequence = require('run-sequence'),
      // extender = require('gulp-html-extend'), // [HTML] html 編譯 （HTML模板）
      pug = require('gulp-pug'), // [HTML / PUG] 編譯 PUG（PUG模板）
      sourcemaps = require('gulp-sourcemaps'), // [檔案追蹤] 來源編譯
      gulpIgnore = require('gulp-ignore'), // [例外處理] 無視指定檔案
      iconfont = require('gulp-iconfont'), // [ICON FONT] 編譯font檔案
      consolidate = require('gulp-consolidate'), // [ICON FONT] 編譯Demo html + icon.scss
      log = require('fancy-log'), // console.log套件，用法： console('要顯示的文字')
      debug = require('gulp-debug'), // debug 監控處理檔案
      browserSync = require('browser-sync').create(); // 建立同步虛擬伺服器

// font icon function
const fontName = 'icon', fontClassName = 'be-icon';
function iconFont(){
  return src(['src/images/font_svg/*.svg'], {base: './src/'})
		.pipe(changed('src/images/font_svg/*.svg',{
			extension: '.svg',
			hasChanged: changed.compareLastModifiedTime
		}))
		.pipe(iconfont({
			fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			appendCodepoints: true,
			appendUnicode: false,
			normalize: true,
			fontHeight: 1000,
			centerHorizontally: true
		}))
		.on('glyphs', function (glyphs, options) {
			// 生成 ICON SCSS
			var nowTime = new Date().getTime();
			src('src/sass/vendor/font/templates/_icons.scss')
				.pipe(consolidate('underscore', {
					glyphs: glyphs,
					fontName: options.fontName,							// 使用的font-family
					fontPath: '../fonts/icons/',						// 生成的SCSS讀取font檔案讀取位置
					fontDate: nowTime,									// 避免有快取問題
					cssClass: fontClassName								// 使用的class名稱: <i class="{{fontClassName}} {{fontClassName}}-{{svg file name}}"></i>
				}))
				.pipe(dest('src/sass/vendor/font'));				// 生成SCSS位置

			// 生成 ICON CSS (Demo HTML使用)
			src('src/sass/vendor/font/templates/_icons.scss')
				.pipe(consolidate('underscore', {
					glyphs: glyphs,
					fontName: options.fontName,
					fontPath: '',
					fontDate: nowTime,
					cssClass: fontClassName
				}))
				.pipe(rename({basename: "icons", extname: '.css'}))
				.pipe( dest('dist/fonts/icons') );

			// 生成 Demo CSS (Demo HTML使用)
			src('src/sass/vendor/font/templates/_iconfont-demo.scss')
				.pipe(rename({basename: "iconfont-demo", extname: '.css'}))
				.pipe( dest('dist/fonts/icons') );

			// 生成Demo HTML
		  src('src/sass/vendor/font/templates/_index.html')
				.pipe(consolidate('underscore', {
					glyphs: glyphs,
					fontName: options.fontName,
					cssClass: fontClassName,
					fontYYYY: new Date().getYear() + 1900
				}))
				.pipe(rename({basename: 'index'}))
				.pipe( dest('dist/fonts/icons') );
		})
		.pipe(dest('dist/fonts/icons/'))							//生成的font檔案
    .pipe(notify('Font icon Task Complete!'));
}

// node sass delete commend function
function sassDelCommend(){
  return src('dist/*.html')
    .pipe(removeCode({ production: true }))
    .pipe(dest('dist'));
}

// sass export vendor
function sassExportVendor(){
  return src('src/sass/vendor/**/*.css')
    .pipe(changed('dist/css', {
      extension: '.css',
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(dest('dist/css/vendor'));
}

// node sass display error
function sassDisplayError(error){
  var errorString = '[' + error.plugin + ']';
  errorString += ' ' + error.message.replace("\n",'\n');
  var last_error_str =
	'\n============[Error Message]============\n\n' +
	errorString +
  '\n=======================================\n';
  var error_msg =
	"<!--removeIf(production)-->" +
	"<div class='_error-msg_' style='position:relative;z-index:9999;font-size:18px;white-space: pre;font-family: monospace;padding:'><div class='_text_' style='display:flex;justify-content:center;padding:20px;'>" +
	String(last_error_str) +
	"</div></div>" +
  "<!--endRemoveIf(production)-->";
  src('dist/*.html')
    .pipe(inject.after('</head>', error_msg))
    .pipe(dest('dist'));
}
// sass compiler
sass.compiler = require('node-sass');
function sassCompile(){
  return src('src/sass/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', function(err){
      sassDisplayError(err);
      this.emit('end');
    }))
    .pipe(changed('dist/css', {
      extension: '.css',
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(autoprefixer('last 2 version', 'ie 11', 'ios 8', 'android 4'))
    .pipe(dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleancss({ rebase: false }))
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'src/sass'
    }))
    .pipe(dest('dist/css'))
    // .pipe(debug({title: 'Debug for compile file:'}))
    // .pipe(browserSync.stream())
    .pipe(notify('CSS Task Complete!'));
}

// image compile
function image(){
  return src('src/images/**/*')
    .pipe(plumber())
    .pipe(changed('dist/images/*',{
      hasChanged: changed.compareLastModifiedTime
    }))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      // [jpg] quality setting
      // 原設定數字：Max: 95, min: 40
      imageminJpegRecompress({
        quality: 'veryhigh',
        progressive: true,
        max: 75,/* 符合google speed 範疇 */
        min: 60
      }),
      // [png] quality setting
      // 原設定數字：Type: Array<min: number, max: number>
      // imageminPngquant({quality: [0.8, 0.9]})

      // [svg] quality setting
      // svg壓縮怕會壓縮到不該壓縮的程式碼，導致動畫無法製作
      // 目前需自行壓縮整理處理svg檔案
      // SVG線上壓縮：https://jakearchibald.github.io/svgomg/
      // imagemin.svgo({plugins: [{removeViewBox: false}]}) 
    ]))
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream())
    .pipe(notify('Pic task Compressed!'));
}

// JS compile
function jsFile(){
  return src([
      'src/js/*.js',
      '!src/js/**/_*.js',
      '!src/js/{vendor,lib,plugin,plugins,foundation}/**/*.*',
    ])
    .pipe(plumber())
    .pipe(babel())
    .pipe(jshint())
    .pipe(changed('dist/js', {
      extension: '.js',
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulpIgnore.exclude('vendor/**/*.*'))
    .pipe(dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    // .pipe(browserSync.stream())
    .pipe(notify('JS Task Complete!'));
}
// JS vendor compile
function jsVendor(){
  return src([
      'src/js/{vendor,lib,plugin,plugins,foundation}/*.js',
      '!src/js/{vendor,lib,plugin,plugins,foundation}/**/*.min.js',
      '!src/js/{vendor,lib,plugin,plugins,foundation}/**/*-min.js'
    ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(changed('dist/js',{
      extension: '.js',
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    // .pipe(browserSync.stream())
    .pipe(notify('JS Plugin Task Complete!'));
}
// JS Vendor Min compile
function jsVendorMin(){
  return src([
      'src/js/{vendor,lib,plugin,plugins,foundation}/**/*.min.js',
      'src/js/{vendor,lib,plugin,plugins,foundation}/**/*-min.js'
    ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(changed('dist/js',{
      extension: '.js',
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(dest('dist/js'))
    // .pipe(browserSync.stream())
    .pipe(notify('JS Plugin Task Complete!'));
}

// layout build
function layoutPre(){
  return src(['src/_*.pug'])
    .pipe(pug({
      pretty: true,
      compileDebug: true,
    }));
}
function layoutAfter(){
  return src(['src/*.pug', '!src/_*.pug'])
    .pipe(pug({
      pretty: true,
      compileDebug: true,
    }))
    // .pipe(debug({title: 'Debug for compile file:'}))
    .pipe(dest('dist'));
}
function page(){
  return src(['src/*.pug', '!src/_*.pug'])
	  .pipe(changed('dist', {
		  extension: '.html'
		}))
	  .pipe(pug({
			pretty: true,
			compileDebug: true,
		}))
		// .pipe(debug({title: 'Debug for compile file:'}))
	  .pipe(dest('dist'));
}

// clean file
function clean(){
  return del(['dist']);
}

// browserSync
function browsersyncInit(done) {
  browserSync.init({
    open:false,
    server: {
      baseDir: "./dist",
      online: false
    }
  });
  done();
}
// BrowserSync Reload
function browsersyncReload(done) {
  browserSync.reload();
  done();
}
// watch file
function watchFiles() {
  watch(
    'src/sass/**/*.+(scss|sass)', 
    series(sassDelCommend, sassExportVendor, sassCompile,browsersyncReload)
  );
  watch(
    'src/js/**/*.js',
    series(jsFile, jsVendor, jsVendorMin,browsersyncReload)
  );
  watch('src/images/**/*', image);
  watch('src/images/font_svg/*.svg', iconFont);
  watch('src/sass/vendor/font/templates/_icons.scss', iconFont);
  watch(
    ['src/*.pug' , '!src/_*.pug'] ,
    series(page, browsersyncReload)
  );
  watch(
    ['src/_*.pug'] ,
    series(layoutPre, layoutAfter ,browsersyncReload)
  );
  // browserSync.watch('dist/*.html').on('change', browserSync.reload);
}

// define complex tasks
const jsTask = series(jsFile, jsVendor, jsVendorMin);
const cssTask = series(sassDelCommend, sassExportVendor, sassCompile);
const htmlTask = series(layoutPre, layoutAfter);
const watchTask = parallel(watchFiles, browsersyncInit);
const buildTask = series(clean, parallel(iconFont,image,jsTask,cssTask ,htmlTask) ,watchTask);

// export tasks
exports.default = buildTask;