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