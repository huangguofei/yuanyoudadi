<!-- 头部 -->
<template>
	<div class="main-header" >
		<div class="h-left">
			<span class="name">源优大地官网系统</span>
			<i class="h-align-justify" @click="menuShrink()"></i>
		</div>
		<div class="h-right">
			
			<a class="login-out" href="javascript:;" @click="logoOut()">退出</a>
			<div class="user-info">
				<i class="head-pro fight-icon"></i>
				<span class="user-name">管理员</span>
				<!-- <span class="phone">{{userInfo.mobile}}</span> -->
			</div>
			
		</div>	
	</div>
</template>
<script>
import https from "../../axios/https"
export default{
	data() {
		return{
			userInfo : {}
		}
	},
	created() {
		var userInfo = common.getCookie("userInfo");
		this.userInfo = JSON.parse(userInfo);
	},
	methods : {
		menuShrink() {
			this.$parent.isShrink = this.$parent.isShrink ? false : true;
		},
		logoOut() {
			var _that = this;
			https.commAjax({
				method : "post",
				url : "admin/user/logout",
				success : function(response) {
					common.setCookie("userInfo" , "");
					_that.$router.push({path : "/login"});
				}
			});
		}
	}
}
</script>
<style lang="less" scoped >
	@import "../../common/css/config.less";
	.main-header{
		height:90px;
		background: @hBack;
		padding:0 20px;
		.h-left{
			width:240px;
			height:100%;
			float:left;
			color:@hcolor;
			line-height: 90px;
			font-size:@hSize;
			position: relative;
			border-right:1px solid rgba(255, 255, 255, 0.2);
			.logo{
				position: absolute;
				top:25px;
				display: inline-block;
				width:40px;
				height:40px;
				background-position:-415px -167px;
			}
			.name{
				//margin-left:45px;
			}
			.h-align-justify{
				position: absolute;
				right:-50px;
				top:38px;
				width:24px;
				height:16px;
				display: inline-block;
				border-top:2px solid rgba(255, 255, 255, 0.5);
				border-bottom:2px solid rgba(255, 255, 255, 0.5);
				cursor: pointer;
			}
			.h-align-justify:before{
				position: absolute;
				top:4px;
				content : "";
				width:24px;
				height:2px;
				background: rgba(255, 255, 255, 0.5);
			}
			.h-align-justify:after{
				position: absolute;
				top:10px;
				content : "";
				width:24px;
				height:2px;
				background: rgba(255, 255, 255, 0.5);
			}
		}
		.h-right{
			float:right;
			line-height:90px;
			color:@hcolor;
			text-align: right;
			position: relative;
			
			.user-info{
				float: right;
				position: relative;
				.head-pro{
					position: absolute;
					width:20px;
					height:20px;
					top:35px;
					left:-23px;
					background-position:-197px -347px;
				}
			}
			.login-out{
				margin-left:20px;
				color:@hcolor;
				float:right;
				display: inline-block;
			}
		}
	}
	.main-shrink{
		.h-left{
			width:60px;
		}
	}
</style>