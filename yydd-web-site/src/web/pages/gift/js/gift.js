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