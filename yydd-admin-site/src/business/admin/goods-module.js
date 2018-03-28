/*
 * author pizhenhua
 * day 2017-7-13
 * 商品业务
 */
 import https from "../../axios/https"
 export default{
 	/*获取商品列表*/
 	getGoodsList(vm) {
 		var pagings = vm.pagings;
 		var params = {name : vm.name, pageNum : pagings.current};
 		https.commAjax({
 			method : "get",
			params:params,
			url : "admin/product/list",
			success : function(response) {
				pagings.current = response.currentPage;
				pagings.size = response.pageSize;
				pagings.pages = response.totalPage;
				pagings.total = response.totalCount;
				vm.tableData = response.resultList;
			}
 		});
 	},
 	prodOfflineApi(vm, row) {
 		var params = {productId : row.productId};
 		https.commAjax({
 			method : "post",
			params:params,
			url : "admin/product/offline",
			success : function(response) {
				row.productStatus = 0;
				vm.$message({
		          message: '下线成功',
		          type: 'success'
		        });
			}
 		});
 	},
 	prodOnlineApi(vm, row) {
 		var params = {productId : row.productId};
 		https.commAjax({
 			method : "post",
			params : params,
			url : "admin/product/online",
			success : function(response) {
				row.productStatus = 1;
				vm.$message({
		          message: '上线成功',
		          type: 'success'
		        });
			}
 		});
 	},
 	deleteProd(vm, row) {
 		var params = {productId : row.productId};
 		var that = this;
 		https.commAjax({
 			method : "post",
			params : params,
			url : "admin/product/delete",
			success : function(response) {
				row.productStatus = -1;
				that.getGoodsList(vm);
			}
 		});
 	},
 	/*获取产品详情*/
 	getProdDetail(vm) {
 		var productId = vm.$route.params.productId;
 		if(productId) {
 			var params = {productId : productId}
 			https.commAjax({
	 			method : "post",
				params : params,
				url : "admin/product/detail",
				success : function(response) {
					vm.detailInfo = response;

				}
	 		});
 		}
 	},
 	/*保存商品信息*/
 	savePordInfo(vm) {
 		var url = "admin/product/add"
 		if(vm.ruleForm.productId) {
 			url = "admin/product/edit"
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
		        	name : "admin.goods.list"
		        });
			}
 		});
 	},
 	/*查询商品信息*/
 	getGoodsinfo(vm) {
 		var params = {productId : vm.ruleForm.productId};
 		https.commAjax({
 			method : "post",
			params : params,
			url : "admin/product/detail",
			success : function(response) {
				var form = vm.ruleForm;
				form.productName = response.productName ? response.productName : "";
				form.content = response.content ? response.content : "";
				form.remark = response.remark ? response.remark : "";
				form.productSEO = response.productSeo ? response.productSeo : "";
				form.productPCImage = response.productPcImage ? response.productPcImage : "";
				form.productWapimage = response.productWapImage ? response.productWapImage : "";
				form.jdPurchaseAddress = response.jdPurchaseAddress;
				form.youzanPurchaseAddress = response.youzanPurchaseAddress;
				form.constitutionInfoId = response.constitutionInfoId;
				form.productDetailWap = response.productDetailWap;
				form.productDetailPc = response.productDetailPc;

				form.productIcon = response.productIcon;
				form.productBGPC = response.productBGPC;
				form.productBGWap = response.productBGWap;

				form.productInnerPacking = response.productInnerPacking;
				form.productOuterPacking = response.productOuterPacking;
				form.brefDesc = response.brefDesc;
				vm.checkList = response.constitutionInfoId.split(",");

				UE.getEditor('editorH5').addListener("ready", function () {  
		               UE.getEditor('editorH5').setContent(form.productDetailWap || "", false);
		        });
		        UE.getEditor('editorPC').addListener("ready", function () {  
		               UE.getEditor('editorPC').setContent(form.productDetailPc || "", false);
		        });
	        	vm.reportsList = JSON.parse(response.reports) ? JSON.parse(response.reports) : [];
		        
			}
 		});
 	},
 	/*详情保存*/
 	saveProdDetailInfo(vm) {
 		var that = this;
 		https.commAjax({
 			method : "post",
			params : vm.ruleForm,
			url : "admin/product/addProductDetail",
			success : function(response) {
				vm.$message({
		          message: '提交成功',
		          type: 'success'
		        });
		        that.dialogVisible = false;
		        that.getProdDetail(vm);
			}
 		});
 	}
 }