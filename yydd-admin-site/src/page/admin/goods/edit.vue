<template>
	<div class="goods-create con-page">
		<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item v-if="$route.params.productId">编辑商品</el-breadcrumb-item>
				<el-breadcrumb-item v-else>添加商品</el-breadcrumb-item>
			</el-breadcrumb>
		<el-row class="search-wrap" v-if="$route.params.productId">
		  	 编辑商品
		</el-row>
		<el-row class="search-wrap" v-else >
		  	 添加商品
		</el-row>
		<el-row>
		  	<el-col :span="4">
		  			<el-steps :space="300" :active="stepActive" direction="vertical">
						  <el-step title="商品基本信息"></el-step>
						  <el-step title="wap详情"></el-step>
						  <el-step title="pc详情"></el-step>
					</el-steps>
			</el-col>
		  	<el-col :span="20">
  					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" v-loading="loading"
					    :element-loading-text="loadText" v-show="stepActive == 1">
								  <el-form-item label="商品名" prop="productName">
								    <el-input v-model="ruleForm.productName"></el-input>
								  </el-form-item>
								  <el-form-item label="体质类型" prop="constitutionInfoId" >
										 <el-checkbox-group v-model="checkList">
										    <el-checkbox :label="item.value" v-for="(item, index) in consOptions" :key="index">{{item.label}}</el-checkbox>
										  </el-checkbox-group>
								  </el-form-item>
								 
						  		<el-row>
						  			<el-col :span="6">
						  				 <el-form-item label="PC商品图" prop="productPCImage">
						  				 	 <el-upload
												  class="avatar-uploader"
												  action="/yydd-web-admin/admin/image/upload"
												  name= "imgFile" 
												  :show-file-list="false"
												  :headers="headers"
												  :on-success="handleAvatarSuccess"
												  :before-upload="beforeAvatarUpload">
												  <img v-if="ruleForm.productPCImage" :src="ruleForm.productPCImage" class="avatar">
												  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
										  </el-form-item>
						  			</el-col>
						  			<el-col :span="12">
						  					 <el-form-item label="手机商品图" prop="productWapimage">
											    <el-upload
													  class="avatar-uploader"
													  action="/yydd-web-admin/admin/image/upload"
													  name= "imgFile" 
													  :show-file-list="false"
													  :headers="headers"
													  :on-success="handleWapSuccess"
													  :before-upload="beforeAvatarUpload">
													  <img v-if="ruleForm.productWapimage" :src="ruleForm.productWapimage" class="avatar">
													  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
													</el-upload>
											  </el-form-item>
						  			</el-col>
						  		</el-row>
						  		<el-row>
						  			<el-col :span="6">
						  				 <el-form-item label="PC背景图" prop="productBGPC">
						  				 	 <el-upload
												  class="avatar-uploader"
												  action="/yydd-web-admin/admin/image/upload"
												  name= "imgFile" 
												  :show-file-list="false"
												  :headers="headers"
												  :on-success="productBGPCSuccess"
												  :before-upload="beforeAvatarUpload">
												  <img v-if="ruleForm.productBGPC" :src="ruleForm.productBGPC" class="avatar">
												  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
										  </el-form-item>
						  			</el-col>
						  			<el-col :span="12">
						  					 <el-form-item label="手机背景图" prop="productBGWap">
											    <el-upload
													  class="avatar-uploader"
													  action="/yydd-web-admin/admin/image/upload"
													  name= "imgFile" 
													  :show-file-list="false"
													  :headers="headers"
													  :on-success="productBGWapSuccess"
													  :before-upload="beforeAvatarUpload">
													  <img v-if="ruleForm.productBGWap" :src="ruleForm.productBGWap" class="avatar">
													  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
													</el-upload>
											  </el-form-item>
						  			</el-col>
						  		</el-row>
						  		<el-row>
						  			<el-col :span="6">
						  				 <el-form-item label="产品外罐图" prop="productOuterPacking">
						  				 	 <el-upload
												  class="avatar-uploader"
												  action="/yydd-web-admin/admin/image/upload"
												  name= "imgFile" 
												  :show-file-list="false"
												  :headers="headers"
												  :on-success="productOuterPackingSuccess"
												  :before-upload="beforeAvatarUpload">
												  <img v-if="ruleForm.productOuterPacking" :src="ruleForm.productOuterPacking" class="avatar">
												  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
										  </el-form-item>
						  			</el-col>
						  			<el-col :span="12">
						  					 <el-form-item label="产品内袋图" prop="productInnerPacking">
											    <el-upload
													  class="avatar-uploader"
													  action="/yydd-web-admin/admin/image/upload"
													  name= "imgFile" 
													  :show-file-list="false"
													  :headers="headers"
													  :on-success="productInnerPackingSuccess"
													  :before-upload="beforeAvatarUpload">
													  <img v-if="ruleForm.productInnerPacking" :src="ruleForm.productInnerPacking" class="avatar">
													  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
													</el-upload>
											  </el-form-item>
						  			</el-col>
						  		</el-row>
								    <el-form-item label="商品图标" prop="productIcon">
								    	<el-upload
										  class="avatar-uploader"
										  action="/yydd-web-admin/admin/image/upload"
										  name= "imgFile" 
										  :show-file-list="false"
										  :headers="headers"
										  :on-success="productIconSuccess"
										  :before-upload="beforeAvatarUpload">
										  <img v-if="ruleForm.productIcon" :src="ruleForm.productIcon" class="avatar">
										  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
								  </el-form-item>
								    <el-form-item label="报告" prop="reports">
								    	<el-upload
										  action="/yydd-web-admin/admin/image/upload"
										  list-type="picture-card"
										  name= "imgFile" 
										  :file-list="reportsList"
										  :before-upload="beforeAvatarUpload"
										  :on-success="handleReportsSuccess"
										  :on-remove="handleRemove">
										  <i class="el-icon-plus"></i>
										</el-upload>
								  </el-form-item>
								  <el-form-item label="地图和产品关联" prop="brefDesc">
								    <el-input v-model="ruleForm.brefDesc" placeholder="按地图上茶品顺序 如：tea-1"></el-input>
								  </el-form-item>
								  <el-form-item label="京东购买地址" prop="jdPurchaseAddress">
								    <el-input v-model="ruleForm.jdPurchaseAddress"></el-input>
								  </el-form-item>
								  <el-form-item label="有赞购买地址" prop="youzanPurchaseAddress">
								    <el-input v-model="ruleForm.youzanPurchaseAddress"></el-input>
								  </el-form-item>
								   <el-form-item label="商品seo" prop="productSEO">
								    <el-input type="textarea" v-model="ruleForm.productSEO"></el-input>
								  </el-form-item>
								  <el-form-item label="商品描述" prop="content">
								    <el-input type="textarea" v-model="ruleForm.content"></el-input>
								  </el-form-item>
								 
								 <!--   <el-form-item label="商品备注" prop="remark">
								    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
								  </el-form-item> -->
								  <el-form-item>
								  	<el-button @click="resetForm('ruleForm')">重置</el-button>
								  	<el-button style="margin-top: 12px;" @click="next('ruleForm')">下一步</el-button>
								    <!-- <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button> -->
								  </el-form-item>
								</el-form>
								<div id="editorH5" type="text/plain" style="width:375px;height:450px;" v-show="stepActive == 2"></div>
								<el-button style="margin-top: 12px;" @click="prev" v-show="stepActive == 2">上一步</el-button>
								<el-button style="margin-top: 12px;" @click="next()" v-show="stepActive == 2">下一步</el-button>

								<div id="editorPC" type="text/plain" style="width:1000px;height:500px;" v-show="stepActive == 3"></div>
								<el-button style="margin-top: 12px;" @click="prev" v-show="stepActive == 3">上一步</el-button>
								<el-button type="primary" @click="submitForm('ruleForm')" v-show="stepActive == 3">提交</el-button>
			</el-col>
		</el-row>
			
	</div>
</template>
<script>
import GOODS from "../../../business/admin/goods-module"

  export default {
    data() {
      return {
        ruleForm: {
          productName: "",
          content : "",
          remark : "",
          productSEO : "",
          productPCImage : "",
          productWapimage : "",
          jdPurchaseAddress : "",
          youzanPurchaseAddress : "",
          constitutionInfoId : "",
          productDetailWap : "",
          productDetailPc : "",
          productIcon : "",
          productBGPC : "",
          productBGWap : "",
          productInnerPacking : "",
          productOuterPacking : "",
          brefDesc : ""
        },
        checkList : [],
        reportsList : [],
        loading : false,
        loadText : "正在上传中...",
        headers : {},
        rules: {
          productName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          productPCImage: [
            { required: true, message: '请选择PC商品图', trigger: 'blur' },
          ],
          productWapimage: [
            { required: true, message: '请选择手机商品图', trigger: 'blur' },
          ],
          constitutionInfoId : [
          	{ required: true, message: '请选择体质类型', trigger: 'blur' }
          ],
          reports: [
          	{ required: true, message: '请选择报告图片', trigger: 'blur' }
          ],
           productIcon: [
          	{ required: true, message: '请选择商品图标', trigger: 'blur' }
          ],
          productBGPC: [
          	{ required: true, message: '请选择PC商品背景图', trigger: 'blur' }
          ],
          productBGWap: [
          	{ required: true, message: '请选择手机背景图', trigger: 'blur' }
          ],
          productInnerPacking: [
          	{ required: true, message: '请选择产品内袋图图', trigger: 'blur' }
          ],
          productOuterPacking: [
          	{ required: true, message: '请选择产品外罐图图', trigger: 'blur' }
          ],
        },
        stepActive: 1,
        consOptions : [
        	{
        		value : "1",
        		label : "平和体质"
        	},
        	{
        		value : "2",
        		label : "气虚体质"
        	},
        	{
        		value : "3",
        		label : "阳虚体质"
        	},
        	{
        		value : "4",
        		label : "阴虚体质"
        	},
        	{
        		value : "5",
        		label : "痰湿体质"
        	},
        	{
        		value : "6",
        		label : "湿热体质"
        	},
        	{
        		value : "7",
        		label : "血瘀体质"
        	},
        	{
        		value : "8",
        		label : "气郁体质"
        	},
        	{
        		value : "9",
        		label : "特禀体质"
        	}
        ],
        ueH5 : null,
        uePC : null,
      };
    },
    created() {
    },
    mounted() { 
		this.ueH5 = UE.getEditor('editorH5',{ 
			BaseUrl: '', 
			UEDITOR_HOME_URL: '/static/ueditor/', 
			serverUrl : "/yydd-web-admin/admin/image/upload",
			imageFieldName : "imgFile"
		}); 
    	this.uePC = UE.getEditor('editorPC',{ 
			BaseUrl: '', 
			UEDITOR_HOME_URL: '/static/ueditor/', 
			serverUrl : "/yydd-web-admin/admin/image/upload",
			imageFieldName : "imgFile"
		});
		var userInfo = common.getCookie("userInfo");
			userInfo = JSON.parse(userInfo);
		this.headers["token"] = userInfo.token;
    	var productId = this.$route.params.productId;
    	if(productId) {
    		this.ruleForm.productId = productId;
    		GOODS.getGoodsinfo(this);
    	}
	}, 
    methods: {

	      submitForm(formName) {
	      	var that = this;
	      	that.ruleForm.constitutionInfoId = that.checkList.join(",");
	      	that.ruleForm.reports = JSON.stringify(that.reportsList);
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	that.loading = true;
	          	that.loadText = "正在提交中";
	          	that.ruleForm.productDetailWap = that.ueH5.getContent();
	          	that.ruleForm.productDetailPc = that.uePC.getContent();
	            GOODS.savePordInfo(that);
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
	      handleAvatarSuccess(res, file) {
	      	this.loading = false;
	      	if(res.code == 200) {
	      		this.ruleForm.productPCImage = res.data;
	      	} else {
	      		this.$message.error(res.msg);
	      	}
	      },
	      handleWapSuccess(res, file) {
	      	this.loading = false;
	      	if(res.code == 200) {
	      		this.ruleForm.productWapimage = res.data;
	      	} else {
	      		this.$message.error(res.msg);
	      	}
	      },
	       productIconSuccess(res, file) {
	      		this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productIcon = res.data;
		      	} else {
		      		this.$message.error(res.msg);
		      	}
	      },
	       productBGPCSuccess(res, file) {
	      		this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productBGPC = res.data;
		      	} else {
		      		this.$message.error(res.msg);
		      	}
	      },
	       productBGWapSuccess(res, file) {
	      		this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productBGWap = res.data;
		      	} else {
		      		this.$message.error(res.msg);
		      	}
	      },
	       productOuterPackingSuccess(res, file) {
	      		this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productOuterPacking = res.data;
		      	} else {
		      		this.$message.error(res.msg);
		      	}
	      },
	       productInnerPackingSuccess(res, file) {
	      		this.loading = false;
		      	if(res.code == 200) {
		      		this.ruleForm.productInnerPacking = res.data;
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
			next(val) {
				if(val) {
					var that = this;
			      	that.ruleForm.constitutionInfoId = that.checkList.join(",");
			      	that.ruleForm.reports = JSON.stringify(that.reportsList);
			        this.$refs[val].validate((valid) => {
			          if (valid) {
			          	if (this.stepActive++ > 2) this.stepActive = 1;
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
				} else {
					if (this.stepActive++ > 2) this.stepActive = 1;
				}
				
			},
			prev() {
				this.stepActive--;
			},
			handleReportsSuccess(res, file) {
				this.loading = false;
		      	if(res.code == 200) {
		      		this.reportsList.push({url : res.data, status: 'finished'});
		      	} else {
		      		this.$message.error(res.msg);
		      	}
			},
			handleRemove(file, fileList) {
				this.reportsList =  fileList;
			}
    }
  }
</script>
<style lang="less">
 	.goods-create{
 		.el-textarea__inner,.el-input__inner{
 			width: 40%;
 		}
 	}
 	.view{
 		img{
 			max-width:100%;
 		}
 	}
</style>