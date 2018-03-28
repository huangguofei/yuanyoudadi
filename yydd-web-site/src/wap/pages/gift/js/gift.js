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