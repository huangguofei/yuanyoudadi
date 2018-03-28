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
 		var host = window.location.host, href = window.location.href;
		if(host.indexOf("yuanyoudadi.com") >= 0) {
			window.location.href = href.replace("yuanyoudadi.com", "naturalgiving.cn");
		}
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
/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
var chooseModule = {
	mySwiper : null,
	init : function() {
			var count = $("#chooseSwiper").find(".swiper-slide").length;
			this.mySwiper = new Swiper('.swiper-container',{
					paginationClickable: false,
					mode: 'vertical',
					speed:600,
					resistance : "100%",
					onSlideChangeEnd: function(swiper){
						
					}
			});
			$("#chooseSwiper").find(".swiper-wrapper").show();
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
				var type = $active.attr("key");
				window.location.href="/wap/view/choose/result.html?type=" + type;
			}
		});
		/*了解更多*/
		$choose.find(".slide-1 .btn-event").click(function() {
				_that.mySwiper.swipeNext();
		});
	},
	/*转换数字*/
	zhRepeatNum : function(index) {
		var key = ++index;
		var numArray = {
			1 : "一",
			2 : "二",
			3 : "三",
			4 : "四",
			5 : "五",
			6 : "六",
			7 : "七",
			8 : "八",
			9 : "九",
			10 : "十"
		}
		return numArray[key];
	},
	nextPgae : function() {
		alert(123)
	}
}
/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
 var quizModule = {
 	 init : function() {
 	 	var type = common.getParamsString("type");
 	 	if(!type) {
 	 		$("#subjectWrap").show();
 	 	} else {
 	 		this.submitChoose(1, type);
 	 	}
 	 	this.pageEvent();
 	 },
 	 pageEvent : function() {
 	 	var _that = this;
 	 	var $subject = $("#subjectWrap");
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
			if(!$activeItem.hasClass("cons-issue")) {
				var $next = $activeItem.removeClass("sub-active").next().addClass("sub-active");
				var nums = $subject.find(".cons-item").length;
				if($next.index() == nums - 1) {
					$subject.find(".next").hide();
					$subject.find(".confim").show();
				}
				if($next.index() > 0) {
					$subject.find(".prev").show();
				}
			} else {
				var len = $activeItem.find(".active").length,
					subLen = $activeItem.find(".issue").length;
				var $that = $(this);
				if(len < subLen) {
					$that.find(".info").fadeIn(2000, function() {
						$that.find(".info").fadeOut(2000);
					});
				} else {
					$activeItem.removeClass("sub-active");
					var $next = $activeItem.next();
					var index = $next.index();
					if(index > 0) {
						$activeItem.next().addClass("sub-active");
						$subject.find(".prev").show();
						$subject.find(".confim").hide();
					} else{
						$subject.find(".prev").hide();
					}
				}
			}
			
		});
		$subject.find(".prev").click(function() {
			var $activeItem = $subject.find(".sub-active");
			var len = $activeItem.find(".active").length,
				subLen = $subject.find(".sub-item").length,
				$that = $(this);
			$activeItem.removeClass("sub-active");
			var $prev = $activeItem.prev().addClass("sub-active");
			var index = $prev.index();
			if(index == 0) {
				$that.hide();
			} else if(index < subLen - 1) {
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
			if(len < subLen) {
				$that.find(".info").fadeIn(2000, function() {
					$that.find(".info").fadeOut(2000);
				});
			} else {
				var constitution = [];
				$subject.find(".cons-issue").each(function(n) {
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
	/*提交体质报告19febc93316741cf8e7f8cb8a4f6b93a*/
	submitChoose : function(constitution) {
		var _that = this;
		var $submit = $(".isSubmit");
		$submit.show();
		var consJson  = _that.detectionConstitution(constitution);
		var data = {testRecord : consJson.grades};
		common.commAjax({
 			type : "POST",
 			url : "constitution/addConstitutionTestRecord",
 			data : data,
 			success : function(result) {
 				$submit.hide();
 				window.location.href = "/wap/view/choose/result.html?id=" + result;
 			}
 		});
	}
	
 }
/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
 var resultModule = {
 	 init : function() {
 	 	var that = this;
 	 	var type = common.getParamsString("type"), id = common.getParamsString("id");
 	 	var $result = $(".result-wrap");
 	 	setTimeout(function() {
 	 		$result.show();
 	 	},100);
 	 	if(type) {
 	 		var name  = this.returnConsStr(type);
 	 		var reamk = this.returnConsReamk(type);
 	 		$result.find(".reamk").empty().append(reamk);
 	 		$result.find(".name").text(name);
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
	 					$result.find(".share").show();
	 					$("#copyUrl").text(window.location.protocol + "//" + window.location.host + "/wap/view/choose/share.html?id=" + id);
	 				} else {
	 					window.location.href = "/web/view/choose/";
	 				}
	 			}
	 		});
 	 	} else {
 	 		window.location.href = "/web/view/choose/";
 	 	}
 	 	this.getProdsByconsId(type);

 	 	this.pageEvent();
 	 },
 	 pageEvent : function() {
 	 	var _that = this;
		var $result = $(".result-wrap"), $share = $("#shareCon");
		$result.find(".re-next").click(function() {
	         $result.hide();
	         $(".recommend-wrap").show();
		});

 		$result.find(".share").click(function() {
			$share.show().animate({"bottom" : 0});
		});
		$share.find(".close").click(function() {
			$share.animate({"bottom" : -200}, function() {
					$share.hide();
			});
		});
 		var clipboard = new Clipboard('#idCopy',{
			text: function() {
				return $("#copyUrl").html();
			}
 		});
		clipboard.on('success', function(e) {
			//var msg = e.trigger.getAttribute('aria-label');
		    e.clearSelection();
		    $share.find(".copy .info").fadeIn(2000, function() {
				$share.find(".copy .info").fadeOut(2000);
			});
		});
		clipboard.on('error', function(e) {
			alert("复制失败，请手动复制");
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
					'<p>反正，你就像生命缺少太阳，暖什么的与你无缘...</p>'
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
			reamk = '<p>特禀体质即过敏体质。</p>'+
					'<p>特禀体质的你是……看似小身板不错，鼻涕喷嚏却从未离你而去；因为一点点花粉就能分分钟放倒你；</p>'+
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
		common.commAjax({
 			type : "POST",
 			url : "product/getProductByConstitutionInfoId",
 			data : data,
 			success : function(result) {
 				that.goodsListHtml(result);
 			}
 		});
	},
	goodsListHtml : function(jsonData) {
		if(jsonData.length) {
			var str = "";
			var $list = $(".recommend-wrap").find(".prod-list")
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
			$list.empty().append(str);
		}
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
	 					$share.find(".cons-name .name").text(that.returnConsStr(cons.type));
	 					var reamk = that.returnConsContent(cons.type);
	 					$share.find(".reamk").empty().append(reamk)
	 				} else {
	 					window.location.href = "/wap/view/choose/"
	 				}
	 				
	 			}
	 		});
 	 	} else {
 	 		window.location.href = "/wap/view/choose/"
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
				        fontSize: 12,
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
var commentModule = {
    commentData : {},
    init : function() {
      this.commentData.character = 0;
      this.commentData.experience = 0;
      this.commentData.speed = 0;
      this.pageEvent();
    },
    pageEvent : function() {
      var $page = $("#commentPage"), that = this;
      $page.find(".star-wrap .star").click(function() {
          var value = $(this).attr("value"), $parent = $(this).parent();
          $parent.find(".star").removeClass("active");
          $parent.find(".star:lt("+value+")").addClass("active");
          var type = $parent.attr("type");
          if(type == 1) {
            that.commentData.character = value;
          } else if(type == 2) {
            that.commentData.experience = value;
          } else if(type == 3) {
            that.commentData.speed = value;
          }
      });

      $("#confirm").click(function() {
          var info = that.commentData, errorStr = "";
          if( info.character == 0) {
              errorStr = "请为茶叶品质评分";
          } else if(info.experience == 0) {
               errorStr = "请为服务体验评分";
          } else if(info.speed == 0) {
               errorStr = "请为配送速度评分";
          }
          if(errorStr != "") {
              common.errorMessage(errorStr, $page);
          } else {
            var $html = $('<div class="error-mes"><span>正在提交...</span></div>');
            $page.append($html);
            var info = that.commentData, reamk = $("#reamk").val();
            var params = {
                quality : info.character,
                service : info.experience,
                deliverySpeed : info.speed,
                content : reamk
            }
            common.commAjax({
                type : "POST",
                url : "comment/add",
                data : params,
                success : function(result) {
                   window.location.href = "/wap/view/comment/success.html"
                },
                error : function() {
                    $html.hide();
                    var error = "服务器异常！"
                    common.errorMessage(error, $page);
                }
              });
            //alert($("#reamk").val());
           
          }
      });
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
	 					$page.find(".detail-content").empty().append(result.productDetailWap).show();
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
 				var bgImg = item.productWapBgImage,
 					descImg = item.productDetailDescribeImage;
				html += '<div class="swiper-slide" style="background:url('+bgImg+')"><div class="slide-left ">'+
						'<p class="con-text"><img src="'+descImg+'"></p></div><div class="opacity"></div></div>';
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
			    pagination: '.pagination',
			    paginationClickable: false,
			    mode: 'vertical',
			    speed:1000,
			    onSlideChangeEnd: function(swiper){
					var index = swiper.activeIndex;
					if(index == count - 1) {
						$(".pagination").hide();
					} else {
						$(".pagination").show();
					}
				}
			  })
 			$("#giftPage").find(".swiper-wrapper").show();
			this.pageEvent();
 		},
 		pageEvent : function() {
 			/*提交*/
 			var that = this;
 			var $form = $("#giftPage").find(".gift-form");
 			$form.find(".confirm").click(function() {
 				var $mes = $(".error-message");
 				var name = $form.find(".name").val(),
 					phone = $form.find(".phone").val(),
 					remark = $form.find(".remark").val();
				var error = "";
				if(name == "") {
					error = "请填写姓名！";
				} else if (phone == ""){
					error = "请填写电话！";
				}
				function checkTel(tel)
				{
				   var mobile = /^1[3|5|8]\d{9}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
				   return mobile.test(tel) || phone.test(tel);
				}
				if(!checkTel(phone)) {
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

 			$("#giftPage").find(".btn-event").click(function() {
 					that.swiper.swipeNext();
 			});
 		},
 		/*提交定制信息*/
 		saveGiftInfo : function(params) {
 			var that = this;
 			var $mes = $(".error-message");
 			$mes.find(".con").text("正在提交中...");
			$mes.fadeIn(2000, function() {
			});
 			common.commAjax({
	 			type : "POST",
	 			url : "customize/add",
	 			data : params,
	 			success : function(result) {
	 				$mes.hide();
	 				that.swiper.removeSlide(1);
					var successHtml = '<div class="swiper-slide slide-5"><div class="desc "><p class="gift-text-icon con-text"></p></div></div>';
					that.swiper.appendSlide(successHtml);
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
		var swiperHtml = "", $swiperProd = $(".swiper-prod"),$tea = $(".tea-map"), that = this;
		$.each(result, function(key, item) {
				var url = "/web/view/detail?productId=" + item.productId,
					brefDesc = item.brefDesc;
				var html = '<div class="p-img">'+
                              '<img src="'+item.productWapImage+'">'+
                          '</div>'+
                          '<div class="p-info">'+
                               '<p class="p-name">'+item.productName+'</p>'+
                                '<p class="p-remak">'+item.content+'</p>'+
                                '<a href="'+url+'" class="p-detail">查看详情</a>'+
                          '</div>'
				
              $swiperProd.find("." + brefDesc).append(html);
		});

		$swiperProd.show();
		var mySwiper = new Swiper('.swiper-prod',{
			autoplay : 5000,
			onSlideChangeEnd : function(swiper){
				var index = swiper.activeIndex;
				$tea.find(".t-item").removeClass("active");
				$tea.find(".tea-" + (index + 1)).addClass("active");
			}
		});
		$tea.find(".t-item").show();
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
				that.goodsState = 1;
				that.NewsListHtml(result.resultList);
				totalPage = result.totalPage;
			}
		});
	},
	/*添加新闻列表*/
	NewsListHtml: function(data) {
		if(data) {
			var length = data.length;
			var html = "";
			var $list = $(".news-list");
			for(var i = 0; i < length; i++) {
				var item = data[i];
				var name = item.title,
					img = item.mainPicture,
					time = item.timeCreated,
					content = item.briefContent,
					url = "/web/view/news-details?newsId=" + item.id;
				html += '<div class="news-item" id=' + item.id + '>' +
					'<div  class="pull-left"><img src="' + img + '" /></div>' +
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
	toPage: function(status) {
		if(page < totalPage) {
			page++;
			this.getNewsList();
		}
	}
}
var newsDetailModules = {
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
			$list.find("img").attr("src",data.mainPicture);
			$list.find(".content").append(data.detailContent);
			
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
				html += ' <li class="p-item"><a href="'+url+'"><div class="pro-img"><img src="'+img+'" alt="'+name+'">'+
                          '</div><p class="zh">'+name+'</p></a></li>'
				
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
		    onTouchStart : function(swiper) {
		    	state = swiper.touches.current;
		    	activeIndex = swiper.activeIndex;
		    },
		    onTouchMove : function(swiper) {
		    	if(swiper.touches.current - state > 100 && activeIndex != 2) {
		    		$(".main-layer").fadeIn();
		    	}
		    },
		    onSlideChangeEnd: function(swiper, x, y){
		     	if(swiper.activeIndex == 1 || swiper.activeIndex == 2) {
		     		if(activeIndex == 2) {
		     			$(".main-layer").hide();
		     		} else {
		     			$(".main-layer").fadeOut(500);
		     		}
		     		$(".head-wrap").addClass("head-back")
		     		$(".two-layer").addClass("active-layer");
		     	} else {
		     		$(".main-layer").fadeIn();
		     		$(".head-wrap").removeClass("head-back")
		     		$(".two-layer").removeClass("active-layer");
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
	}
}