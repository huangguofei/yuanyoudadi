/*重新封装ajax*/
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';
import {router} from '../router/router'
export default{
	commAjax(opts) {
		if(!opts) return false;
		var that = this;
		var url = (opts.url ? process.env.API_ROOT + opts.url : null);
		var params = opts.params ? opts.params : {};
		var header = {'X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
		if(common.getCookie("userInfo")) {
			var userInfo = common.getCookie("userInfo");
			userInfo = JSON.parse(userInfo);
			header["token"] = userInfo.token;
		}
		axios({
			method : (opts.method ? opts.method : "get"),
			url : url,
			data : qs.stringify(params),
			headers: header,
		}).then(function(response) {
			that.callbankSussess(response,opts);
		},function(response) {
			that.callBankError(response,opts);
		})
	},
	/*回调*/
	callbankSussess(response,opts) {
		var data = response.data;
		var httpCode = data.code;
		if(httpCode == 200) {
			opts.success(data.data);
		} else if(httpCode == 203 || httpCode == 204) {
			Message({type: 'info', message: data.msg}); 
			router.push({path : "/login"});
			/*var userInfo = common.getCookie("userInfo");
			if(userInfo) {
				userInfo = JSON.parse(userInfo);
				var type = userInfo.type;
				
			}*/
		}else if(httpCode == 303) {
			//用户名或密码失败
			opts.error ? opts.error(data) : '';
		}else {
			opts.error ? opts.error(data) : '';
			Message({type: 'info', message: data.msg});  
		}
	},
	callBankError(response,opts) {
		var data = response.data;
		Message({type: 'info', message: "服务器异常！"});  
		opts.error ? opts.error(data) : '';
	}
}


