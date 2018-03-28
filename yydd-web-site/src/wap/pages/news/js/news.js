var newsModule = {
	init: function() {
		this.getNewsList();
	},
	/*获取新闻列表*/
	getNewsList: function() {
		var that = this;
		common.commAjax({
			type: "POST",
			url: "news/list",
			data: {
				pageNum: page,
				pageSize: 5
			},
			success: function(result) {
				that.goodsState = 1;
				that.NewsListHtml(result.resultList);
				totalPage = result.totalPage;
			}
		});
	},
	/*添加新闻列表*/
	NewsListHtml: function(data) {
		if(data) {
			var length = data.length;
			var html = "";
			var $list = $(".news-list");
			for(var i = 0; i < length; i++) {
				var item = data[i];
				var name = item.title,
					img = item.mainPicture,
					time = item.timeCreated,
					content = item.briefContent,
					url = "/web/view/news-details?newsId=" + item.id;
				html += '<div class="news-item" id=' + item.id + '>' +
					'<div  class="pull-left"><img src="' + img + '" /></div>' +
					'<div class="pull-right news-right">' +
					'<h4>' + name + '</h4>' +
					'<p class="news-time">' + time + '</p>' +
					'<p class="news-content">' + content + '</p>' +
					'<a href="'+url+'">了解详情</a>' +
					'</div></div>';
			}
			$list.append(html);
		}
	},
	toPage: function(status) {
		if(page < totalPage) {
			page++;
			this.getNewsList();
		}
	}
}