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