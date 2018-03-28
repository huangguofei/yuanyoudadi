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