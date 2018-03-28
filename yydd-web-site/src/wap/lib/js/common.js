/*
 * author pizhenhua
 * day 2017-7-13
 * 公共js
 */
 var common = {
 	path : "",
 	goodsState : 0,
 	narSwiper : null,
 	init : function() {
 		var _that = this;
 		/*var host = window.location.host, href = window.location.href;
		if(host.indexOf("yuanyoudadi.com") >= 0 && host.indexOf("yuanyoudadi.com.cn") < 0) {
			window.location.href = href.replace("yuanyoudadi.com", "yuanyoudadi.com.cn");
		}*/
 		document.addEventListener('touchstart',function (event) {
	        if(event.touches.length>1){
	            event.preventDefault();
	        }
	    })
	    var lastTouchEnd=0;
	    document.addEventListener('touchend',function (event) {
	        var now=(new Date()).getTime();
	        if(now-lastTouchEnd<=300){
	            event.preventDefault();
	        }
	        lastTouchEnd=now;
	    },false)
	    /*适配*/
		var docEl = document.documentElement,
		    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		    recalc = function() {
		        //设置根字体大小
		        // 你想设定的数值          //设计稿的宽度
		       
		        var href = window.location.href;
		        if(href.indexOf("/comment/") <= 0) {
		        	_that.detectmob(docEl.clientWidth);
		        }
		        var myfontSize = 32 * (docEl.clientWidth / 640);

		        // 此值太少会导致font-size太小,会有bug
		        if(myfontSize > 19) {
		            myfontSize = 18.75;
		        }
		        docEl.style.fontSize = myfontSize + 'px';
		        // 屏幕实际宽度  /  设计稿宽度   =   元素在设计稿的宽度 / 元素在屏幕的宽度    
		    };
		recalc();
		setTimeout(function() {
			_that.headerNarFade();
			window.addEventListener(resizeEvt, recalc, false);
			document.addEventListener('DOMContentLoaded', recalc, false);
			var href = window.location.href;
			if(document.querySelector('.scroll') && href.indexOf("/quiz") == 0) {
				_that.overscroll(document.querySelector('.scroll'));
			}
		},200);
		
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
        		if(width > 768) {
        			var href = window.location.href;
					window.location.href = href.replace("wap", "web");
        		}
        	} 
            return true;  
        }  
        else {  
        	var href = window.location.href;
			window.location.href = href.replace("wap", "web");
            return false;  
        }  
 	},
 	overscroll : function(el) {
 		el.addEventListener('touchstart', function() {
		    var top = el.scrollTop
		      , totalScroll = el.scrollHeight
		      , currentScroll = top + el.offsetHeight;
		    if(top === 0) {
		      el.scrollTop = 1;
		    } else if(currentScroll === totalScroll) {
		      el.scrollTop = top - 1;
		    }
		  });
		  el.addEventListener('touchmove', function(evt) {
		    if(el.offsetHeight <= el.scrollHeight){
		    	evt._isScroller = true;
		    }
		  });
		  document.body.addEventListener('touchmove', function(evt) {
			  if(!evt._isScroller) {
			    evt.preventDefault();
			  }
			});

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
 		if($(".swiper-container-nar").length > 0) {
 			this.narSwiper = new Swiper('.swiper-container-nar',{
			    paginationClickable: false,
			    mode: 'vertical',
			    speed:600,
			    moveStartThreshold : 80,
			    resistance : "100%"
			 });
 		}
 		
		var $menu = $("#narList").hide();
		$("#wapNar").click(function() {
			var $that = $(this);
			$menu.show().animate({right:0},300)
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

		$("#upComing").find(".close").click(function() {
				$("#upComing").animate({right:"-100%"},300, function() {
					$(this).hide();
				});
		});
		this.commonEvent();
 	},
 	narActive : function(name) {
 		var $nar = $("#headNar").find(".nar");
 		var $menu = $nar.find("." + name)
 		if($menu) {
 			$menu.addClass("active");
 		}
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
 	narActive : function(name) {
 		var $nar = $("#narList").find(".nar");
 		var $menu = $nar.find("." + name);
 		if($menu) {
 			$menu.addClass("active");
 		}
 	},
	errorMessage : function(mes, $page) {
		var $html = $('<div class="error-mes"><span>'+mes+'</span></div>');
		$page.append($html);
		$html.fadeIn(function() {
			$html.delay(1000).fadeOut(function() {
				$html.remove();
			});
		})
	},
 }
 common.init();