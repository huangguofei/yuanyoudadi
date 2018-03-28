<!-- 左边菜单 -->
<template>
	<div class="left-menu">
		<el-col :span="24">
			<el-menu default-active="1" :default-openeds="arr" class="el-menu-vertical-demo" theme="dark">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-sell fight-icon"></i>商品管理
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<a href="/goods/create">发布商品</a>
						</el-menu-item>
						<el-menu-item index="1-2">
							<router-link :to="{name : 'admin.goods.list'}">商品管理</router-link>
						</el-menu-item>
					</el-menu-item-group>

				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-system fight-icon"></i>评价管理
					</template>
					<el-menu-item-group>
						<el-menu-item index="2-1">
							<router-link :to="{name : 'admin.comment.list'}">评价信息</router-link>
						</el-menu-item>

					</el-menu-item-group>

				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-system fight-icon"></i>定制管理
					</template>
					<el-menu-item-group>
						<el-menu-item index="3-1">
							<router-link :to="{name : 'admin.customize.list'}">定制信息</router-link>
						</el-menu-item>
					</el-menu-item-group>

				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-system fight-icon"></i>新闻管理
					</template>
					<el-menu-item-group>
						<el-menu-item index="4-1">
							<router-link :to="{name : 'admin.news.list'}">新闻中心</router-link>
						</el-menu-item>
					</el-menu-item-group>

				</el-submenu>

			</el-menu>
		</el-col>
	</div>
</template>
<script>
	import { getPermissions } from "../../business/admin/common-modules"
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				arr: ["1", "2", "3"],
			}
		}
	}
</script>
<style lang="less">
	@import "../../common/css/config.less";
	.left-menu {
		width: 100%;
		height: 100%;
		background: @mBack;
		font-size: 30px;
		overflow: auto;
		.deafult-active {
			color: @assBack;
			cursor: pointer;
		}
		.el-tree {
			background: #515868;
			border: 0;
			color: rgba(255, 255, 255, 0.6);
			margin-left: 30px;
			margin-top: -15px;
			.el-tree-node:hover {
				background: #515868;
				.el-tree-node__content {
					background: #515868;
				}
			}
			.is-current>.el-tree-node__content>.el-tree-node__label {
				color: @assBack;
			}
		}
		.el-tree--highlight-current {
			.el-tree-node {
				.el-tree-node__content {
					background: #515868;
				}
			}
			.is-current>.el-tree-node__content>.el-tree-node__label {
				color: rgba(255, 255, 255, 0.6);
			}
		}
		.select-menu-wrap {
			.el-submenu .is-active {
				a {
					color: @assBack;
				}
			}
		}
		.el-tree__empty-block {
			height: 35px;
			min-height: 35px;
			text-align: left;
			left: -50px;
			.el-tree__empty-text {
				font-size: 16px;
			}
		}
		.el-menu-item-group {
			.el-menu-item-group__title {
				margin-bottom: 0;
			}
		}
		.fight-icon {
			vertical-align: initial;
		}
	}
</style>