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
 		var host = window.location.host, href = window.location.href;
		if(href.indexOf("yuanyoudadi.com") >= 0) {
			window.location.href = href.replace("yuanyoudadi.com", "naturalgiving.cn");
		}
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
/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
var chooseModule = {
	swiperObj : null,
	init : function() {
		this.swiperObj = new Swiper('.swiper-container',{
			paginationClickable: true,
			mode: 'vertical',
			keyboardControl : true,
			mousewheelControl : true,
			speed:600,
			resistance : "100%",
			onSlideChangeEnd: function(swiper){
				
			}
		})
		$(".swiper-container").find(".slide-2 .container").show();
		this.pageEvent();
	},
	pageEvent : function() {
		var $choose = $("#chooseSwiper"),
			_that = this;
		var $cor = $choose.find(".cor-list");
		$cor.find(".c-item").click(function() {
			$cor.find(".c-item").removeClass("active");
			$(this).addClass("active");
		});
		/*体质下一步*/
		var $select = $choose.find(".select-cor");
		$select.find(".next").click(function() {
			
			var $active = $select.find(".cor-list .active");
			var $submit = $(".isSubmit");
			var $that = $(this);
			if(!$submit.is(':hidden')) return false;
			if(!$active.length) {
				$that.find(".info").fadeIn(2000, function() {
					$that.find(".info").fadeOut(2000);
				});
			} else {
				//_that.submitChoose(1, $active.text());
				var type = $active.attr("key");
				window.location.href="/web/view/choose/result.html?type=" + type;
			}
		});

		$choose.find(".choose-event").click(function() {
				_that.swiperObj.swipeNext();
		});
		
	}

}
/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
var quizModule = {
	swiperObj : null,
	type : null,
	init : function() {
		this.pageEvent();
		this.initSwiper();
		$('.swiper-container').find(".slide-3 .container").show();
	},
	initSwiper : function() {
		this.swiperObj = new Swiper('.swiper-container',{
			pagination: '.pagination',
			paginationClickable: true,
			mode: 'vertical',
			keyboardControl : true,
			mousewheelControl : true,
			speed:600,
			resistance : "100%",
			onSlideChangeEnd: function(swiper){
				
			}
		})
	},
	pageEvent : function() {
		var $choose = $("#quizSwiper"),
			_that = this;
		
		/*开始测试*/
		var $subject = $choose.find(".subject-wrap");
		$choose.find(".testing").click(function() {
			_that.swiperObj.swipeNext();
			
		});
		/*回答问题*/
		$subject.find(".a-item").click(function() {
			var $that = $(this);
			var $parent = $that.parent();
			if($parent.hasClass("enabled")) {
				$parent.find(".a-item").removeClass("active");
				$that.addClass("active");
				var $next = $parent.parent().next();
				
				if($next) {
					$next.find(".answer").addClass("enabled");
					if($next.hasClass("row-active")) return false;
					$parent.parent().addClass("row-active").removeClass("row-select");
					$next.addClass("row-select");
				}
				
			}
		});
		$subject.find(".next").click(function() {
			var $activeItem = $subject.find(".sub-active");
			var $conr = $(".conr-con").find(".con-active");
			var len = $activeItem.find(".active").length,
				subLen = $activeItem.find(".issue").length;
			var $that = $(this);
			if(len < subLen) {
				$that.find(".info").fadeIn(2000, function() {
					$that.find(".info").fadeOut(2000);
				});
			} else {
				$activeItem.removeClass("sub-active");
				$conr.removeClass("con-active");
				var $next = $activeItem.next();
				var index = $next.index();
				if(index > 0) {
					$activeItem.next().addClass("sub-active");
					$conr.next().addClass("con-active");
					$subject.find(".prev").show();
					var nums = $subject.find(".sub-item").length;
					if(index == (nums - 1)) {
						$subject.find(".next").hide();
						$subject.find(".confim").show();
					} else {
						$subject.find(".confim").hide();
					}
				} else{
					$subject.find(".prev").hide();
				}
			}
		});
		$subject.find(".prev").click(function() {
			var $activeItem = $subject.find(".sub-active");
			var $conr = $(".conr-con").find(".con-active");
			var len = $activeItem.find(".active").length,
				subLen = $subject.find(".sub-item").length,
				$that = $(this);
			$activeItem.removeClass("sub-active");
			$conr.removeClass("con-active");
			var $prev = $activeItem.prev().addClass("sub-active");
			$conr.prev().addClass("con-active");
			var index = $prev.index();
			if(index == 0) {
				$that.hide();
			} else if(index < (subLen - 1)) {
				$subject.find(".next").show();
				$subject.find(".confim").hide();
			}
			
		});
		/*提交*/
		$subject.find(".confim").click(function() {
			var $submit = $(".isSubmit");
			var $that = $(this);
			var $activeItem = $subject.find(".sub-active");
			var len = $activeItem.find(".active").length,
				subLen = $activeItem.find(".issue").length;
			if(!$submit.is(':hidden')) return false;
			if(len < subLen) {
				$that.find(".info").fadeIn(2000, function() {
					$that.find(".info").fadeOut(2000);
				});
			} else {
				var constitution = [];
				$subject.find(".sub-item").each(function(n) {
					var $that = $(this);
					var type = $that.attr("key"),
						text = $that.attr("val"),
						len = $that.find(".issue").length;
					var cons = constitution[n] = {
						grade : [],
						sub : 0,
						type : type,
						name : text
					}
					var sub = 0;
					$that.find(".issue").each(function(i) {
						var $sue = $(this);
						var val = $sue.find(".active").attr("key");
						cons.grade[i] = val;
						sub += Number(val);
					});
					cons.sub = [(sub - len) / ( len * 4)] * 100;
				});

				_that.submitChoose(constitution);
			}
		});

		
	},
	/*检测体质*/
	detectionConstitution : function(grades) {
		var A = 0, N = 0, index = -1, consStr = "", max = 0, mIndex = -1, type = 0;
		$.each(grades, function(key, item) {
			var grade = item.sub;
			if(key == 0) {
				A = grade;
			} else {
				if(grade >= 40) {
					++ N;
					index = key;
				} 
				if(max < grade) {
					max = grade;
					mIndex = key;
				}
			}
		});
		if(A >= 60 && N == 0) {
			consStr = grades[0].name;
			type = 1;
		} else if(N > 0 && max >= grades[index].sub) {
			consStr = grades[mIndex].name;
			type = grades[mIndex].type;
		} else if(N > 0 && max < grades[index].sub) {
			consStr = grades[index].name;
			type = grades[index].type;
		} else if(N == 0 && max > 30) {
			consStr = grades[mIndex].name;
			type = grades[mIndex].type;
		} else {
			consStr = grades[0].name;
			type = 1;
		}
		var jsonData = {type : type, grades : grades};
		return {name : consStr, type : type, grades : JSON.stringify(jsonData)};
	},
	/*提交体质报告*/
	submitChoose : function(constitution) {
		var _that = this;
		var cons = "", typeid = 0;
		var $submit = $(".isSubmit");
		$submit.show();
		var consJson = _that.detectionConstitution(constitution);
		cons = consJson.name,
		typeid = consJson.type;
		/*提交结果*/
		common.commAjax({
 			type : "POST",
 			url : "constitution/addConstitutionTestRecord",
 			data : {testRecord : consJson.grades},
 			success : function(result) {
 				$submit.hide();
 				if(_that.type == "pad") {
 					window.location.href = "/web/view/choose/pad-result.html?id=" + result;
 				} else {
 					window.location.href = "/web/view/choose/result.html?id=" + result;
 				}
 			}
 		});
		
	}
}
/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
 var resultModelu = {
 	init : function() {
 		var that = this;
 		var type = common.getParamsString("type"), id = common.getParamsString("id");
 		var $result = $("#resultWrap");
 		if(type) {
 			$result.find(".share").remove();
 			var typeName = this.returnConsStr(type);
 			var reamk = this.returnConsReamk(type);
			$result.find(".reamk").empty().append(reamk);
 			$result.find(".name").text(typeName);
 			that.getProdsByconsId(type);
 		} else if(id) {
 			common.commAjax({
	 			type : "POST",
	 			url : "constitution/getConstitutionTestRecord",
	 			data : {constitutionTestRecordId : id},
	 			success : function(result) {
	 				var cons = JSON.parse(result.constitutionTestRecordContent);
	 				if(cons) {
	 					type = cons.type;
	 					var typeName = that.returnConsStr(type);
	 					var reamk = that.returnConsReamk(type);
						$result.find(".reamk").empty().append(reamk);
 						$result.find(".name").text(typeName);
	 					that.getProdsByconsId(type);
	 					$result.find(".share").show();
	 					$("#copyUrl").val(window.location.protocol + "//" + window.location.host + "/web/view/choose/share.html?id=" + id);
	 				} else {
	 					window.location.href = "/web/view/choose/";
	 				}
	 			}
	 		});
 		} else {
 			window.location.href = "/web/view/choose/";
 		}
 		var reamk = that.returnConsReamk(type);
 		this.pageEvent();
 	},
 	pageEvent : function() {
 		var $result = $("#resultWrap"), $share = $("#shareCon");
 		$result.find(".share").click(function() {
			$share.show().animate({"bottom" : 0});
		});
		$share.find(".close").click(function() {
			$share.animate({"bottom" : -200}, function() {
					$share.hide();
			});
		});

 		var clipboard = new Clipboard('.copy');
		clipboard.on('success', function(e) {
			e.trigger.getAttribute('aria-label');
		    e.clearSelection();
		    $share.find(".copy .info").fadeIn(2000, function() {
				$share.find(".copy .info").fadeOut(2000);
			});
		});
		clipboard.on('error', function(e) {
			alert("您的浏览器不支持一键复制，请手动复制");
		});
 	},
 	returnConsStr : function(type) {
		var str = ""
		if(type == 1) {
			str = "平和体质";
		} else if(type == 2) {
			str = "气虚体质";
		} else if(type == 3) {
			str = "阳虚体质";
		} else if(type == 4) {
			str = "阴虚体质";
		} else if(type == 5) {
			str = "痰湿体质";
		} else if(type == 6) {
			str = "湿热体质";
		} else if(type == 7) {
			str = "血瘀体质";
		} else if(type == 8) {
			str = "气郁体质";
		} else if(type == 9) {
			str = "特禀体质";
		}
		return str;
	},
	returnConsReamk : function(type) {
		var reamk = "";
		if(type == 1) {
			reamk = '<p>平和体质的您简直就是人 赢家嘛!</p>'+
                    '<p> 身体倍儿棒，吃嘛嘛香”， 再加上睡眠好、性格开朗， 社会 和自然适应能力强，拥有这类体质的你不爱得病，病也不爱 你！所以说只要不太过分，你可以任性地吃喝拉撒啊!喝各类茶饮皆可</p>'+
                    '<p>夸张点来形容，所谓百无禁忌就是你们了。所以你们喝各类茶饮皆可。到了春季喝绿茶；夏季喝白茶、绿茶；秋季喝乌龙茶；冬季喝红茶、普洱熟茶、陈年普洱生茶。想喝的话，那就随着你的性子喝好了。 </p>';
		} else if(type == 2) {
			reamk = '<p>气虚体质的你……是不是很容易说话没劲呢，经常出虚汗，容易呼吸短促，经常疲乏无力...</p>'+
                  '<p>气虚的人很容易感冒啊，而且你生病后，由于抗病能力弱也难以很快痊愈...</p>'+
                  '<p>未发酵和轻发酵的茶就少喝或者不喝吧，红茶、乌龙茶及普洱熟茶都是不错的选择。对你有好处的，注意到共同点了吗？它们都是温和型。</p>';
		} else if(type == 3) {
			reamk = '<p>阳虚体质的你是……上辈子折翼的天使，手脚冰凉，跟生鱼片这一类的凉菜有仇，一吃就拉肚子。</p>'+
					'<p>性格多内向、沉静，看似“静如处子，只想在角落里当个美女(男)子”，其实是虚！是懒！不想动而已...</p>'+
					'<p>反正，你就像生命缺少太阳，暖什么的与你无缘...</p>';
		} else if(type == 4) {
			reamk = '<p>阴虚体质的你是……热、热、热，夏天就是噩梦；</p>'+
					'<p>手脚心总赶脚被时时加热；不涂胭脂，也是面颊通红； </p>'+
					'<p>渴、渴、渴，为什么喝很多水，还是口干舌燥？无论怎么补水，还是皮肤干燥? 晚上，连周公都不搭理你。</p>'+
					'<p>有时间泡点绿茶、黄茶、白茶等清爽的茶类喝喝吧。例如福鼎寿眉、白牡丹。不想清饮，也可来点花式调饮，比如来点银耳茶、桑葚茶和枸杞红枣茶等。</p>';
		} else if(type == 5) {
			reamk = '<p>痰湿体质的你是……心宽体胖是你的最大特点，腹部松软的肉肉总是舍不得离开你；皮肤老是油油腻腻，清爽通透总与你无关；</p>'+
					'<p>从不需要汗蒸，因为常常汗如雨下；眼睛是心灵之窗，可你那浮肿的双眼却阻碍了它绽放光芒。</p>'+
					'<p>常常困乏思睡，总觉得睡得不够……</p>'+
					'<p>痰湿体质要注意饮食清淡、排毒，实在忍不住茶瘾，淡淡地泡一些绿茶、红茶和黑茶，解解馋吧。</p>';
		} else if(type == 6) {
			reamk = '<p>湿热体质的你是……脸部、鼻尖总是油光锃亮，痘痘总是逗你不断；小伙伴们总难与你亲近，你一开口便异味四窜；</p>'+
					'<p>别人在茅房倍舒爽，你却惆怅怎么告别黏滞不爽的大便与发黄的小便。</p>'+
					'<p>总而言之，湿热体质的你，总是感觉排泄不畅，怎么洗也还是不清爽，抓狂。</p>'+
					'<p>湿热体质的你自然需要来点甘平排毒的好饮品，绿茶、白茶、黑茶是不错的选择。</p>';
		} else if(type == 7) {
			reamk = '<p>血瘀体质的你是……其实很年轻，脸上永远都似蒙着一层灰，晦暗地怎么洗都洗不干净；</p>'+
					'<p>别人磕碰一下没事，你却身上红一块紫一块；本是挤得出水的肤质，你却偏偏干燥粗糙；</p>'+
					'<p>总而言之，你经常被无形抬高年龄。</p>'+
					'<p>血瘀体质的您一定要多顺气啊！没事儿别老生气，平时多喝点红茶、青茶、黑茶及花茶。</p>';
		} else if(type == 8) {
			reamk = '<p>气郁体质的你是……李清照的气质，多愁善感、脆弱忧伤；</p>'+
					'<p>祥林嫂的身体，动不得、睡不着是家常事；</p>'+
					'<p>白毛女的容貌，虽年纪轻轻，却是一副冬天被霜打蔫儿、摧残后的掉价白菜的模样...</p>'+
					'<p>总之，如今是一个讲究健康的时代，“林妹妹”早就不吃香了。</p>'+
					'<p>如果你是个气郁体质的人儿，又喜欢喝茶，尽量喝绿茶、青茶、红茶。</p>';
		} else if(type == 9) {
			reamk = '<p>特禀体质即过敏体质。特禀体质的你是……看似小身板不错，鼻涕喷嚏却从未离你而去；因为一点点花粉就能分分钟放倒你；</p>'+
					'<p>别人的美味海鲜，可能是你的致命杀手……总而言之，一旦遇到特定物质，身体就会迅速有过敏反应。</p>'+
					'<p>特禀体质的你，堪称人类中最脆弱的纸片人，绝对的重点保护对象.</p>'+
					'<p>敏感体质的你如果心里时刻住着一伙儿茶虫，实在忍受不住它们的调皮，不妨选择绿茶、青茶、黑茶。</p>';
		}
		return reamk;
	},
 	/*获取推荐商品*/
	getProdsByconsId : function(id) {
		var that = this;
		var data = {constitutionInfoId : id};
		var html = ""
		common.commAjax({
 			type : "POST",
 			url : "product/getProductByConstitutionInfoId",
 			data : data,
 			success : function(result) {
 				html = that.goodsListHtml(result);
 				var $result = $("#resultWrap");
 				if(html == "") {
 					html = "<p class='no-data'>未找到该体质的茶叶</p>"
 				}
 				$result.find(".prod-list").empty().append(html);
 			}
 		});
	},
	goodsListHtml : function(jsonData) {
		var str = "";
		if(jsonData.length) {
			$.each(jsonData, function(key, item) {
				var imgpath = item.productWapImage,
					name = item.productName,
					url = "/wap/view/detail?productId=" + item.productId;
				str += '<li class="p-item">'+
	                      '<a href="'+url+'"><div class="pro-img">'+
	                      '<img src="'+imgpath+'">'+
	                      '</div>'+
	                        '<p class="zh">'+name+'</p></a>'+
	                  '</li>'
			});
		}
		return str;
	}
 }
/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
 var shareModule = {
 	 init : function() {
 	 	var id = common.getParamsString("id");
 	 	var that = this;
 	 	if(id) {
 	 		var $share = $("#shareWrap");
 	 		common.commAjax({
	 			type : "POST",
	 			url : "constitution/getConstitutionTestRecord",
	 			data : {constitutionTestRecordId : id},
	 			success : function(result) {
	 				var cons = JSON.parse(result.constitutionTestRecordContent);
	 				if(cons) {
	 					var array = [];
	 					$.each(cons.grades, function(key, item) {
	 						array[key] = item.sub;
	 					});
	 					that.createEchart(array);
	 					$share.find(".cons-name").text(that.returnConsStr(cons.type));
	 					var reamk = that.returnConsContent(cons.type);
	 					$share.find(".reamk").empty().append(reamk)
	 				} else {
	 					window.location.href = "/web/view/choose/"
	 				}
	 				
	 			}
	 		});
 	 	} else {
 	 		window.location.href = "/web/view/choose/"
 	 	}
 	 },
 	 createEchart : function(array) {
 	 	var myChart = echarts.init(document.getElementById('cons'));
	    option = {
		    title: {
		        text: '',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: '{c}分为{b}'
		    },
		    legend: {
		        left: 'left',
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data: ["平和","气虚","阳虚","阴虚","痰湿","湿热", "血瘀", "气郁", "特禀"],
		        nameTextStyle : {
		        	color:"#FFF"
		        },
		        axisLabel : {
		        	textStyle: {
				        fontSize: 14,
				        color: '#FFF'
				    }
		        }
		        
		    },
		    yAxis: {
		        max : 100,
		        interval : 20,
		        show : false,
		        splitLine : {
		        	show : false
		        }
		    },
		    axisLine : {
		    	show : true
		    },
		    series: [
		        {
		            name: '体质分数',
		            type: 'line',
		            data: array,
		             tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b}体质 : {c}'
				    },
		            itemStyle : {
		            	normal : {
		            		color:"#FFF"
		            	}
		            },
		            lineStyle : {
		            	normal : {
		            		color : "#FFF"
		            	}
		            },
		             markLine: {
		             	symbol : "arrow",
		             	symbolSize : 1,
		                data: [
		                     {
		                     	name : "倾向",
						        yAxis: 30
						        
						    },
						    {
						        yAxis: 40,
						        name : "判定",
						        lineStyle: {
				                    normal: {
				                        type: 'solid'
				                    }
				                },
						    }
		                ]
		            }
		        }
		    ]
		};
	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
 	 },
  	returnConsStr : function(type) {
		var str = ""
		if(type == 1) {
			str = "平和体质";
		} else if(type == 2) {
			str = "气虚体质";
		} else if(type == 3) {
			str = "阳虚体质";
		} else if(type == 4) {
			str = "阴虚体质";
		} else if(type == 5) {
			str = "痰湿体质";
		} else if(type == 6) {
			str = "湿热体质";
		} else if(type == 7) {
			str = "血瘀体质";
		} else if(type == 8) {
			str = "气郁体质";
		} else if(type == 9) {
			str = "特禀体质";
		}
		return str;
	},
	returnConsContent : function(type) {
		var reamk = "";
		if(type == 1) {
			reamk = '<p class="tit">你的好友居然是令人艳羡、值得称赞的平和体质。平和质应有的特点：体型比较匀称；皮肤光洁如初；很少对人发怒；善于社交沟通。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：不熬夜，吃早餐，常运动，多微笑</p>'+
					'<p>不要：睡懒觉，吃宵夜，长时间看电脑</p>';
		} else if(type == 2) {
			reamk = '<p class="tit">你的好友是气虚体质，所以他可能总是一副软绵绵、懒洋洋的样子；或者经常丢三落四的。朋友中头几个感冒的总是他，还经常不开心。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：早起沐浴阳光，口味清淡滋润， 多些耐心</p>'+
					'<p>不要：暴饮暴食，运动过度，吃宵夜，过多关注自己。</p>';
		} else if(type == 3) {
			reamk = '<p class="tit">你的好友是阳虚体质，所以他可能会穿的特多，却还是喊着冷；会常常咬到自己的舌头；顶着一对儿熊猫眼；情绪低落，积极不起来</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：细嚼慢咽，培养一个爱好，早睡早起，参加公益，分享爱心。</p>'+
					'<p>不要：吃冷饮，熬夜，久坐不动，心生怨念。</p>';
		} else if(type == 4) {
			reamk = '<p class="tit">你的好友是阴虚体质，所以他可能喜欢光脚踩着凉地板；最爱喝冷饮；皮肤苍白或者泛红；总是一副干到脱水的样子；脾气暴躁。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：早起沐浴阳光，口味清淡滋润， 多些耐心</p>'+
					'<p>不要：超过23点睡觉，怒火中烧，大汗淋漓</p>';
		} else if(type == 5) {
			reamk = '<p class="tit">你的好友是痰湿体质，所以他可能容易发胖或者已经发胖；脚步声音，屁股坐下去就不爱起来；不喜欢喝水；脾气好，性格温和。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：吃到七分饱，规律运动，泡泡热水澡，细嚼慢咽</p>'+
					'<p>不要：喝冷饮，思虑过度，暴饮暴食</p>';
		} else if(type == 6) {
			reamk = '<p class="tit">你的好友是湿热体质，所以他可能脸上看起来总像洗不干净；经常东一片、西一片的冒痘出来；飘飘然过留下一股汗味儿；遇事紧张兮兮；时不常怒发冲冠。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：23点前睡觉，一起去运动，保持欢喜并淡定</p>'+
					'<p>不要：烟酒过度，久处潮湿之地，大鱼大肉</p>';
		} else if(type == 7) {
			reamk = '<p class="tit">你的好友是血瘀体质，所以他可能脸上有一些暗暗的痤疮印；喜欢摆一副耗呆的表情；丢三落四的爱忘事儿；经常心烦气躁。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：培养一个爱好，适度运动，早起早睡</p>'+
					'<p>不要：独自怨念，饮食寒凉，暴饮暴食</p>';
		} else if(type == 8) {
			reamk = '<p class="tit">你的好友是气郁体质，所以他可能脸色发黄，没有光泽；经常听到莫名其妙地叹气声；脾气古怪，常在郁闷、发邪火之间摆荡。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：充分表达，知足常乐，在阳光下运动，参与公益，分享爱心</p>'+
					'<p>不要：暴饮暴食，冲动购物，熬夜伤神</p>';
		} else if(type == 9) {
			reamk = '<p class="tit">你的好友是特禀体质，所以他可能喷嚏一连打好几个；这个碰不得，那个碰不得，万事小心翼翼；皮肤一抓就红了，并出现抓痕。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：口味清淡自然，情绪从容大度，起居规律不熬夜</p>'+
					'<p>不要：劳汗当风，暴饮暴食，积攒压力</p>';
		}	
		return reamk;
	}
 }
/*
 * author pizhenhua
 * day 2017-7-13
 * 商品详情js
 */
 var detailModule = {
 	init : function() {
 		this.getDetailInfo();
 		this.pageEvent();
 	},
 	/*获取详情信息*/
 	getDetailInfo : function() {
 		var that = this;
 		var productId = common.getParamsString("productId");
 		if(productId) {
 			common.commAjax({
	 			type : "POST",
	 			url : "product/detail",
	 			data : {productId : productId},
	 			success : function(result) {
	 				if(result) {
	 					var $page = $("#detailPage");
	 					$page.find(".detail-content").empty().append(result.productDetailPc).show();
	 					$page.find(".prod-name").text(result.productName);
	 					$("#jd").attr("href" , result.jdPurchaseAddress);
	 					$("#youzan").attr("href" , result.youzanPurchaseAddress);
	 					$("#productOuterPacking").attr("src" , result.productOuterPacking);
	 					$("#productInnerPacking").attr("src" , result.productInnerPacking);
	 					that.reportShow(result.reports);

	 					$('meta[name="description"]').attr("content", result.content);
	 					$('meta[name="keywords"]').attr("content", result.productSEO);
	 					document.title = result.productName;
	 				}
	 				
	 			}
	 		});
 		}
 	},
 	pageEvent : function() {
 		var $page = $("#detailPage"), $report = $("#reportLayer");
 		$report.css("height", window.screen.height);
 		$page.find(".look-reports").click(function() {
 			$report.css("top", 0);
 		});
 		$report.find(".close").click(function() {
 			$report.css("top", "-200%");
 		});
 	},
 	/*报告*/
 	reportShow : function(reports) {
 		if(!reports) return;
 		var jsonData = JSON.parse(reports);
 		var html = "";
 		$.each(jsonData,  function(key, item) {
 			var url = item.url;
 			if(key == 0) {
 				$("#reportMain").attr("src", url);
 			}
 			html += '<div class="swiper-slide">'+
                      '<img src="'+url+'" >'+
                    '</div>';
 		});
 		$("#reportLayer").find(".swiper-wrapper").empty().append(html);
 		setTimeout(function() {
			 var swiper = new Swiper('.swiper-container', {
					grabCursor: true,
					paginationClickable: true,
					calculateHeight : true,
		    });
			$('.swiper-button-next').on('click', function(e){
				e.preventDefault()
				swiper.swipePrev()
			})
			$('.swiper-button-prev').on('click', function(e){
				e.preventDefault()
				swiper.swipeNext()
			})
		},1000);
 	},
 	/*详情内容--作废*/
 	detailInfoHtml : function(data) {
 		var list = data.productDetailBOList, html = "";
 		var length = list.length;
 		if(length) {
 			var $swiper = $("#detailPage").find(".swiper-wrapper");
 			for(var i = 0; i < length; i++) {
 				var item = list[i];
 				var bgImg = item.productPcBgImage,
 					descImg = item.productDetailDescribeImage;
				html += '<div class="swiper-slide" style="background:url('+bgImg+') no-repeat center center;background-size: cover;"> <div class="container"><div class="slide-left ">'+
						'<p class="con-text"><img src="'+descImg+'"><a href="javascript:viod(0)"  class="buy btn-event">京东旗舰店</a></p></div></div></div>';
 			}
 			$swiper.html("").append(html);
 			var mySwiper = new Swiper('.swiper-container',{
			    pagination: '.pagination',
			    paginationClickable: false,
			    mode: 'vertical',
			    loop : true,
			    onSlideChangeEnd: function(swiper){
					
				}
		  })
 		}
 	}
 }
/*
 * author pizhenhua
 * day 2017-7-13
 * 茶礼js
 */
 var giftModule = {
 		swiper : null,
 		init : function() {
 			var count = $("#giftPage").find(".swiper-slide").length;
 			this.swiper = new Swiper('.swiper-container',{
			    paginationClickable: false,
			    mode: 'vertical',
			    keyboardControl : true,
			    mousewheelControl : true,
			    speed:600,
				resistance : "100%",
			  })
			this.pageEvent();
 		},
 		pageEvent : function() {
 			/*提交*/
 			var that = this;
 			var $form = $("#giftSwiper").find(".gift-info");
 			$form.find(".confirm").click(function() {
 				var $mes = $(".error-message");
 				var name = $form.find(".name").val(),
 					phone = $form.find(".phone").val(),
 					remark = $form.find(".remark").val();
				var error = "";
				function checkTel(tel)
				{
				   var mobile = /^1[3|5|8]\d{9}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
				   return mobile.test(tel) || phone.test(tel);
				}
				if(name == "") {
					error = "请填写姓名！";
				} else if (phone == ""){
					error = "请填写电话！";
				} else if(!checkTel(phone)) {
					error = "电话输入有误"
				}
				if(error != "") {
					$mes.find(".con").text(error);
					$mes.fadeIn(2000, function() {
						$mes.fadeOut(2000);
					});
				} else {
					var params = {
						customerName : name,
						phone : phone,
						remark : remark
					}
					that.saveGiftInfo(params);
				}
				
 			});

 			$("#giftSwiper").find(".gift-event").click(function() {
 					that.swiper.swipeNext();
 			});
 			$(".arrow").click(function() {
					that.swiper.swipeNext();
 			});
 		},
 		/*提交定制信息*/
 		saveGiftInfo : function(params) {
 			var that = this;
 			common.commAjax({
	 			type : "POST",
	 			url : "customize/add",
	 			data : params,
	 			success : function(result) {
	 				var $mes = $(".error-message");
		 			$mes.find(".con").text("提交成功！");
					$mes.fadeIn(2000, function() {
						$mes.fadeOut(3000);
					});
	 			}
	 		});
 		}
 }
/*
 * author pizhenhua
 * day 2017-7-13
 * 主页js
 */
var indexModule = {
	init : function() {
		this.getTeaList();
		this.pageEvent();
	},
	pageEvent : function() {
		var mainCount = $('.swiper-container').find(".swiper-main").length;
		var swiperObj = new Swiper('.swiper-container',{
			mode: 'vertical',
			keyboardControl : true,
			mousewheelControl : true,
			speed:600,
			resistance : "100%",
			onSlideChangeEnd: function(swiper){
				var index = swiperObj.activeIndex;
				var $footer = $(".footer-fixed");
				if(index == mainCount - 1) {
					$footer.removeClass("footer-hide").css("bottom",-$footer.height());
					$footer.delay(50).animate({bottom:0},500);
					$(".arrow").hide();
				} else {
					$footer.addClass("footer-hide");
					$(".arrow").show();
				}
			}
		})
		$("#swiperDown").click(function() {
			swiperObj.swipeNext();
		});
	},
	getTeaList : function() {
		var that = this;
		common.commAjax({
 			type : "POST",
 			url : "product/list",
 			success : function(result) {
 				if(result.length > 0) {
 					that.teaSwiperResolve(result);
 				}
 			}
 		});
	},
	/*主页茶的轮播*/
	teaSwiperResolve : function(result) {
		var swiperHtml = "", teaHtml = "", teaReamkHtml = "", that = this;
		$.each(result, function(key, item) {
				var url = "/web/view/detail?productId=" + item.productId,
					backImg = item.productBGPC,
					productIcon = item.productIcon,
					brefDesc = item.brefDesc,
					productPcImage = item.productPcImage;
                teaReamkHtml += '<div class="p-item '+brefDesc+'">'+
	                                  '<div class="p-img">'+
	                                      '<img src="'+productPcImage+'" />'+
	                                  '</div>'+
	                                  '<p class="p-name">'+item.productName+'</p>'+
	                                  '<p class="p-remak">'+item.content+'</p>'+
	                                  '<a href="'+url+'" class="p-detail">查看详情</a>'+
                              '</div>';
		});
		$(".tea-map .prod-reamk").empty().append(teaReamkHtml).find(".tea-1").addClass("active");
	    that.mapEvent();
	},
	/*地图上的事件*/
	mapEvent : function() {
		var productInfo = function($obj) {
			$(".tea-map").find(".t-item").removeClass("active");
			$obj.addClass("active");
			var checkTea = $obj.attr("value");
			if(checkTea) {
				var $prodWrap = $(".prod-reamk");
				$prodWrap.find(".p-item").removeClass("active");
				$prodWrap.find("." + checkTea).addClass("active");
			}
		}
		$(".tea-map").find(".t-item").click(function() {
			productInfo($(this));
		});
		$(".tea-map").find(".t-item").hover(function() {
			productInfo($(this));
		});
	}
}
var newsModule = {
	init: function() {
		this.getNewsList();
	},
	/*获取新闻列表*/
	getNewsList: function() {
		var that = this;
		common.commAjax({
			type: "POST",
			url: "news/list",
			data: {
				pageNum: page,
				pageSize: 5
			},
			success: function(result) {
				console.log(result)
				that.goodsState = 1;
				that.NewsListHtml(result.resultList);
				if($(".page>a").length < 3) {
					that.pageCreard(result.totalPage);
				}
			}
		});
	},
	/*添加新闻列表*/
	NewsListHtml: function(data) {
		if(data) {
			var length = data.length;
			var html = "";
			var $list = $(".news-list");
			$list.empty();
			for(var i = 0; i < length; i++) {
				var item = data[i];
				var name = item.title,
					img = item.mainPicture,
					time = item.publishTime,
					content = item.briefContent,
					url = "/web/view/news-details?newsId=" + item.id;
				html += '<div class="news-item" id=' + item.id + '>' +
					'<div class="pull-left"><img  src="' + img + '" /></div>' +
					'<div class="pull-right news-right">' +
					'<h4>' + name + '</h4>' +
					'<p class="news-time">' + time + '</p>' +
					'<p class="news-content">' + content + '</p>' +
					'<a href="'+url+'">了解详情</a>' +
					'</div></div>';
			}
			$list.append(html);
		}
	},
	toPage : function(status,event) {
		if(status=="prop"){
			if(page>1){
				page--;
				$(".page-num").eq(page-1).addClass('active').siblings().removeClass('active');
				this.getNewsList();
			}
		}else if(status=="next"){
			var maxPage=$(".page .page-num").length;
			if(page<maxPage){
				page++;
				$(".page-num").eq(page-1).addClass('active').siblings().removeClass('active');
				this.getNewsList();
			}
		}else{
			$(event).addClass('active').siblings().removeClass('active');
			page=status;
			this.getNewsList();
		}
	},
	/*分页*/
	pageCreard : function(totalPage) {
		if(totalPage) {
			var str = "";
			for(var i = 0; i < totalPage; i++) {
				var page=i+1;
				str += '<a href="javascript:;" class="page-num '+(i==0?"active":"")+'" onclick="newsModule.toPage(' + page + ',this)">'+page+'</a>';
			}
			$(".prev").after(str);
		}
	}
}
var newsDetailModule = {
	init: function() {
		this.getNewsList();
	},
	/*获取新闻列表*/
	getNewsList: function() {
		var that = this;
		common.commAjax({
			type: "POST",
			url: "news/detail",
			data: {
				id: common.getParamsString("newsId")
			},
			success: function(result) {
				that.NewsListHtml(result);
			}
		});
	},
	/*添加新闻列表*/
	NewsListHtml: function(data) {
		if(data) {
			var length = data.length;
			var html = "";
			var $list = $(".news-body");
			$list.find("h1").text(data.title);
			$list.find(".news-time").text(data.publishTime);
			$list.find(".synopsis").text(data.briefContent);
			$list.find(".content").append(data.detailContent);
			if(data.lastId)
				$(".page").append("<a href=\"/web/view/news-details?newsId=" + data.lastId + "\" class=\"prev\">上一篇：" + data.lastTitle + "</a>");
			else
			$(".page").append("<a href=\"javascript:;\" class=\"prev\">已经是第一篇了</a>");
			if(data.nextId)
				$(".page").append("<a href=\"/web/view/news-details?newsId=" + data.nextId + "\" class=\"prev\">下一篇：" + data.nextTitle + "</a>");
			else
			$(".page").append("<a href=\"javascript:;\" class=\"prev\">已经是最后一篇了</a>");
		}
	}
}
var productModule = {
	init : function() {
		this.getGoodsList();
	},
	/*获取产品列表*/
 	getGoodsList : function(){
 		var that = this;
 		common.commAjax({
 			type : "POST",
 			url : "product/list",
 			success : function(result) {
 				that.goodsState = 1;
 				that.goodsListHtml(result);
 				
 			}
 		});
 	},
 	/*商品列表*/
 	goodsListHtml : function(data) {
 		if(data) {
			var length = data.length;
			var html = "";
			var $list = $("#prodList");
			for(var i = 0;i < length; i++) {
				var item = data[i];
				var name = item.productName,
					img =item.productWapImage,
					url = "/web/view/detail?productId=" + item.productId;
                html += '<li class="p-item">'+
                			'<a href="'+url+'">'+
                			'<div class="pro-img"><img src="'+img+'" alt="'+name+'"></div>'+
                			'<p class="zh">'+name+'</p></a>'+
            			'</li>'
				
			}
			$list.append(html);
		}
 	}
}

/*茶事*/
var storyNewModule = {
	swiper : null,
	init : function() {
		var state = 0, activeIndex = 0;
		this.swiper = new Swiper('.swiper-container',{
		    paginationClickable: false,
		    mode: 'vertical',
		    speed:800,
		    moveStartThreshold : 80,
		    resistance : "100%",
		    keyboardControl : true,
			mousewheelControl : true,
		    cssWidthAndHeight : true,
		    onTouchStart : function(swiper) {
		    },
		    onTouchMove : function(swiper) {
		    },
		    onSlideChangeEnd: function(swiper, x, y){
		    	if(swiper.activeIndex > 0) {
		    		$(".head-wrap").addClass("head-active")
		    	} else {
		    		$(".head-wrap").removeClass("head-active")
		    	}
		    	var $footer = $(".footer-fixed");
		    	if(swiper.activeIndex == 4) {
		    		$(".slide-5").addClass("last-slide");
		    		$footer.removeClass("footer-hide").css("bottom",-$footer.height());
					$footer.delay(500).animate({bottom:0},500);
					$(".arrow").hide();
		    	} else {
					$(".slide-5").removeClass("last-slide");
					$footer.addClass("footer-hide");
					$(".arrow").show();
		    	}
		     	
		    }
		  });
		
		this.pageEvent();
	},
	pageEvent: function() {

		var $storyNew = $("#storyNew"), that = this;
		$storyNew.find(".main-layer .more-nar").click(function() {
			that.swiper.swipeNext();
		});
		$storyNew.find(".two-layer .more-nar").click(function() {
			that.swiper.swipeNext();
		});
		$storyNew.find(".three-layer .more-nar").click(function() {
			that.swiper.swipePrev();
		});
		$(".arrow").click(function() {
			that.swiper.swipeNext();
		});
	}
}
var editModule = {
	rowId : null,
	init : function() {
		this.rowId = common.getParamsString("id");
		if(this.rowId) {
			this.getUserInfo(this.rowId);
		}
		this.pageEvent();
	},
	pageEvent : function() {
		var $page = $(".user-edit-page"), that = this;
		/*下一步*/
		var len = $page.find(".info-con>.panel").length;
		$page.find(".next").click(function() {
			var $that = $(this);
			var $active = $page.find(".p-active");
			if(!that.verificationForm($active, $active.index())) return false;
			var $next = $active.next();
			var index = $next.index();
			if($next.length) {
				$active.removeClass("p-active").css("left", "100%");
				$next.addClass("p-active").animate({
					left : 0
				});
			}
			if(index == len - 1) {
				$page.find(".next").hide();
				$page.find(".confirm").show();
			} else {
				if(index > 0) {
					$page.find(".prev").show();
				} else {
					$page.find(".prev").hide();
				}
			}
			
		});

		/*上一步*/
		$page.find(".prev").click(function() {
			var $that = $(this);
			var $active = $page.find(".p-active");
			var $prev = $active.prev();
			var index = $prev.index();
			if($prev.length) {
				$active.removeClass("p-active").css("left", "100%");
				$prev.addClass("p-active").animate({
					left : 0
				});
			}
			if(index > 0) {
				$page.find(".prev").show();
			} else {
				$page.find(".prev").hide();
			}
			$page.find(".next").show();
			$page.find(".confirm").hide();
		});

		$page.find(".check-item").click(function() {
			var $that = $(this);
			var $parent = $that.parent();
			if($parent.hasClass("more-check")) {
				if($that.hasClass("active")) {
					$that.removeClass("active");
				} else {
					$that.addClass("active");
				}
				
			} else {
				$parent.find(".check-item").removeClass("active");
				$that.addClass("active");
			}
		});

		/*提交*/
		$page.find(".confirm").click(function() {
			var $page = $(".user-edit-page");
			var $html = $('<div class="error-mes"><span>正在提交中...</span></div>');
			$page.append($html);
			$html.fadeIn();
			var params = that.readFormData();
			var url = "customerInfo/add";
			if(that.rowId) {
				params.id = that.rowId;
				url = "customerInfo/edit"
			}
			common.commAjax({
	 			type : "POST",
	 			url : url,
	 			data : params,
	 			success : function(result) {
	 				if(result) {
	 					window.location.href = "/web/view/user/"
	 				}
	 			},
	 			error : function() {
	 				$html.hide();
	 				that.errorMessage("提交失败！");
	 			}
	 		});
		});
	},
	errorMessage : function(mes) {
		var $page = $(".user-edit-page");
		var $html = $('<div class="error-mes"><span>'+mes+'</span></div>');
		$page.append($html);
		$html.fadeIn(function() {
			$html.delay(1000).fadeOut(function() {
				$html.remove();
			});
		})
	},
	verificationForm : function($form, index) {
		var that = this;
		var bool = true, str = "";
		if(index == 0) {
			var userName = $("#userName").val();
			if(!userName) {
				bool = false;
				str = "姓名不能为空！"
			}
		} else if(index) {
			var tel = $("#tel").val();
			if(!tel) {
				bool = false;
			    str = "电话不能为空！"
			} else if(!(/^1(3|4|5|7|8)\d{9}$/.test(tel))) {
				bool = false;
			    str = "电话有错误，请重填！"
			}
		}
		if(!bool) {
			that.errorMessage(str);
		}
		return bool;
	},
	readFormData : function() {
		var userName = $("#userName").val(),
			sex = $("#sex").find(".active").attr("value"),
			birthday = $("#birthday").val(),
			tel = $("#tel").val(),
			weixin = $("#weixin").val(),
			card = $("#card").val(),
			ditch = $("#ditch").val(),
			address = $("#address").val(),
			drink = $("#drink").find(".active").attr("value"),
			frequency = $("#frequency").find(".active").attr("value");
		var $purposes = $("#purpose").find(".active"),purposes = "";
		var pLen = $purposes.length;
		$.each($purposes, function(key) {
			var $that = $(this);
			if(key == pLen - 1) {
				purposes += $that.attr("value");
			} else {
				purposes += $that.attr("value") + ","
			}
			
		});
		var $flavors = $("#flavor").find(".active"),flavors = "";
		var fLen = $flavors.length;
		$.each($flavors, function(key) {
			var $that = $(this);
			if(key == fLen - 1) {
				flavors += $that.attr("value");
			} else {
				flavors += $that.attr("value") + ","
			}
			
		});
		var $industrys = $("#industry").find(".active"),industrys = "";
		var iLen = $industrys.length;
		$.each($industrys, function(key) {
			var $that = $(this);
			if(key == iLen - 1) {
				industrys += $that.attr("value");
			} else {
				industrys += $that.attr("value") + ","
			}
			
		});
		return {
			realName : userName,
			gender : sex,
			birthday : birthday,
			phone : tel,
			wx : weixin,
			identifyCardNum : card,
			channel : ditch,
			address : address,
			hasDrinkTeaHabit : drink,
			drinkTeaRate : frequency,
			forUse : purposes,
			flavorHabit : flavors,
			industryOwned : industrys
		}
	},
	getUserInfo : function(id) {
		if(!id) return false;
		var userInfoCallBack = function(info) {
				console.log(info);
				$("#userName").val(info.realName);
				$("#birthday").val(info.birthday);
				$("#tel").val(info.phone);
				$("#weixin").val(info.wx);
				$("#ditch").val(info.channel);
				$("#card").val(info.identifyCardNum);
				$("#address").val(info.address);
				if(info.gender != "" || info.gender != undefined){
					$("#sex").find(".check-item[value='"+info.gender+"']").addClass("active");
				}
				if(info.hasDrinkTeaHabit != "" || info.hasDrinkTeaHabit != undefined){
					$("#drink").find(".check-item[value='"+info.hasDrinkTeaHabit+"']").addClass("active");
				}
				if(info.drinkTeaRate != "" || info.drinkTeaRate != undefined){
					$("#frequency").find(".check-item[value='"+info.drinkTeaRate+"']").addClass("active");
				}
				if(info.forUse != "" || info.forUse != undefined){
					var ary = info.forUse.split(",");
					var $purpose = $("#purpose");
					$.each(ary, function(key, item) {
						$purpose.find(".check-item[value='"+item+"']").addClass("active");
					});
					
				}
				if(info.flavorHabit != "" || info.flavorHabit != undefined){
					var ary = info.flavorHabit.split(",");
					var $flavor = $("#flavor");
					$.each(ary, function(key, item) {
						$flavor.find(".check-item[value='"+item+"']").addClass("active");
					});
					
				}
				if(info.industryOwned != "" || info.industryOwned != undefined){
					var ary = info.industryOwned.split(",");
					var $industry = $("#industry");
					$.each(ary, function(key, item) {
						$industry.find(".check-item[value='"+item+"']").addClass("active");
					});
					
				}
		}
		common.commAjax({
 			type : "POST",
 			url : "customerInfo/detail",
 			data : {"id" : id},
 			success : function(result) {
 				if(result) {
 					userInfoCallBack(result);
 				}
 			}
 		});
		
		
	}
}
var userModule = {
	selectPageSize : 0,
	init : function() {
		this.getUserlist(1);
	},
	createRowData : function(rowDatas) {
		if(!rowDatas) return false;
		var rowhtml = "", that = this;
		$.each(rowDatas,  function(key, item) {
			var index = key + 1;
			var sex = item.gender == 0 ? "男" : "女",
				drink = item.hasDrinkTeaHabit == 0 ? "有" : "无";
			var frequency = "一天一次";
			if(item.drinkTeaRate == 1) {
				frequency = "一天多次"
			} else if(item.drinkTeaRate == 2) {
				frequency = "平时不喝接待客人才喝"
			}
			var purpose = that.returnPurposeType(item.forUse);
			var teaArray = that.returnTeaType(item.flavorHabit);
			var industry = that.returnIndustryType(item.industryOwned);
			var editPath = "/web/view/user/edit.html?id=" + item.id;
			if(key%2 == 0) {
				rowhtml += '<tr>';
			} else {
				rowhtml += '<tr class="even">';
			}
			var id = "'" + item.id + "'";
             rowhtml += '<td>'+index+'</td>'+
                        '<td>'+item.realName+'</td>'+
                        '<td>'+sex+'</td>'+
                        '<td>'+item.birthday+'</td>'+
                        '<td>'+item.phone+'</td>'+
                        '<td>'+item.wx+'</td>'+
                        '<td>'+item.channel+'</td>'+
                        '<td>'+item.address+'</td>'+
                        '<td>'+drink+'</td>'+
                        '<td>'+frequency+'</td>'+
                        '<td>'+purpose+'</td>'+
                        '<td>'+teaArray+'</td>'+
                        '<td>'+industry+'</td>'+
                        '<td>'+
                            '<a href="'+editPath+'" class="edit-row">编辑</a>'+
                            '<a href="javascript:void(0)" class="del-row" onclick="userModule.delRowData('+id+')">删除</a>'+
                        '</td>'+
                    '</tr>';
		});
		var $list = $("#userList");
		$list.find("tbody").empty().append(rowhtml);
		

	},
	delRowData : function(id) {
		var that = this;
		var r = confirm("确定删除该行数据!");
		if (r == true){
			common.commAjax({
	 			type : "POST",
	 			url : "customerInfo/delete",
	 			data : {"id" : id},
	 			success : function(result) {
 					that.errorMessage("删除成功");
 					that.getUserlist(that.selectPageSize);
	 			},
	 			error : function() {
	 				that.errorMessage("删除失败");
	 			}
	 		});
		} 
	},
	getUserlist : function(pageNum) {
		var that = this;
		common.commAjax({
 			type : "POST",
 			url : "customerInfo/list",
 			data : {"pageNum" : pageNum, "pageSize" : 10},
 			success : function(result) {
 				if(result) {
 					var totalCount = result.totalCount,
 						totalPage = result.totalPage,
 						userList = result.resultList,
 						currentPage = result.currentPage;
					that.createRowData(userList);
					that.selectPageSize = currentPage;
					$("#page").paging({
						pageNo : currentPage,
				        totalPage: totalPage,
				        totalSize: totalCount,
				        callback: function(num) {
				        	if(num != currentPage) {
				        		userModule.getUserlist(num)
				        	}
				        }
				    })
 				}
 				
 			}
 		});
		
	},
	returnPurposeType : function(str) {
		if(!str) return "";
		var teaArray = ["自饮","送人", "待客", "收藏"];
		var ary = str.split(",");
		var teaTypes = "";
		var len = ary.length;
		if(len > 0) {
			$.each(ary, function(key,item) {
				if(key == len - 1) {
					teaTypes += teaArray[item] ? teaArray[item] : "";
				} else {
					teaTypes += teaArray[item] ? teaArray[item] + ";" : "" ;
				}
			});
		}
		return  teaTypes;
		
	},
	returnTeaType : function(str) {
		if(!str) return "";
		var ary = str.split(",");
		var teaArray = ["龙井","碧螺春", "极白", "都匀毛尖", "信阳毛尖", "竹叶青", "白毫银针", "白牡丹", "生普", "熟普", "单丛", "大红袍", "铁观音", "其它"];
		var teaTypes = "";
		var len = ary.length;
		if(len > 0) {
			$.each(ary, function(key,item) {
				if(key == len - 1) {
					teaTypes += teaArray[item] ? teaArray[item] : "";
				} else {
					teaTypes += teaArray[item] ? teaArray[item] + ";" : "" ;
				}
			});
		}
		return  teaTypes;
		
	},
	returnIndustryType : function(str) {
		if(!str) return "";
		var ary = str.split(",");
		var teaArray = ["金融","地产", "科技", "艺术", "娱乐", "传媒", "公务员", "企业主", "其它"];
		var teaTypes = "";
		var len = ary.length;
		if(len > 0) {
			$.each(ary, function(key,item) {
				if(key == len - 1) {
					teaTypes += teaArray[item] ? teaArray[item] : "";
				} else {
					teaTypes += teaArray[item] ? teaArray[item] + ";" : "" ;
				}
			});
		}
		return  teaTypes;
	},
	errorMessage : function(mes) {
		var $page = $(".user-edit-page");
		var $html = $('<div class="error-mes"><span>'+mes+'</span></div>');
		$page.append($html);
		$html.fadeIn(function() {
			$html.delay(1000).fadeOut(function() {
				$html.remove();
			});
		})
	},
}