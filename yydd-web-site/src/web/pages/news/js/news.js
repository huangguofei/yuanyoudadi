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
				console.log(result)
				that.goodsState = 1;
				that.NewsListHtml(result.resultList);
				if($(".page>a").length < 3) {
					that.pageCreard(result.totalPage);
				}
			}
		});
	},
	/*添加新闻列表*/
	NewsListHtml: function(data) {
		if(data) {
			var length = data.length;
			var html = "";
			var $list = $(".news-list");
			$list.empty();
			for(var i = 0; i < length; i++) {
				var item = data[i];
				var name = item.title,
					img = item.mainPicture,
					time = item.publishTime,
					content = item.briefContent,
					url = "/web/view/news-details?newsId=" + item.id;
				html += '<div class="news-item" id=' + item.id + '>' +
					'<div class="pull-left"><img  src="' + img + '" /></div>' +
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
	toPage : function(status,event) {
		if(status=="prop"){
			if(page>1){
				page--;
				$(".page-num").eq(page-1).addClass('active').siblings().removeClass('active');
				this.getNewsList();
			}
		}else if(status=="next"){
			var maxPage=$(".page .page-num").length;
			if(page<maxPage){
				page++;
				$(".page-num").eq(page-1).addClass('active').siblings().removeClass('active');
				this.getNewsList();
			}
		}else{
			$(event).addClass('active').siblings().removeClass('active');
			page=status;
			this.getNewsList();
		}
	},
	/*分页*/
	pageCreard : function(totalPage) {
		if(totalPage) {
			var str = "";
			for(var i = 0; i < totalPage; i++) {
				var page=i+1;
				str += '<a href="javascript:;" class="page-num '+(i==0?"active":"")+'" onclick="newsModule.toPage(' + page + ',this)">'+page+'</a>';
			}
			$(".prev").after(str);
		}
	}
}