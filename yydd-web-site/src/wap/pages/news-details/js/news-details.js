var newsDetailModules = {
	init: function() {
		this.getNewsList();
	},
	/*获取新闻列表*/
	getNewsList: function() {
		var that = this;
		common.commAjax({
			type: "POST",
			url: "news/detail",
			data: {
				id: common.getParamsString("newsId")
			},
			success: function(result) {
				that.NewsListHtml(result);
			}
		});
	},
	/*添加新闻列表*/
	NewsListHtml: function(data) {
		if(data) {
			var length = data.length;
			var html = "";
			var $list = $(".news-body");
			$list.find("h1").text(data.title);
			$list.find(".news-time").text(data.publishTime);
			$list.find(".synopsis").text(data.briefContent);
			$list.find("img").attr("src",data.mainPicture);
			$list.find(".content").append(data.detailContent);
			
		}
	}
}