<template>
	<div class="goods-create con-page">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>当前位置</el-breadcrumb-item>
			<el-breadcrumb-item>新闻管理</el-breadcrumb-item>
			<el-breadcrumb-item v-if="$route.params.id">编辑新闻</el-breadcrumb-item>
			<el-breadcrumb-item v-else>添加新闻</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row class="search-wrap" v-if="$route.params.id">
			编辑新闻
		</el-row>
		<el-row class="search-wrap" v-else>
			添加新闻
		</el-row>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" v-loading="loading" :element-loading-text="loadText">
			<el-form-item label="新闻标题" prop="title">
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="发布时间" prop="publishTime">
				<el-date-picker v-model="time" format="yyyy-MM-dd HH:mm:ss"  @change="getTime" type="datetime" placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="主图" prop="mainPicture">
				<el-upload class="avatar-uploader" action="/yydd-web-admin/admin/image/upload" name="imgFile" :show-file-list="false" :headers="headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.mainPicture" :src="ruleForm.mainPicture" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="新闻简介" prop="title">
				<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="ruleForm.briefContent">
				</el-input>
			</el-form-item>
			<el-form-item label="新闻内容">
				<div id="editorNewsContent" type="text/plain" style="width:1000px;height:450px;"></div>
			</el-form-item>
			<el-form-item>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import NEWSMODULE from "../../../business/admin/news-module"
	export default {
		data() {
			return {
				time:"",
				ruleForm: {
					title: "",
					mainPicture: "",
					briefContent: "",
					detailContent: "",
					publishTime:""
				},
				loading: false,
				loadText: "正在上传中...",
				headers: {},
				editorContent: null,
				rules: {
					title: [{
						required: true,
						message: '请输入新闻标题',
						trigger: 'blur'
					}, ],
					mainPicture: [{
						required: true,
						message: '请选择主图',
						trigger: 'blur'
					}, ],
					briefContent: [{
						required: true,
						message: '请输入新闻简介',
						trigger: 'blur'
					}, ],
				},
			};
		},
		created() {

		},
		mounted() {
			this.editorContent = UE.getEditor('editorNewsContent', {
				BaseUrl: '',
				UEDITOR_HOME_URL: '/static/ueditor/',
				serverUrl: "/yydd-web-admin/admin/image/upload",
				imageFieldName: "imgFile"
			});

			var userInfo = common.getCookie("userInfo");
			userInfo = JSON.parse(userInfo);
			this.headers["token"] = userInfo.token;
			var id = this.$route.params.id;
			if(id) {
				this.ruleForm.id = id;
				NEWSMODULE.getNewsInfo(this);
			}
		},
		methods: {
			submitForm(formName) {
				var that = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						that.loading = true;
						that.loadText = "正在提交中";
						that.ruleForm.detailContent = that.editorContent.getContent();
						NEWSMODULE.saveNewsInfo(that);
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
					this.ruleForm.mainPicture = res.data;
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
				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG,PNG,GIT 格式!');
					return false;
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			getTime(date){
				this.ruleForm.publishTime = date;
				console.log(date)
			}
		}
	}
</script>
<style lang="less">
	.goods-create {
		.el-textarea__inner,
		.el-input__inner {
			width: 40%;
		}
	}
	.el-date-editor--datetime{
		 .el-input__inner{
		 	width: inherit;
		 }
		 
	}
	.el-picker-panel__body-wrapper .el-input__inner{
		 	width: inherit;
		 }
	.view {
		img {
			max-width: 100%;
		}
	}
	
	.el-upload {
		text-align: center;
	}
</style>