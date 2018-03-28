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