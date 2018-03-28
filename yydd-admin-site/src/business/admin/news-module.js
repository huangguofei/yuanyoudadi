/*
 * author pizhenhua
 * day 2017-10-11
 * 新闻中心业务
 */
 import https from "../../axios/https"
 export default{
 	/*新闻列表*/
 	getNewsList(vm) {
 		var pagings = vm.pagings;
 		var params = {pageNum : pagings.current};
 		https.commAjax({
 			method : "get",
			params:params,
			url : "admin/news/list",
			success : function(response) {
				pagings.size = response.pageSize;
				pagings.pages = response.totalPage;
				pagings.total = response.totalCount;
				vm.tableData = response.resultList;
			}
 		});
 	},
 	/*删除*/
 	deleteNewsRow(vm, id) {
 		var that = this;
 		var params = {id : id};
 		https.commAjax({
 			method : "post",
			params : params,
			url : "admin/news/delete",
			success : function(response) {
				vm.$message({
		          message: '删除成功',
		          type: 'success'
		        });
		        that.getNewsList(vm);
			}
 		});
 	},
 	/*保存*/
 	saveNewsInfo(vm) {
 		var url = "admin/news/add"
 		if(vm.ruleForm.id) {
 			url = "admin/news/edit"
 		}
		https.commAjax({
 			method : "post",
			params : vm.ruleForm,
			url : url,
			success : function(response) {
				vm.$message({
		          message: '提交成功',
		          type: 'success'
		        });
		        vm.$router.push({
		        	name : "admin.news.list"
		        });
			}
 		});
 	},
 	getNewsInfo(vm) {
 		var params = {
 			id : vm.$route.params.id
 		}
 		https.commAjax({
 			method : "post",
			params : params,
			url : "admin/news/detail",
			success : function(response) {
				var form = vm.ruleForm;
				form.title = response.title;
				form.mainPicture = response.mainPicture;
				form.briefContent = response.briefContent;
				form.detailContent = response.detailContent;
				vm.time = response.publishTime;
				UE.getEditor('editorNewsContent').addListener("ready", function () {  
		            UE.getEditor('editorNewsContent').setContent(form.detailContent || "", false);
		        });
				
			}
 		});
 	}
 }