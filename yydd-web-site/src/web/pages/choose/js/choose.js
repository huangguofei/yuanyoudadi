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