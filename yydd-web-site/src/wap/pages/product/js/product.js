var productModule = {
	init : function() {
		this.getGoodsList();
	},
	/*获取产品列表*/
 	getGoodsList : function(){
 		var that = this;
 		common.commAjax({
 			type : "POST",
 			url : "product/list",
 			success : function(result) {
 				that.goodsListHtml(result);
 				
 			}
 		});
 	},
 	/*商品列表*/
 	goodsListHtml : function(data) {
 		if(data) {
			var length = data.length;
			var html = "";
			var $list = $("#prodList");
			for(var i = 0;i < length; i++) {
				var item = data[i];
				var name = item.productName,
					img =item.productWapImage,
					url = "/web/view/detail?productId=" + item.productId;
				html += ' <li class="p-item"><a href="'+url+'"><div class="pro-img"><img src="'+img+'" alt="'+name+'">'+
                          '</div><p class="zh">'+name+'</p></a></li>'
				
			}
			$list.append(html);
		}
 	}
}