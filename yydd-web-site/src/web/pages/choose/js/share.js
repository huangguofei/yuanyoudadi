/*
 * author pizhenhua
 * day 2017-7-13
 * 选茶js
 */
 var shareModule = {
 	 init : function() {
 	 	var id = common.getParamsString("id");
 	 	var that = this;
 	 	if(id) {
 	 		var $share = $("#shareWrap");
 	 		common.commAjax({
	 			type : "POST",
	 			url : "constitution/getConstitutionTestRecord",
	 			data : {constitutionTestRecordId : id},
	 			success : function(result) {
	 				var cons = JSON.parse(result.constitutionTestRecordContent);
	 				if(cons) {
	 					var array = [];
	 					$.each(cons.grades, function(key, item) {
	 						array[key] = item.sub;
	 					});
	 					that.createEchart(array);
	 					$share.find(".cons-name").text(that.returnConsStr(cons.type));
	 					var reamk = that.returnConsContent(cons.type);
	 					$share.find(".reamk").empty().append(reamk)
	 				} else {
	 					window.location.href = "/web/view/choose/"
	 				}
	 				
	 			}
	 		});
 	 	} else {
 	 		window.location.href = "/web/view/choose/"
 	 	}
 	 },
 	 createEchart : function(array) {
 	 	var myChart = echarts.init(document.getElementById('cons'));
	    option = {
		    title: {
		        text: '',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: '{c}分为{b}'
		    },
		    legend: {
		        left: 'left',
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data: ["平和","气虚","阳虚","阴虚","痰湿","湿热", "血瘀", "气郁", "特禀"],
		        nameTextStyle : {
		        	color:"#FFF"
		        },
		        axisLabel : {
		        	textStyle: {
				        fontSize: 14,
				        color: '#FFF'
				    }
		        }
		        
		    },
		    yAxis: {
		        max : 100,
		        interval : 20,
		        show : false,
		        splitLine : {
		        	show : false
		        }
		    },
		    axisLine : {
		    	show : true
		    },
		    series: [
		        {
		            name: '体质分数',
		            type: 'line',
		            data: array,
		             tooltip: {
				        trigger: 'item',
				        formatter: '{a} <br/>{b}体质 : {c}'
				    },
		            itemStyle : {
		            	normal : {
		            		color:"#FFF"
		            	}
		            },
		            lineStyle : {
		            	normal : {
		            		color : "#FFF"
		            	}
		            },
		             markLine: {
		             	symbol : "arrow",
		             	symbolSize : 1,
		                data: [
		                     {
		                     	name : "倾向",
						        yAxis: 30
						        
						    },
						    {
						        yAxis: 40,
						        name : "判定",
						        lineStyle: {
				                    normal: {
				                        type: 'solid'
				                    }
				                },
						    }
		                ]
		            }
		        }
		    ]
		};
	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
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
	returnConsContent : function(type) {
		var reamk = "";
		if(type == 1) {
			reamk = '<p class="tit">你的好友居然是令人艳羡、值得称赞的平和体质。平和质应有的特点：体型比较匀称；皮肤光洁如初；很少对人发怒；善于社交沟通。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：不熬夜，吃早餐，常运动，多微笑</p>'+
					'<p>不要：睡懒觉，吃宵夜，长时间看电脑</p>';
		} else if(type == 2) {
			reamk = '<p class="tit">你的好友是气虚体质，所以他可能总是一副软绵绵、懒洋洋的样子；或者经常丢三落四的。朋友中头几个感冒的总是他，还经常不开心。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：早起沐浴阳光，口味清淡滋润， 多些耐心</p>'+
					'<p>不要：暴饮暴食，运动过度，吃宵夜，过多关注自己。</p>';
		} else if(type == 3) {
			reamk = '<p class="tit">你的好友是阳虚体质，所以他可能会穿的特多，却还是喊着冷；会常常咬到自己的舌头；顶着一对儿熊猫眼；情绪低落，积极不起来</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：细嚼慢咽，培养一个爱好，早睡早起，参加公益，分享爱心。</p>'+
					'<p>不要：吃冷饮，熬夜，久坐不动，心生怨念。</p>';
		} else if(type == 4) {
			reamk = '<p class="tit">你的好友是阴虚体质，所以他可能喜欢光脚踩着凉地板；最爱喝冷饮；皮肤苍白或者泛红；总是一副干到脱水的样子；脾气暴躁。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：早起沐浴阳光，口味清淡滋润， 多些耐心</p>'+
					'<p>不要：超过23点睡觉，怒火中烧，大汗淋漓</p>';
		} else if(type == 5) {
			reamk = '<p class="tit">你的好友是痰湿体质，所以他可能容易发胖或者已经发胖；脚步声音，屁股坐下去就不爱起来；不喜欢喝水；脾气好，性格温和。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：吃到七分饱，规律运动，泡泡热水澡，细嚼慢咽</p>'+
					'<p>不要：喝冷饮，思虑过度，暴饮暴食</p>';
		} else if(type == 6) {
			reamk = '<p class="tit">你的好友是湿热体质，所以他可能脸上看起来总像洗不干净；经常东一片、西一片的冒痘出来；飘飘然过留下一股汗味儿；遇事紧张兮兮；时不常怒发冲冠。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：23点前睡觉，一起去运动，保持欢喜并淡定</p>'+
					'<p>不要：烟酒过度，久处潮湿之地，大鱼大肉</p>';
		} else if(type == 7) {
			reamk = '<p class="tit">你的好友是血瘀体质，所以他可能脸上有一些暗暗的痤疮印；喜欢摆一副耗呆的表情；丢三落四的爱忘事儿；经常心烦气躁。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：培养一个爱好，适度运动，早起早睡</p>'+
					'<p>不要：独自怨念，饮食寒凉，暴饮暴食</p>';
		} else if(type == 8) {
			reamk = '<p class="tit">你的好友是气郁体质，所以他可能脸色发黄，没有光泽；经常听到莫名其妙地叹气声；脾气古怪，常在郁闷、发邪火之间摆荡。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：充分表达，知足常乐，在阳光下运动，参与公益，分享爱心</p>'+
					'<p>不要：暴饮暴食，冲动购物，熬夜伤神</p>';
		} else if(type == 9) {
			reamk = '<p class="tit">你的好友是特禀体质，所以他可能喷嚏一连打好几个；这个碰不得，那个碰不得，万事小心翼翼；皮肤一抓就红了，并出现抓痕。</p>'+
					'<p>记得提醒他/她做到</p>'+
					'<p>要：口味清淡自然，情绪从容大度，起居规律不熬夜</p>'+
					'<p>不要：劳汗当风，暴饮暴食，积攒压力</p>';
		}	
		return reamk;
	}
 }