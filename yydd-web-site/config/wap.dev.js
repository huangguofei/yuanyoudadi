/**
 * wap app gulp 配置文件
 * @author      pizhenhua
 * @verstion    {1.0}
 * @create     2017-7-12
 */
var url = "src/wap/";
var distUrl = "dist/wap/";
var path = {
	js : [url + 'lib/js/*.js', url + 'pages/*/js/*.js'],
	less : [url+'lib/less/*less', url + 'pages/*/less/*.less'],
	html : [url+'pages/**/*.html'],
	tpl : [url+'pages/*/*.tpl'],
	plugin : [url + "lib/js/plugin/*"],
	imgs : [url + "lib/imgs/*"] 
};
var dist = {
	js : distUrl + "js",
	plugin : distUrl + "js/plugin",
	css : distUrl + "css",
	html : distUrl + "view",
	imgs : distUrl + "images"
}
module.exports = {path, dist};