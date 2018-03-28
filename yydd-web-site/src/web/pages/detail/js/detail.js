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
	 					$page.find(".detail-content").empty().append(result.productDetailPc).show();
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
 				var bgImg = item.productPcBgImage,
 					descImg = item.productDetailDescribeImage;
				html += '<div class="swiper-slide" style="background:url('+bgImg+') no-repeat center center;background-size: cover;"> <div class="container"><div class="slide-left ">'+
						'<p class="con-text"><img src="'+descImg+'"><a href="javascript:viod(0)"  class="buy btn-event">京东旗舰店</a></p></div></div></div>';
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