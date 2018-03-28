<!-- 主页面 -->
<template>
	<div class="main-page" ref="page">
		<div class="header" ref="header">
			<HEADERS ></HEADERS>
		</div>
		<div class="main-left" v-show="!isShrink">
			<LEFTMENU></LEFTMENU>
		</div> 
		<div class="main-content" ref="con" :class="isShrink ? 'main-shrink' : ''">
			<div class="content" >
				<router-view></router-view>
			</div>
			
		</div>
	</div>
</template>
<script>
	import HEADERS from "../../components/admin/header"
	import LEFTMENU from "../../components/admin/left-menu"
	export default{
		data() {
			return{
				isShrink : false
			}
			
		},
		components : {
			HEADERS,
			LEFTMENU
		},
		mounted() {
			var _that = this;
			var docEl = document.documentElement,
	    	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		    recalc = function() {
		    	 if(_that.$refs.page) {
						const pageH = _that.$refs.page.getBoundingClientRect().height;
						const header = _that.$refs.header.getBoundingClientRect().height;
						_that.$refs.con.style.height = (pageH - header) + "px";
					}
		    };
			recalc();
			window.addEventListener(resizeEvt, recalc, false);
			document.addEventListener('DOMContentLoaded', recalc, false);
		}
	}
</script>
<style lang="less" scoped >
	@import "../../common/css/config.less";
	.main-page{
		height:100%;
		width: 100%;
	}
	.main-left{
		position: fixed;
		z-index:99;
		left:0;
		top:90px;
		width:260px;
		height:100%;
	}
	.main-content{
		overflow-y: auto;
		.content{
			padding-left:260px;
			min-width:1200px;
		}
	}
	.main-shrink{
		.content{
			padding-left:0;
		}
	}
</style>