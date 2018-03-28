/*
 * author pizhenhua
 * day 2017-9-7
 * 定制业务
 */
import https from "../../axios/https"
 export default{
 	/*获取定制信息列表*/
 	getCommentList(vm) {
 		var pagings = vm.pagings;
 		var params = {pageNum : pagings.current};
 		https.commAjax({
 			method : "get",
			params:params,
			url : "admin/comment/list",
			success : function(response) {
				pagings.size = response.pageSize;
				pagings.pages = response.totalPage;
				pagings.total = response.totalCount;
				vm.tableData = response.resultList;
			}
 		});
 	}
}