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