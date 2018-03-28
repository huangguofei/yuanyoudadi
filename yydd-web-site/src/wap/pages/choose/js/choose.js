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