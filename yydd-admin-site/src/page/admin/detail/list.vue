<template>
	<div class="detail-list con-page">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item>商品列表</el-breadcrumb-item>
				<el-breadcrumb-item>{{detailInfo.productName}}</el-breadcrumb-item>
				<el-breadcrumb-item>详情列表</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row class="search-wrap">
			  	 {{detailInfo.productName}}
		  	 	<el-button type="primary" @click="openDialogDetail">添加详情</el-button>
			</el-row>
			  <el-table
			    :data="detailInfo.productDetailDTOList"
			    highlight-current-row
			    style="width: 100%">
			    <el-table-column
			      type="index"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="productPcImage"
			      label="PC背景图"
			      >
			      <template scope="scope">
			      		<p class="img-wrap">
			      			<img :src="scope.row.productPcBgImage">
			      		</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="productWapBgImage"
			      label="手机背景图"
			      >
			      <template scope="scope">
			      		<p class="img-wrap">
			      			<img :src="scope.row.productWapBgImage">
			      		</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="productDetailDescribeImage"
			      label="描述图"
			      >
			      <template scope="scope">
			      		<p class="img-wrap">
			      			<img :src="scope.row.productDetailDescribeImage">
			      		</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="200">
			      <template scope="scope">
			        
			      </template>
			    </el-table-column>
			  </el-table>
			  
			<el-dialog
			  title="添加详情"
			  :visible.sync="dialogVisible"
			  size="tiny"
			  :before-close="handleClose">
			  <el-form :model="ruleForm"  ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading"
    :element-loading-text="loadText">
					  <el-col :span="8">
					  		<label>PC背景图</label>
						    <el-upload
								  class="avatar-uploader"
								  action="/yydd-web-admin/admin/image/upload"
								  name= "imgFile" 
								  :show-file-list="false"
								  :headers="headers"
								  :on-success="pcBgImageSuccess"
								  :before-upload="beforeAvatarUpload">
								  <img v-if="ruleForm.productPcBgImage" :src="ruleForm.productPcBgImage" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-col>
					  <el-col :span="8">
					  		<label>手机背景图</label>
							    <el-upload
									  class="avatar-uploader"
									  action="/yydd-web-admin/admin/image/upload"
									  name= "imgFile" 
									  :show-file-list="false"
									  :headers="headers"
									  :on-success="wapBgImageSuccess"
									  :before-upload="beforeAvatarUpload">
									  <img v-if="ruleForm.productWapBgImage" :src="ruleForm.productWapBgImage" class="avatar">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
						</el-col>
						<el-col :span="8">
					  		<label>描述图</label>
						    <el-upload
								  class="avatar-uploader"
								  action="/yydd-web-admin/admin/image/upload"
								  name= "imgFile" 
								  :show-file-list="false"
								  :on-success="descImageSuccess"
								  :before-upload="beforeAvatarUpload">
								  <img v-if="ruleForm.productDetailDescribeImage" :src="ruleForm.productDetailDescribeImage" class="avatar">
								  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
						</el-col>
				 
				</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="confimDetail()">确 定</el-button>
			  </span>
			</el-dialog>
	</div>
</template>
<script>
	import GOODS from "../../../business/admin/goods-module"
	export default{
		data() {
			return {
				detailInfo : "",
				dialogVisible : false,
				ruleForm : {
					productId : "",
					productWapBgImage : "",
					productPcBgImage : "",
					productDetailDescribeImage : ""
				},
				loading : false,
        		loadText : "正在上传中...",
        		headers : {}
			}
		},
		created() {
			var userInfo = common.getCookie("userInfo");
			userInfo = JSON.parse(userInfo);
			this.headers["token"] = userInfo.token;
			this.ruleForm.productId = this.$route.params.productId;
			GOODS.getProdDetail(this);
		},
		methods : {
			openDialogDetail() {
				var that = this;
				that.dialogVisible = true;
			},
			pcBgImageSuccess(res, file) {
				this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productPcBgImage = res.data;
		      	} else {
		      		this.$message.error(res.msg);
		      	}
		      },
		      wapBgImageSuccess(res, file) {
		      	this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productWapBgImage = res.data;
		      	} else {
		      		this.$message.error(res.msg);
		      	}
		      },
		      descImageSuccess(res, file) {
		      	this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productDetailDescribeImage = res.data;
		      	} else {
		      		this.$message.error(res.msg);
		      	}
		      },
		      beforeAvatarUpload(file) {
		      		this.loadText = "正在上传中...";
		      		this.loading = true;
		      		var isJPG = false;
		      		if(file.type === "image/jpeg" || file.type === "image/png" || file.type == "image/gif") {
		      			isJPG = true;
		      		}
			        const isLt2M = file.size / 1024 / 1024 < 2;
			        if (!isJPG) {
			          this.$message.error('上传头像图片只能是 JPG,PNG,GIT 格式!');
		          		return false;
			        }
			        if (!isLt2M) {
			          this.$message.error('上传头像图片大小不能超过 2MB!');
			        }
			        return isJPG && isLt2M;
			   },
			   handleClose() {
			   		this.dialogVisible = false;
			   },
			   confimDetail() {
			   		var  form = this.ruleForm;
			   		if(!form.productPcBgImage) {
			   			this.$message.error('请上传PC背景图');
			   			return false;
			   		} else if(!form.productWapBgImage) {
			   			this.$message.error('请上传手机背景图');
			   			return false;
			   		} else if(!form.productDetailDescribeImage) {
			   			this.$message.error('请上传描述图');
			   			return false;
			   		}
			   		this.loading = true;
	          		this.loadText = "正在提交中";
			   		GOODS.saveProdDetailInfo(this);
			   }
		}
	}
</script>
<style lang="less">
	.detail-list{
		.img-wrap{
			height:70px;
			padding:10px;
			img{
				height:100%;
			}
		}
		.el-col{
			padding-left:20px;
			padding-bottom:20px;
			label{
				padding-bottom:10px;
				display: inline-block;
			}
		}
	}
</style>