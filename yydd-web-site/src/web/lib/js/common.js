/*
 * author pizhenhua
 * day 2017-7-13
 * 公共js
 */
 var common = {
 	path : "",
 	swiperObj : null,
 	goodsState : 0,
 	init : function() {
 		/*var host = window.location.host, href = window.location.href;
		if(href.indexOf("yuanyoudadi.com") >= 0 && host.indexOf("yuanyoudadi.com.cn") < 0) {
			window.location.href = href.replace("yuanyoudadi.com", "yuanyoudadi.com.cn");
		}*/
 		var that = this;
 		 /*适配*/
		var docEl = document.documentElement,
		    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		    recalc = function() {
		        that.detectmob(docEl.clientWidth);
		    };
		recalc();
		if(window.attachEvent) {

		} else {
			window.addEventListener(resizeEvt, recalc, false);
			document.addEventListener('DOMContentLoaded', recalc, false);
		}
 		
 		setTimeout(function() {
 			$("#headBuy").hover(function() {
				that.leftNarLayer();
			});
			that.headerNarFade();
		}, 500);

		
 		
 	},
 	/*检测设备*/
 	detectmob : function(width) {
		 if( navigator.userAgent.match(/Android/i)  
	        || navigator.userAgent.match(/webOS/i)  
	        || navigator.userAgent.match(/iPhone/i)  
	        || navigator.userAgent.match(/BlackBerry/i)  
	        || navigator.userAgent.match(/Windows Phone/i)  
        ){  
        	if(navigator.userAgent.match(/Android/i)) {
        		if(width <= 768) {
        			var href = window.location.href;
					window.location.href = href.replace("web", "wap");
        		}
        	} else {
        		var href = window.location.href;
				window.location.href = href.replace("web", "wap");
        	}
        }  
        else {  
            return false;  
        }  
 	},
 	/*swiper*/
 	pageSwiper : function($swiper) {
 		var that = this;
 		var count = $swiper.find(".swiper-slide").length;
 		var sNum = 0;
 		if(!$(".swiper-container")) return false;
		this.swiperObj = new Swiper('.swiper-container',{
			pagination: '.pagination',
			paginationClickable: true,
			mode: 'vertical',
			keyboardControl : true,
			mousewheelControl : true,
			speed:600,
			onSlideChangeEnd: function(swiper){
				/*var index = swiper.activeIndex;
				var $footer = $(".footer-fixed");
				if(index == count - 1) {
					$footer.removeClass("footer-hide").css("bottom",-$footer.height());
					$footer.delay(500).animate({bottom:0},500);
				} else {
					$footer.addClass("footer-hide");
				}*/
			}
		})
		 this.swiperObj.wrapperTransitionEnd(function(swiper) {
		 		var index = swiper.activeIndex;
				var $footer = $(".footer-fixed");
				if(!$footer) return false;
				if(index == count - 1) {
					if(sNum == 1) {
						$footer.removeClass("footer-hide").css("bottom",-$footer.height());
						$footer.animate({bottom:0},500);
					} else {
						sNum = 1;
					}
					
				} else {
					
					$footer.addClass("footer-hide");
				}
		 },true);
		$(".swiper-container").find(".swiper-wrapper").show();
		
		
 	},
 	commonEvent : function() {
 		$(".swiper-container").find(".colse-footer").click(function() {
 				var $footer = $(".footer-fixed");
				$footer.animate({bottom:-$footer.height()},500, function() {
					$footer.addClass("footer-hide");
				});
 		});
 	},
 	/*导航菜单*/
 	headerNarFade : function() {
 		var that = this;
 		if($(".swiper-container-nar").length) {
 			this.narSwiper = new Swiper('.swiper-container-nar',{
			    paginationClickable: false,
			    mode: 'vertical',
			    speed:600,
			    moveStartThreshold : 80,
			    resistance : "100%",
			    mousewheelControl : true,
			 });
 		}
		var $menu = $("#narList").hide();
		$("#wapNar").click(function() {
			var $that = $(this);
			$menu.show().animate({right:0},300).find(".bg-layer").show();
			var $goods = $("#goodsPage");
			$goods.animate({left:"-100%"},500);
		});
		$menu.find(".close").click(function() {
			$menu.animate({right:"-100%"},300, function() {
				$menu.hide();
			});
		});
		$menu.find(".more-nar").click(function() {
			that.narSwiper.swipeNext();
		});
		$menu.find(".close-top").click(function() {
			that.narSwiper.swipePrev();
		});
		$menu.find(".bg-layer").click(function(e) {
			$(this).hide();
			$menu.animate({right:"-100%"},300, function() {
				$menu.hide();
			});
		});
		$("#leftNar").find(".bg-layer").click(function(e) {
			$(this).hide();
			$("#leftNar").css("overflow-y" , "hidden").animate({left:"-100%"},500);
		});
		$("#upComing").find(".close").click(function() {
				$("#upComing").animate({right:"-100%"},300, function() {
					$(this).hide();
				});
		});
		this.commonEvent();
 	},
 	openUpComing : function() {
 		$("#upComing").show().animate({right:0},300)
 	},
 	commAjax : function(opts) {
 		if (!opts)
			return;
		var url = "";
		if(opts.url) {
			url = this.path + "/yydd-web/" +  opts.url;
		}
		$.ajax({
			url : url,
			type : (opts.type ? opts.type : "POST"),
			cache : false,
			data : (opts.data ? opts.data : null),
			async : (opts.async === false ? false : true),
			dataType : (opts.dataType ? opts.dataType : 'json'),
			beforeSend : function(XHR) {
				return true;
			},
			success : (opts.success ? function(response) {
				var data = response.data;
				var httpCode = response.code;
				if(httpCode == 200) {
					opts.success(data);
				} else {
					alert(response.msg);  
				}
			} : function(o) {
			}),
			error : (opts.error ? opts.error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器异常，请稍候再试");
			})
		});
 	},
 	/*正则表达式获取地址栏参数*/
 	getParamsString : function(name) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null)return  unescape(r[2]); return null;
 	},
 	
 	/*弹出左边菜单*/
 	leftNarLayer : function() {
 		var $nar = $("#leftNar");
 		$nar.animate({left:"0"},500, function() {
 			$nar.find(".bg-layer").show();
 			$nar.css("overflow-y" , "auto");
 		});
 	},
 	closeLeftNar : function() {
 		var $nar = $("#leftNar");
 		$nar.css("overflow-y" , "hidden").animate({left:"-100%"},500);
 	},
 	narActive : function(name) {
 		var $nar = $("#headNar").find(".nar");
 		var $menu = $nar.find("." + name)
 		if($menu) {
 			$menu.addClass("active");
 		}
 	},
 	copyToClipboard : function(maintext) {
 		if (window.clipboardData){  
		    window.clipboardData.setData("Text", maintext);  
	    }else if (window.netscape){  
	      try{  
	        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
	    }catch(e){  
	        alert("该浏览器不支持一键复制！n请手工复制文本框链接地址～");  
	    }  
		    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);  
		    if (!clip) return;  
		    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);  
		    if (!trans) return;  
		    trans.addDataFlavor('text/unicode');  
		    var str = new Object();  
		    var len = new Object();  
		    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);  
		    var copytext=maintext;  
		    str.data=copytext;  
		    trans.setTransferData("text/unicode",str,copytext.length*2);  
		    var clipid=Components.interfaces.nsIClipboard;  
		    if (!clip) return false;  
		    clip.setData(trans,null,clipid.kGlobalClipboard);  
	  }  
 	}
 }
 common.init();