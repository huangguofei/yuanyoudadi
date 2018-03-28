<template>
	<div class="news-list con-page">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>新闻管理</el-breadcrumb-item>
				<el-breadcrumb-item>新闻中心</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row class="search-wrap">
			  	 <el-col :span="2">
			  	 	<el-button type="primary" @click="addNews">添加新闻</el-button>
			  	 </el-col>

			</el-row>
			  <el-table
			    :data="tableData"
			    highlight-current-row
			    style="width: 100%">
			    <el-table-column
			      type="index"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="title"
			      label="标题"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="briefContent"
			      label="简介"
			      >
			    </el-table-column>
			   
			     <el-table-column
			      label="主图"
			      >
			      <template scope="scope">
			        <img :src="scope.row.mainPicture" class="main-pic">
			      </template>
			    </el-table-column>
			     <el-table-column
			      prop="publishTime"
			      label="提交时间"
			      >
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="200">
			      <template scope="scope">
			        <el-button type="text" size="small" @click="editorRow(scope.row.id)">编辑</el-button>
			        <el-button type="text" size="small" @click="delRow(scope.row)">删除</el-button>
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
	import NEWSMODULE from "../../../business/admin/news-module"
	export default{
		data() {
			return {
				tableData : [],
				pagings : {"current" : 1, "size" : 0, "pages" : 1, "total" : 0},
				dialogVisible : false,
				 ruleForm: {
		          customerName: "",
		          phone : "",
		          remark : "",
		        },
		        editIndex : -1,
		        rules: {
		          customerName: [
		            { required: true, message: '请输入姓名', trigger: 'blur' },
		          ],
		          phone: [
		            { required: true, message: '请输入联系电话', trigger: 'blur' },
		          ]
		         
		        }
			}
		},
		created() {
			NEWSMODULE.getNewsList(this);
		},
		methods : {
			handleSizeChange(value) {

			},
			handleCurrentChange(value) {
				this.pagings.current = value;
				NEWSMODULE.getNewsList(this);
			},
			delRow(row) {
				var that = this;
				this.$confirm('此操作将删除该行, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	NEWSMODULE.deleteNewsRow(that, row.id);
		        }).catch(() => {
		            
		        });
			},
			addNews() {
				window.location.href = "/news/create";
			},
			editorRow(id) {
				window.location.href = "/news/editor/id/" + id;
				/*this.$router.push({
					name : "admin.news.editor",
					params : {
						id : id
					}
				});*/
			}
		}
	}
</script>
<style lang="less">
	.news-list {
		.el-dialog--tiny{
			max-width: 450px;
		}
		.main-pic{
			max-height:50px;
			padding:10px;
		}
	}
</style>