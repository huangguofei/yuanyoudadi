/*公共js*/
window.common = {
	/*创建和存储 cookie*/
	setCookie : function(name,value,Days) {
		var Days = Days ? Days : 60;   //cookie 将被保存两个月
		var exp  = new Date();  //获得当前时间
		exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	/*读cookie*/
	getCookie : function(name) {
		 var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		 if(arr != null)return unescape(arr[2]); 
		 return null;
	}
}