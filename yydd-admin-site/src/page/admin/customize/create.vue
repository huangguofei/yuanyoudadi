<template>
	<div class="goods-create con-page">
		<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
				<el-breadcrumb-item>添加商品</el-breadcrumb-item>
			</el-breadcrumb>
		<el-row class="search-wrap">
		  	 添加商品
		</el-row>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading"
    :element-loading-text="loadText">
			  <el-form-item label="商品名" prop="customerName">
			    <el-input v-model="ruleForm.customerName"></el-input>
			  </el-form-item>
			  <el-form-item label="联系电话" prop="phone">
			    <el-input v-model="ruleForm.phone"></el-input>
			  </el-form-item>
			   <el-form-item label="备注" prop="remark">
			    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
			  </el-form-item>
			 
			</el-form>
	</div>
</template>
<script>
	import CUSTOMIZE from "../../../business/admin/customize-module"

  export default {
    data() {
      return {
        ruleForm: {
          customerName: "",
          phone : "",
          remark : "",
        },
        rules: {
          customerName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ]
         
        }
      };
    },
    created() {
    	var id = this.$route.params.id;
    	if(id) {
    		this.ruleForm.customizationInfoId = id;
    		CUSTOMIZE.getCustomizeinfo(this);
    	}
    },
    methods: {
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
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
    }
  }
</script>
<style>
 
</style>