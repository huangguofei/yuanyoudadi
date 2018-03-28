<template>
	<div class="goods-list con-page">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item>商品列表</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row class="search-wrap">
			  	 <el-col :span="3">
			  	 	<el-input v-model="name" placeholder="请输入内容"></el-input>
			  	 </el-col>
			  	 <el-col :span="2">
			  	 	<el-button style="margin-left:20px;" @click="queryInfo()">查询</el-button>
			  	 </el-col>
			  	 <el-col :span="2">
			  	 	<router-link :to="{name : 'admin.goods.create'}">
				  	 	<el-button type="primary">添加商品</el-button>
				  	 </router-link>
			  	 </el-col>

			</el-row>
			  <el-table
			    :data="tableData"
			    highlight-current-row
			    style="width: 100%">
			    <el-table-column
			      type="index"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="productName"
			      label="商品名"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="productPcImage"
			      label="PC商品图"
			      >
			      <template scope="scope">
			      		<p class="img-wrap">
			      			<img :src="scope.row.productPcImage">
			      		</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="productWapImage"
			      label="手机商品图"
			      >
			      <template scope="scope">
			      		<p class="img-wrap">
			      			<img :src="scope.row.productWapImage">
			      		</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="productStatus"
			      label="状态"
			      >
			      <template scope="scope">
			      	<span class="normal" v-if="scope.row.productStatus == 1">上线</span>
			      	<span class="delete" v-if="scope.row.productStatus == -1">已删除</span>
			      	<span class="forbidden" v-if="scope.row.productStatus == 0">已下线</span>
			      </template>
			    </el-table-column>
			    
			    <el-table-column
			      label="操作"
			      width="200">
			      <template scope="scope">
			      	<!-- <router-link :to="{name : 'admin.goods.edit', params : {productId : scope.row.productId}}"> -->
			        	<el-button type="text" size="small" @click="editorDetail(scope.row)">编辑</el-button>
			       <!--  </router-link> -->
			       <!--  <router-link :to="{name : 'admin.detail.list', params : {productId : scope.row.productId}}">
			        	<el-button type="text" size="small">详情</el-button>
			        </router-link> -->
			        <el-button type="text" size="small" v-if="scope.row.productStatus == 1" @click="prodOffline(scope.row)">下线</el-button>
			        <el-button type="text" size="small" v-if="scope.row.productStatus == 0" @click="prodOnline(scope.row)">上线</el-button>
			        <el-button type="text" size="small" v-if="scope.row.productStatus != -1" @click="delprod(scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			   <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="pagings.current"
			      :page-size="pagings.size"
			      layout="total, prev, pager, next"
			      :total="pagings.total">
			    </el-pagination>
	</div>
</template>
<script>
	import GOODS from "../../../business/admin/goods-module"
	export default{
		data() {
			return {
				name : "",
				tableData : [],
				pagings : {"current" : 1, "size" : 0, "pages" : 1, "total" : 0},
			}
		},
		created() {
			GOODS.getGoodsList(this);
		},
		methods : {
			queryInfo() {
				GOODS.getGoodsList(this);
			},
			prodOffline(row) {
				var that = this;
				this.$confirm('此操作将下线该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	GOODS.prodOfflineApi(that, row);
		        }).catch(() => {
		            
		        });
			},
			prodOnline(row) {
				var that = this;
				this.$confirm('此操作将上线该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	GOODS.prodOnlineApi(that, row);
		        }).catch(() => {
		            
		        });
			},
			delprod(row) {
				var that = this;
				this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	GOODS.deleteProd(that, row);
		        }).catch(() => {
		            
		        });
			},
			handleSizeChange(value) {

			},
			handleCurrentChange(value) {
				this.pagings.current = value;
				GOODS.getGoodsList(this);
			},
			editorDetail(row) {
				window.location.href="/goods/edit/productId/" + row.productId;
				
			}
		}
	}
</script>
<style lang="less">
	.goods-list{
		.img-wrap{
			height:70px;
			padding:10px;
			img{
				height:100%;
			}
		}

	}
</style>