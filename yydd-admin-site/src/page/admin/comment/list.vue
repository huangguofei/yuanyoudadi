<template>
	<div class="customize-list con-page">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>评价管理</el-breadcrumb-item>
				<el-breadcrumb-item>评价列表</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- <el-row class="search-wrap">
			  	 
			</el-row> -->
			  <el-table
			    :data="tableData"
			    highlight-current-row
			    style="width: 100%">
			    <el-table-column
			      type="index"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="quality"
			      label="茶叶品质"
			      >
			       <template scope="scope">
			      	<span class="normal" v-if="scope.row.quality == 0">未打分</span>
			      	<span class="forbidden" v-if="scope.row.quality == 1">一颗星</span>
			      	<span class="forbidden" v-if="scope.row.quality == 2">二颗星</span>
			      	<span class="forbidden" v-if="scope.row.quality == 3">三颗星</span>
			      	<span class="forbidden" v-if="scope.row.quality == 4">四颗星</span>
			      	<span class="forbidden" v-if="scope.row.quality == 5">五颗星</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="service"
			      label="服务体验"
			      >
			      <template scope="scope">
			      	<span class="normal" v-if="scope.row.service == 0">未打分</span>
			      	<span class="forbidden" v-if="scope.row.service == 1">一颗星</span>
			      	<span class="forbidden" v-if="scope.row.service == 2">二颗星</span>
			      	<span class="forbidden" v-if="scope.row.service == 3">三颗星</span>
			      	<span class="forbidden" v-if="scope.row.service == 4">四颗星</span>
			      	<span class="forbidden" v-if="scope.row.service == 5">五颗星</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="deliverySpeed"
			      label="配送速度"
			      >
			      <template scope="scope">
			      	<span class="normal" v-if="scope.row.deliverySpeed == 0">未打分</span>
			      	<span class="forbidden" v-if="scope.row.deliverySpeed == 1">一颗星</span>
			      	<span class="forbidden" v-if="scope.row.deliverySpeed == 2">二颗星</span>
			      	<span class="forbidden" v-if="scope.row.deliverySpeed == 3">三颗星</span>
			      	<span class="forbidden" v-if="scope.row.deliverySpeed == 4">四颗星</span>
			      	<span class="forbidden" v-if="scope.row.deliverySpeed == 5">五颗星</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="content"
			      label="评价"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="timeCreated"
			      label="评价时间"
			      >
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
	import COMMENTMODULE from "../../../business/admin/comment-module"
	export default{
		data() {
			return {
				tableData : [],
				pagings : {"current" : 1, "size" : 0, "pages" : 1, "total" : 0},
			}
		},
		created() {
			COMMENTMODULE.getCommentList(this);
		},
		methods : {
			
			handleSizeChange(value) {

			},
			handleCurrentChange(value) {
				this.pagings.current = value;
				COMMENTMODULE.getCommentList(this);
			}
		}
	}
</script>
<style lang="less">
	.customize-list {
		.el-dialog--tiny{
			max-width: 450px;
		}
	}
</style>