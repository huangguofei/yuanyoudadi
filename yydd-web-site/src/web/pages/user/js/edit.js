var editModule = {
	rowId : null,
	init : function() {
		this.rowId = common.getParamsString("id");
		if(this.rowId) {
			this.getUserInfo(this.rowId);
		}
		this.pageEvent();
	},
	pageEvent : function() {
		var $page = $(".user-edit-page"), that = this;
		/*下一步*/
		var len = $page.find(".info-con>.panel").length;
		$page.find(".next").click(function() {
			var $that = $(this);
			var $active = $page.find(".p-active");
			if(!that.verificationForm($active, $active.index())) return false;
			var $next = $active.next();
			var index = $next.index();
			if($next.length) {
				$active.removeClass("p-active").css("left", "100%");
				$next.addClass("p-active").animate({
					left : 0
				});
			}
			if(index == len - 1) {
				$page.find(".next").hide();
				$page.find(".confirm").show();
			} else {
				if(index > 0) {
					$page.find(".prev").show();
				} else {
					$page.find(".prev").hide();
				}
			}
			
		});

		/*上一步*/
		$page.find(".prev").click(function() {
			var $that = $(this);
			var $active = $page.find(".p-active");
			var $prev = $active.prev();
			var index = $prev.index();
			if($prev.length) {
				$active.removeClass("p-active").css("left", "100%");
				$prev.addClass("p-active").animate({
					left : 0
				});
			}
			if(index > 0) {
				$page.find(".prev").show();
			} else {
				$page.find(".prev").hide();
			}
			$page.find(".next").show();
			$page.find(".confirm").hide();
		});

		$page.find(".check-item").click(function() {
			var $that = $(this);
			var $parent = $that.parent();
			if($parent.hasClass("more-check")) {
				if($that.hasClass("active")) {
					$that.removeClass("active");
				} else {
					$that.addClass("active");
				}
				
			} else {
				$parent.find(".check-item").removeClass("active");
				$that.addClass("active");
			}
		});

		/*提交*/
		$page.find(".confirm").click(function() {
			var $page = $(".user-edit-page");
			var $html = $('<div class="error-mes"><span>正在提交中...</span></div>');
			$page.append($html);
			$html.fadeIn();
			var params = that.readFormData();
			var url = "customerInfo/add";
			if(that.rowId) {
				params.id = that.rowId;
				url = "customerInfo/edit"
			}
			common.commAjax({
	 			type : "POST",
	 			url : url,
	 			data : params,
	 			success : function(result) {
	 				if(result) {
	 					window.location.href = "/web/view/user/"
	 				}
	 			},
	 			error : function() {
	 				$html.hide();
	 				that.errorMessage("提交失败！");
	 			}
	 		});
		});
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
	verificationForm : function($form, index) {
		var that = this;
		var bool = true, str = "";
		if(index == 0) {
			var userName = $("#userName").val();
			if(!userName) {
				bool = false;
				str = "姓名不能为空！"
			}
		} else if(index) {
			var tel = $("#tel").val();
			if(!tel) {
				bool = false;
			    str = "电话不能为空！"
			} else if(!(/^1(3|4|5|7|8)\d{9}$/.test(tel))) {
				bool = false;
			    str = "电话有错误，请重填！"
			}
		}
		if(!bool) {
			that.errorMessage(str);
		}
		return bool;
	},
	readFormData : function() {
		var userName = $("#userName").val(),
			sex = $("#sex").find(".active").attr("value"),
			birthday = $("#birthday").val(),
			tel = $("#tel").val(),
			weixin = $("#weixin").val(),
			card = $("#card").val(),
			ditch = $("#ditch").val(),
			address = $("#address").val(),
			drink = $("#drink").find(".active").attr("value"),
			frequency = $("#frequency").find(".active").attr("value");
		var $purposes = $("#purpose").find(".active"),purposes = "";
		var pLen = $purposes.length;
		$.each($purposes, function(key) {
			var $that = $(this);
			if(key == pLen - 1) {
				purposes += $that.attr("value");
			} else {
				purposes += $that.attr("value") + ","
			}
			
		});
		var $flavors = $("#flavor").find(".active"),flavors = "";
		var fLen = $flavors.length;
		$.each($flavors, function(key) {
			var $that = $(this);
			if(key == fLen - 1) {
				flavors += $that.attr("value");
			} else {
				flavors += $that.attr("value") + ","
			}
			
		});
		var $industrys = $("#industry").find(".active"),industrys = "";
		var iLen = $industrys.length;
		$.each($industrys, function(key) {
			var $that = $(this);
			if(key == iLen - 1) {
				industrys += $that.attr("value");
			} else {
				industrys += $that.attr("value") + ","
			}
			
		});
		return {
			realName : userName,
			gender : sex,
			birthday : birthday,
			phone : tel,
			wx : weixin,
			identifyCardNum : card,
			channel : ditch,
			address : address,
			hasDrinkTeaHabit : drink,
			drinkTeaRate : frequency,
			forUse : purposes,
			flavorHabit : flavors,
			industryOwned : industrys
		}
	},
	getUserInfo : function(id) {
		if(!id) return false;
		var userInfoCallBack = function(info) {
				console.log(info);
				$("#userName").val(info.realName);
				$("#birthday").val(info.birthday);
				$("#tel").val(info.phone);
				$("#weixin").val(info.wx);
				$("#ditch").val(info.channel);
				$("#card").val(info.identifyCardNum);
				$("#address").val(info.address);
				if(info.gender != "" || info.gender != undefined){
					$("#sex").find(".check-item[value='"+info.gender+"']").addClass("active");
				}
				if(info.hasDrinkTeaHabit != "" || info.hasDrinkTeaHabit != undefined){
					$("#drink").find(".check-item[value='"+info.hasDrinkTeaHabit+"']").addClass("active");
				}
				if(info.drinkTeaRate != "" || info.drinkTeaRate != undefined){
					$("#frequency").find(".check-item[value='"+info.drinkTeaRate+"']").addClass("active");
				}
				if(info.forUse != "" || info.forUse != undefined){
					var ary = info.forUse.split(",");
					var $purpose = $("#purpose");
					$.each(ary, function(key, item) {
						$purpose.find(".check-item[value='"+item+"']").addClass("active");
					});
					
				}
				if(info.flavorHabit != "" || info.flavorHabit != undefined){
					var ary = info.flavorHabit.split(",");
					var $flavor = $("#flavor");
					$.each(ary, function(key, item) {
						$flavor.find(".check-item[value='"+item+"']").addClass("active");
					});
					
				}
				if(info.industryOwned != "" || info.industryOwned != undefined){
					var ary = info.industryOwned.split(",");
					var $industry = $("#industry");
					$.each(ary, function(key, item) {
						$industry.find(".check-item[value='"+item+"']").addClass("active");
					});
					
				}
		}
		common.commAjax({
 			type : "POST",
 			url : "customerInfo/detail",
 			data : {"id" : id},
 			success : function(result) {
 				if(result) {
 					userInfoCallBack(result);
 				}
 			}
 		});
		
		
	}
}