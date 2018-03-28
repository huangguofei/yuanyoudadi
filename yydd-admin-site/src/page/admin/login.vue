<!-- 服务商登录 -->
<template>
	<div class="login" @keyup.enter="submitForm('ruleForm')">
		<div class="login-content">
			<!-- <div class="logo-wrap">
				<img src="../../images/logo.png" />
			</div> -->
			<h2>源优大地系统用户登录</h2>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
				<el-form-item  prop="userName">
				    <el-input type="text" v-model="ruleForm.userName" auto-complete="off" placeholder="用户名" :maxlength="12" @keyup="validateMobile('ruleForm.userName')">
				     <template slot="prepend">
				     	<img src="../../images/login_account@1x.png" />
				     </template>
					</el-input>
				 </el-form-item>
				<el-form-item  prop="password">
				    <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码" :maxlength="20">
				    <template slot="prepend">
				    	<img src="../../images/login_secret@1x.png" />
				    </template>
				</el-input>
				 </el-form-item>
				 <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')" id="loginValidate" v-loading="loading2">登 录</el-button>
				  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];           
     if(e && e.keyCode==13){ // enter 键
         document.getElementById("loginValidate").click();
    }
}
import https from "../../axios/https"
import MD5 from "../../business/plugin/md5"

export default{
	data() {
		return{
			ruleForm : {
				userName : "",
				password : ""
			},
			rules : {
				password: [
                   { required: true, message: '请输入密码', trigger: 'blur' },
		        ],
		        userName: [
		            { required: true, message: '请输入用户名', trigger: 'blur' },
		        ],
			},
			 loading2: false
		}
	},
	created() {
	},
	methods : {
		validateMobile(value){
			console.log(value)
		},
		 submitForm(formName) {
		 	var _that = this;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          		var userNameAjax = _that.ruleForm.userName.replace(/(^\s*)|(\s*$)/g,'');
	          		var passwordAjax = _that.ruleForm.password.replace(/(^\s*)|(\s*$)/g,'');
	          		if(userNameAjax.indexOf(" ") != -1){
	          			return false
	          		}
					var MD5password = MD5(passwordAjax);
					var params={"userName":userNameAjax,"pwd":MD5password};
					_that.loading2 = true;
					https.commAjax({
						method : "post",
						params:params,
						url : "admin/user/login",
						success : function(response) {
							_that.loading2 = false;
						    var userInfo = {
								nickName : response.realName,
								mobile : response.phone,
								token : response.token,
								type : "admin"
							}
							common.setCookie("userInfo" , JSON.stringify(userInfo));
							_that.$router.push({path : "/main"});
						},error : function() {
							_that.loading2 = false;
						}
					});
	          } else {
	            return false;
	          }
	        });
      },
	}
}
</script>
<style lang="less">
	@import "../../common/css/config.less";
	.login{
		width:100%;
		height:100%;
		background: url(../../images/bjing@1x.jpg) no-repeat;
		background-size:cover;
		.login-content{
			position: absolute;
			left:50%;
			top:50%;
			margin-left:-230px;
			margin-top:-240px;
			width:360px;
			height:380px;
			background: rgba(255, 255, 255, 0.5);
			border-radius:20px;
			padding:50px;
			text-align: center;
		}
		.logo-wrap{
			width:100%;
			text-align:center;
			img{
				height:100%;
			}
		}
		h2{
			color:rgba(255, 255, 255, 0.9);
			height:60px;
			line-height: 60px;
			font-weight: normal;
			font-size:26px;
		}
		.el-form-item{
			margin-bottom:30px;
		}
		.el-form-item__content{
			.el-input__inner{
				float:left;
				width:300px;
			}
			.el-input-group--prepend{
				border:2px solid rgba(255, 255, 255, 0.3);
				border-radius:8px;
				margin-bottom: 6px;
			}
			.el-input-group__prepend{
				background: rgba(255, 255, 255, 0);
				border:0;
				position: relative;
				img{
					width:18px;
					margin-top:3px;
				}
			}
			.el-input-group__prepend:before{
				position: absolute;
				content: " ";
				height:30px;
				top:10px;
				right:0;
				border-right:2px solid rgba(255, 255, 255, 0.3);
			}
			.el-input__inner{
				height:50px;
				background: rgba(255, 255, 255, 0);
				border:0px solid rgba(255, 255, 255, 0.7);
				font-size:18px;
				color:@mainColor;
			}
			.el-button--primary{
				width:100%;
				border-radius: 8px;
				height:50px;
				font-size:24px;
				color:rgba(255, 255, 255, 0.7);
			}
		}
		
	}
</style>