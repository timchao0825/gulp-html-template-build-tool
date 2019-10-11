// init foundarion 
$(document).foundation();

//IE old version tip
var userAgent = window.navigator.userAgent;
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if (userAgent.indexOf("MSIE 7.0") > 0 || userAgent.indexOf("MSIE 8.0") > 0 || userAgent.indexOf("MSIE 9.0") > 0 || navigator.appVersion.indexOf("MSIE 10") !== -1) {
	var url = "browser.html";
	setTimeout(
		function () {
			$(location).attr('href', url);
		}, 0);
}
// doc ready
(function ($, window, document) {
	// Window 相關設定
	var w = window,
		win = $(window),
		ww,
		wh,
		ws;

	// 取得Window設定值
	var windowSetting = function () {
		ww = win.innerWidth();
		wh = win.innerHeight();
		ws = win.scrollTop();
	}
	windowSetting();
	// ----------------------------------- Window 相關監測
	// window on scroll use javascript
	// Reference: https://stackoverflow.com/a/10915048
	// http://dev.w3.org/2006/webapi/DOM-Level-3-Events/html/DOM3-Events.html#event-type-scroll
	function onScrollEventHandler(ev) { }
	function onResizeEventHandler(ev) {
		windowSetting();
	}
	if (w.addEventListener) {
		w.addEventListener('scroll', onScrollEventHandler, false);
		w.addEventListener('resize', onResizeEventHandler, false);
		// w.addEventListener('load', onLoadEventHandler, false);   
	} else if (w.attachEvent) {
		w.attachEvent('onscroll', onScrollEventHandler);
		w.attachEvent('onresize', onScrollEventHandler);
		w.attachEvent('load', onLoadEventHandler);
	}

	// -----------------------------------
	// =================================================

	//init ease scroll
	// ----------------------------------- 
	// $("html").easeScroll({
	// 	frameRate: 20,
	// 	animationTime: 1000,
	// 	stepSize: 35,
	// 	pulseAlgorithm: !0,
	// 	pulseScale: 8,
	// 	pulseNormalize: 1,
	// 	accelerationDelta: 20,
	// 	accelerationMax: 1,
	// 	keyboardSupport: !0,
	// 	arrowScroll: 50
	// }); 

	// -----------------------------------
	// Loader 
	// var loaderRemove = function(){
	// 	$('#loader').fadeOut('1000',function(){
	// 		$(this).remove();
	// 	});
	// }

	// fast click
	FastClick.attach(document.body); 

	console.log('all js');


	// end doc ready
})(jQuery, window, document);