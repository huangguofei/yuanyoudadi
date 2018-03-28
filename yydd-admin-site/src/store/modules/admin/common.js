/*公共业务*/
import * as types from './mutation-types'
import https from "../../../axios/https"
const state = {
	departmentList : [],
	departmentAll : [],
	stageList : [],
	departmentState : "",
	stageState : ""
}
const getters = {
	/*获取部门列表*/
	getDepartmentList(state) {
		if(state.departmentState == "") {
			state.departmentState = "requested";
			https.commAjax({
				method : "get",
				url : "admin/department/getDepartmentList",
				success : function(response) {
					state.departmentList = response;
					var jsonData = JSON.stringify(response);
					state.departmentAll = JSON.parse(jsonData);
					var userInfo = common.getCookie("userInfo");
					userInfo = JSON.parse(userInfo);
					var companyName = userInfo.companyName;
					var allJson = {"departmentName" : companyName, "id" : "-1"}
					state.departmentAll.splice(0,0,allJson);
				}
			});
		}
		return state.departmentList;
	},
	/*默认在部门列表添加全部*/
	getDepartmentAll(state) {
		return state.departmentAll;
	},
	/*获取阶段*/
	getStageList(state) {
		if(state.stageState == "") {
			state.stageState = "requested";
			https.commAjax({
				method : "get",
				url : "admin/department/getlevelName",
				success : function(response) {
					state.stageList = response;
				}
			});
		}
		return state.stageList;
	}
}
const actions = {
	setDepartmentList(context, {jsonData}) {
		context.commit(types.SET_DEPARTMENT_LIST);
	},
	/*添加了部门,部门状态管理更新*/
	updateDeptInfo(context) {
		context.commit(types.UPDATE_DEPT_INFO);
	}
}

const mutations = {
	[types.SET_DEPARTMENT_LIST](state, {jsonData}) {
		state.departmentList = jsonData;
	},
	[types.UPDATE_DEPT_INFO](state) {
		state.departmentState = "";
		getters.getDepartmentList(state);
	}
}
export default{
	state,
	getters,
	actions,
	mutations
}