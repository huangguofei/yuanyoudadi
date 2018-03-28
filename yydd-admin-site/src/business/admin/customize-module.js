/*
 * author pizhenhua
 * day 2017-7-13
 * 定制业务
 */
import https from "../../axios/https"
 export default{
 	/*获取定制信息列表*/
 	getCustomizeList(vm) {
 		var pagings = vm.pagings;
 		var params = {name : vm.name, phone : vm.phone, pageNum : pagings.current};
 		https.commAjax({
 			method : "get",
			params:params,
			url : "admin/customize/list",
			success : function(response) {
				pagings.size = response.pageSize;
				pagings.pages = response.totalPage;
				pagings.total = response.totalCount;
				vm.tableData = response.resultList;
			}
 		});
 	},
 	/*保存*/
 	saveCustomizeInfo(vm) {
 		var that = this;
 		var id = vm.ruleForm.customizationInfoId;
 		var url = "admin/customize/add"
 		if(id) {
 			url = "admin/customize/edit"
 		}
 		https.commAjax({
 			method : "post",
			params:vm.ruleForm,
			url : url,
			success : function(response) {
				vm.dialogVisible = false;
				vm.$message({
		          message: '提交成功',
		          type: 'success'
		        });
		        that.getCustomizeList(vm);
			}
 		});
 	},
 	/*删除*/
 	deleteCustomize(vm, id) {
 		var that = this;
 		var params = {customizationId : id};
 		https.commAjax({
 			method : "post",
			params : params,
			url : "admin/customize/delete",
			success : function(response) {
				vm.$message({
		          message: '删除成功',
		          type: 'success'
		        });
		        that.getCustomizeList(vm);
			}
 		});
 	},
 	completeCustInfo(vm, row) {
 		var that = this;
 		var params = {customizationId : row.customizationId};
 		https.commAjax({
 			method : "post",
			params : params,
			url : "admin/customize/handle",
			success : function(response) {
				vm.$message({
		          message: '提交成功',
		          type: 'success'
		        });
		        row.status = 1;
			}
 		});
 	}

 }