var userModule = {
	selectPageSize : 0,
	init : function() {
		this.getUserlist(1);
	},
	createRowData : function(rowDatas) {
		if(!rowDatas) return false;
		var rowhtml = "", that = this;
		$.each(rowDatas,  function(key, item) {
			var index = key + 1;
			var sex = item.gender == 0 ? "男" : "女",
				drink = item.hasDrinkTeaHabit == 0 ? "有" : "无";
			var frequency = "一天一次";
			if(item.drinkTeaRate == 1) {
				frequency = "一天多次"
			} else if(item.drinkTeaRate == 2) {
				frequency = "平时不喝接待客人才喝"
			}
			var purpose = that.returnPurposeType(item.forUse);
			var teaArray = that.returnTeaType(item.flavorHabit);
			var industry = that.returnIndustryType(item.industryOwned);
			var editPath = "/web/view/user/edit.html?id=" + item.id;
			if(key%2 == 0) {
				rowhtml += '<tr>';
			} else {
				rowhtml += '<tr class="even">';
			}
			var id = "'" + item.id + "'";
             rowhtml += '<td>'+index+'</td>'+
                        '<td>'+item.realName+'</td>'+
                        '<td>'+sex+'</td>'+
                        '<td>'+item.birthday+'</td>'+
                        '<td>'+item.phone+'</td>'+
                        '<td>'+item.wx+'</td>'+
                        '<td>'+item.channel+'</td>'+
                        '<td>'+item.address+'</td>'+
                        '<td>'+drink+'</td>'+
                        '<td>'+frequency+'</td>'+
                        '<td>'+purpose+'</td>'+
                        '<td>'+teaArray+'</td>'+
                        '<td>'+industry+'</td>'+
                        '<td>'+
                            '<a href="'+editPath+'" class="edit-row">编辑</a>'+
                            '<a href="javascript:void(0)" class="del-row" onclick="userModule.delRowData('+id+')">删除</a>'+
                        '</td>'+
                    '</tr>';
		});
		var $list = $("#userList");
		$list.find("tbody").empty().append(rowhtml);
		

	},
	delRowData : function(id) {
		var that = this;
		var r = confirm("确定删除该行数据!");
		if (r == true){
			common.commAjax({
	 			type : "POST",
	 			url : "customerInfo/delete",
	 			data : {"id" : id},
	 			success : function(result) {
 					that.errorMessage("删除成功");
 					that.getUserlist(that.selectPageSize);
	 			},
	 			error : function() {
	 				that.errorMessage("删除失败");
	 			}
	 		});
		} 
	},
	getUserlist : function(pageNum) {
		var that = this;
		common.commAjax({
 			type : "POST",
 			url : "customerInfo/list",
 			data : {"pageNum" : pageNum, "pageSize" : 10},
 			success : function(result) {
 				if(result) {
 					var totalCount = result.totalCount,
 						totalPage = result.totalPage,
 						userList = result.resultList,
 						currentPage = result.currentPage;
					that.createRowData(userList);
					that.selectPageSize = currentPage;
					$("#page").paging({
						pageNo : currentPage,
				        totalPage: totalPage,
				        totalSize: totalCount,
				        callback: function(num) {
				        	if(num != currentPage) {
				        		userModule.getUserlist(num)
				        	}
				        }
				    })
 				}
 				
 			}
 		});
		
	},
	returnPurposeType : function(str) {
		if(!str) return "";
		var teaArray = ["自饮","送人", "待客", "收藏"];
		var ary = str.split(",");
		var teaTypes = "";
		var len = ary.length;
		if(len > 0) {
			$.each(ary, function(key,item) {
				if(key == len - 1) {
					teaTypes += teaArray[item] ? teaArray[item] : "";
				} else {
					teaTypes += teaArray[item] ? teaArray[item] + ";" : "" ;
				}
			});
		}
		return  teaTypes;
		
	},
	returnTeaType : function(str) {
		if(!str) return "";
		var ary = str.split(",");
		var teaArray = ["龙井","碧螺春", "极白", "都匀毛尖", "信阳毛尖", "竹叶青", "白毫银针", "白牡丹", "生普", "熟普", "单丛", "大红袍", "铁观音", "其它"];
		var teaTypes = "";
		var len = ary.length;
		if(len > 0) {
			$.each(ary, function(key,item) {
				if(key == len - 1) {
					teaTypes += teaArray[item] ? teaArray[item] : "";
				} else {
					teaTypes += teaArray[item] ? teaArray[item] + ";" : "" ;
				}
			});
		}
		return  teaTypes;
		
	},
	returnIndustryType : function(str) {
		if(!str) return "";
		var ary = str.split(",");
		var teaArray = ["金融","地产", "科技", "艺术", "娱乐", "传媒", "公务员", "企业主", "其它"];
		var teaTypes = "";
		var len = ary.length;
		if(len > 0) {
			$.each(ary, function(key,item) {
				if(key == len - 1) {
					teaTypes += teaArray[item] ? teaArray[item] : "";
				} else {
					teaTypes += teaArray[item] ? teaArray[item] + ";" : "" ;
				}
			});
		}
		return  teaTypes;
	},
	errorMessage : function(mes) {
		var $page = $(".user-edit-page");
		var $html = $('<div class="error-mes"><span>'+mes+'</span></div>');
		$page.append($html);
		$html.fadeIn(function() {
			$html.delay(1000).fadeOut(function() {
				$html.remove();
			});
		})
	},
}