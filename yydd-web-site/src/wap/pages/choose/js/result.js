/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
 var resultModule = {
 	 init : function() {
 	 	var that = this;
 	 	var type = common.getParamsString("type"), id = common.getParamsString("id");
 	 	var $result = $(".result-wrap");
 	 	setTimeout(function() {
 	 		$result.show();
 	 	},100);
 	 	if(type) {
 	 		var name  = this.returnConsStr(type);
 	 		var reamk = this.returnConsReamk(type);
 	 		$result.find(".reamk").empty().append(reamk);
 	 		$result.find(".name").text(name);
 	 	} else if(id) {
 	 		common.commAjax({
	 			type : "POST",
	 			url : "constitution/getConstitutionTestRecord",
	 			data : {constitutionTestRecordId : id},
	 			success : function(result) {
	 				var cons = JSON.parse(result.constitutionTestRecordContent);
	 				if(cons) {
	 					type = cons.type;
	 					var typeName = that.returnConsStr(type);
	 					var reamk = that.returnConsReamk(type);
 	 					$result.find(".reamk").empty().append(reamk);
 						$result.find(".name").text(typeName);
	 					$result.find(".share").show();
	 					$("#copyUrl").text(window.location.protocol + "//" + window.location.host + "/wap/view/choose/share.html?id=" + id);
	 				} else {
	 					window.location.href = "/web/view/choose/";
	 				}
	 			}
	 		});
 	 	} else {
 	 		window.location.href = "/web/view/choose/";
 	 	}
 	 	this.getProdsByconsId(type);

 	 	this.pageEvent();
 	 },
 	 pageEvent : function() {
 	 	var _that = this;
		var $result = $(".result-wrap"), $share = $("#shareCon");
		$result.find(".re-next").click(function() {
	         $result.hide();
	         $(".recommend-wrap").show();
		});

 		$result.find(".share").click(function() {
			$share.show().animate({"bottom" : 0});
		});
		$share.find(".close").click(function() {
			$share.animate({"bottom" : -200}, function() {
					$share.hide();
			});
		});
 		var clipboard = new Clipboard('#idCopy',{
			text: function() {
				return $("#copyUrl").html();
			}
 		});
		clipboard.on('success', function(e) {
			//var msg = e.trigger.getAttribute('aria-label');
		    e.clearSelection();
		    $share.find(".copy .info").fadeIn(2000, function() {
				$share.find(".copy .info").fadeOut(2000);
			});
		});
		clipboard.on('error', function(e) {
			alert("复制失败，请手动复制");
		});
	},
	returnConsStr : function(type) {
		var str = ""
		if(type == 1) {
			str = "平和体质";
		} else if(type == 2) {
			str = "气虚体质";
		} else if(type == 3) {
			str = "阳虚体质";
		} else if(type == 4) {
			str = "阴虚体质";
		} else if(type == 5) {
			str = "痰湿体质";
		} else if(type == 6) {
			str = "湿热体质";
		} else if(type == 7) {
			str = "血瘀体质";
		} else if(type == 8) {
			str = "气郁体质";
		} else if(type == 9) {
			str = "特禀体质";
		}
		return str;
	},
	returnConsReamk : function(type) {
		var reamk = "";
		if(type == 1) {
			reamk = '<p>平和体质的您简直就是人 赢家嘛!</p>'+
                    '<p> 身体倍儿棒，吃嘛嘛香”， 再加上睡眠好、性格开朗， 社会 和自然适应能力强，拥有这类体质的你不爱得病，病也不爱 你！所以说只要不太过分，你可以任性地吃喝拉撒啊!喝各类茶饮皆可</p>'+
                    '<p>夸张点来形容，所谓百无禁忌就是你们了。所以你们喝各类茶饮皆可。到了春季喝绿茶；夏季喝白茶、绿茶；秋季喝乌龙茶；冬季喝红茶、普洱熟茶、陈年普洱生茶。想喝的话，那就随着你的性子喝好了。 </p>';
		} else if(type == 2) {
			reamk = '<p>气虚体质的你……是不是很容易说话没劲呢，经常出虚汗，容易呼吸短促，经常疲乏无力...</p>'+
                  '<p>气虚的人很容易感冒啊，而且你生病后，由于抗病能力弱也难以很快痊愈...</p>'+
                  '<p>未发酵和轻发酵的茶就少喝或者不喝吧，红茶、乌龙茶及普洱熟茶都是不错的选择。对你有好处的，注意到共同点了吗？它们都是温和型。</p>';
		} else if(type == 3) {
			reamk = '<p>阳虚体质的你是……上辈子折翼的天使，手脚冰凉，跟生鱼片这一类的凉菜有仇，一吃就拉肚子。</p>'+
					'<p>性格多内向、沉静，看似“静如处子，只想在角落里当个美女(男)子”，其实是虚！是懒！不想动而已...</p>'+
					'<p>反正，你就像生命缺少太阳，暖什么的与你无缘...</p>'
		} else if(type == 4) {
			reamk = '<p>阴虚体质的你是……热、热、热，夏天就是噩梦；</p>'+
					'<p>手脚心总赶脚被时时加热；不涂胭脂，也是面颊通红； </p>'+
					'<p>渴、渴、渴，为什么喝很多水，还是口干舌燥？无论怎么补水，还是皮肤干燥? 晚上，连周公都不搭理你。</p>'+
					'<p>有时间泡点绿茶、黄茶、白茶等清爽的茶类喝喝吧。例如福鼎寿眉、白牡丹。不想清饮，也可来点花式调饮，比如来点银耳茶、桑葚茶和枸杞红枣茶等。</p>';
		} else if(type == 5) {
			reamk = '<p>痰湿体质的你是……心宽体胖是你的最大特点，腹部松软的肉肉总是舍不得离开你；皮肤老是油油腻腻，清爽通透总与你无关；</p>'+
					'<p>从不需要汗蒸，因为常常汗如雨下；眼睛是心灵之窗，可你那浮肿的双眼却阻碍了它绽放光芒。</p>'+
					'<p>常常困乏思睡，总觉得睡得不够……</p>'+
					'<p>痰湿体质要注意饮食清淡、排毒，实在忍不住茶瘾，淡淡地泡一些绿茶、红茶和黑茶，解解馋吧。</p>';
		} else if(type == 6) {
			reamk = '<p>湿热体质的你是……脸部、鼻尖总是油光锃亮，痘痘总是逗你不断；小伙伴们总难与你亲近，你一开口便异味四窜；</p>'+
					'<p>别人在茅房倍舒爽，你却惆怅怎么告别黏滞不爽的大便与发黄的小便。</p>'+
					'<p>总而言之，湿热体质的你，总是感觉排泄不畅，怎么洗也还是不清爽，抓狂。</p>'+
					'<p>湿热体质的你自然需要来点甘平排毒的好饮品，绿茶、白茶、黑茶是不错的选择。</p>';
		} else if(type == 7) {
			reamk = '<p>血瘀体质的你是……其实很年轻，脸上永远都似蒙着一层灰，晦暗地怎么洗都洗不干净；</p>'+
					'<p>别人磕碰一下没事，你却身上红一块紫一块；本是挤得出水的肤质，你却偏偏干燥粗糙；</p>'+
					'<p>总而言之，你经常被无形抬高年龄。</p>'+
					'<p>血瘀体质的您一定要多顺气啊！没事儿别老生气，平时多喝点红茶、青茶、黑茶及花茶。</p>';
		} else if(type == 8) {
			reamk = '<p>气郁体质的你是……李清照的气质，多愁善感、脆弱忧伤；</p>'+
					'<p>祥林嫂的身体，动不得、睡不着是家常事；</p>'+
					'<p>白毛女的容貌，虽年纪轻轻，却是一副冬天被霜打蔫儿、摧残后的掉价白菜的模样...</p>'+
					'<p>总之，如今是一个讲究健康的时代，“林妹妹”早就不吃香了。</p>'+
					'<p>如果你是个气郁体质的人儿，又喜欢喝茶，尽量喝绿茶、青茶、红茶。</p>';
		} else if(type == 9) {
			reamk = '<p>特禀体质即过敏体质。</p>'+
					'<p>特禀体质的你是……看似小身板不错，鼻涕喷嚏却从未离你而去；因为一点点花粉就能分分钟放倒你；</p>'+
					'<p>别人的美味海鲜，可能是你的致命杀手……总而言之，一旦遇到特定物质，身体就会迅速有过敏反应。</p>'+
					'<p>特禀体质的你，堪称人类中最脆弱的纸片人，绝对的重点保护对象.</p>'+
					'<p>敏感体质的你如果心里时刻住着一伙儿茶虫，实在忍受不住它们的调皮，不妨选择绿茶、青茶、黑茶。</p>';
		}
		return reamk;
	},
	/*获取推荐商品*/
	getProdsByconsId : function(id) {
		var that = this;
		var data = {constitutionInfoId : id};
		common.commAjax({
 			type : "POST",
 			url : "product/getProductByConstitutionInfoId",
 			data : data,
 			success : function(result) {
 				that.goodsListHtml(result);
 			}
 		});
	},
	goodsListHtml : function(jsonData) {
		if(jsonData.length) {
			var str = "";
			var $list = $(".recommend-wrap").find(".prod-list")
			$.each(jsonData, function(key, item) {
				var imgpath = item.productWapImage,
					name = item.productName,
					url = "/wap/view/detail?productId=" + item.productId;
				str += '<li class="p-item">'+
	                      '<a href="'+url+'"><div class="pro-img">'+
	                      '<img src="'+imgpath+'">'+
	                      '</div>'+
	                        '<p class="zh">'+name+'</p></a>'+
	                  '</li>'
			});
			$list.empty().append(str);
		}
	}
 }