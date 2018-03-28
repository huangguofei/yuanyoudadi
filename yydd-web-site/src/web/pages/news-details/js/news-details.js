var newsDetailModule = {
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
			$list.find(".content").append(data.detailContent);
			if(data.lastId)
				$(".page").append("<a href=\"/web/view/news-details?newsId=" + data.lastId + "\" class=\"prev\">上一篇：" + data.lastTitle + "</a>");
			else
			$(".page").append("<a href=\"javascript:;\" class=\"prev\">已经是第一篇了</a>");
			if(data.nextId)
				$(".page").append("<a href=\"/web/view/news-details?newsId=" + data.nextId + "\" class=\"prev\">下一篇：" + data.nextTitle + "</a>");
			else
			$(".page").append("<a href=\"javascript:;\" class=\"prev\">已经是最后一篇了</a>");
		}
	}
}