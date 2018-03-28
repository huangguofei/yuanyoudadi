<template>
	<div class="customize-list con-page">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>定制管理</el-breadcrumb-item>
				<el-breadcrumb-item>定制列表</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row class="search-wrap">
			  	 <el-col :span="3">
			  	 	<el-input v-model="name" placeholder="请输入内容"></el-input>
			  	 </el-col>
			  	 <el-col :span="3" style="margin-left:10px;">
			  	 	<el-input v-model="phone" placeholder="请输入联系电话"></el-input>
			  	 </el-col>
			  	 <el-col :span="2">
			  	 	<el-button style="margin-left:20px;" @click="queryInfo()">查询</el-button>
			  	 </el-col>
			  	 <el-col :span="2">
				  	 	<el-button type="primary" @click="newAddCustomize()">添加定制信息</el-button>
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
			      prop="customerName"
			      label="姓名"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="联系电话"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="remark"
			      label="备注"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="productStatus"
			      label="状态"
			      >
			      <template scope="scope">
			      	<span class="normal" v-if="scope.row.status == 0">未处理</span>
			      	<span class="forbidden" v-if="scope.row.status == 1">已完成</span>
			      </template>
			    </el-table-column>
			    
			    <el-table-column
			      label="操作"
			      width="200">
			      <template scope="scope">
			        <el-button type="text" size="small" @click="editCustomizeInfo(scope.row, scope.$index)">编辑</el-button>
			        <el-button type="text" size="small" @click="delCustomize(scope.row)">删除</el-button>
			        <el-button type="text" size="small" @click="completeCustomize(scope.row)" v-if="scope.row.status == 0">完成</el-button>
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
			    <el-dialog
				  title="定制信息"
				  :visible.sync="dialogVisible"
				  size="tiny"
				  :before-close="handleClose">
			  		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" >
					  <el-form-item label="姓名" prop="customerName">
					    <el-input v-model="ruleForm.customerName"></el-input>
					  </el-form-item>
					  <el-form-item label="联系电话" prop="phone">
					    <el-input v-model="ruleForm.phone"></el-input>
					  </el-form-item>
					   <el-form-item label="备注" prop="remark">
					    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
					  </el-form-item>
					 
					</el-form>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
				  </span>
				</el-dialog>
	</div>
</template>
<script>
	import CUSTOMIZE from "../../../business/admin/customize-module"
	export default{
		data() {
			return {
				name : "",
				phone : "",
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
			CUSTOMIZE.getCustomizeList(this);
		},
		methods : {
			queryInfo() {
				CUSTOMIZE.getCustomizeList(this);
			},
			newAddCustomize() {
				var form = this.ruleForm;
				form.customizationInfoId = "",
				form.customerName = "",
				form.phone = "",
				form.remark = "";
				this.dialogVisible = true;
			},
			submitForm(formName) {
		      	var that = this;
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            CUSTOMIZE.saveCustomizeInfo(that);
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      },
			handleClose() {
				this.dialogVisible = false;
			},
			editCustomizeInfo(row, index) {
				this.dialogVisible = true;
				var rowStr = JSON.stringify(row);
				this.ruleForm = JSON.parse(rowStr);
				this.editIndex = index;
			},
			handleSizeChange(value) {

			},
			handleCurrentChange(value) {
				this.pagings.current = value;
				CUSTOMIZE.getCustomizeList(this);
			},
			delCustomize(row) {
				var that = this;
				this.$confirm('此操作将删除该行, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	console.log(row.customizationId);
		          	CUSTOMIZE.deleteCustomize(that, row.customizationInfoId);
		        }).catch(() => {
		            
		        });
			},
			completeCustomize(row) {
				var that = this;
				this.$confirm('此操作将完成定制, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	CUSTOMIZE.completeCustInfo(that, row);
		        }).catch(() => {
		            
		        });
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