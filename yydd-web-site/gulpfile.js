/**
 * rosegal app gulp 配置文件
 * @author      pizhenhua
 * @verstion    {1.0}
 * @create     2017-6-29
 */
var verstion = "1.0"
var gulp = require('gulp'),
    // 更名
    rename = require("gulp-rename"),
    // 压缩js
    uglify = require('gulp-uglify'),
    // 编译Less文件
    less = require("gulp-less"),
    //创建服务器
    connect = require('gulp-connect'),
    // 压缩css文件
    minifyCss = require('gulp-minify-css'),
    // 文件合并
    concat = require('gulp-concat'),
    // 输出字符加颜色
    chalk = require('chalk'), 
    // 桌面通知
    notify = require("gulp-notify"),
    // 路径扩展
    watchPath = require('gulp-watch-path'),
    //补全浏览器兼容的css
    autoprefixer = require('gulp-autoprefixer'), 
    //监听事件
     watch = require('gulp-watch'),
     //模板公共部分
     fileinclude  = require('gulp-file-include'),

     base64 = require('gulp-base64'),
     //web
     webConfig = require('./config/web.dev'),
     //wap
     wapConfig = require('./config/wap.dev'),

     proxy = require('http-proxy-middleware'),

     cssBase64 = require('gulp-css-base64');


// 处理器
var handle = {
    Errors: function(err){
        console.log('-------------- '+ chalk.bold.red('~ Error ~') +' ------------');
        console.log('message => ' + err.message);
        console.log('plugin => ' + chalk.bold.red(err.plugin));
        console.log(JSON.stringify(err),9);
        gulp.src(err.fileName)
        .pipe( notify("Error => <%= file.relative %>\nLine => " + err.line) );
    },
    Success: function(event){
        console.log('-------------- '+ chalk.bold.green(event.type) +' ------------');
        console.log('fileName => ' + event.path);   
    }
};
// 压缩，合并 js
function minifyJsFun(type) {
    return gulp.src(type == "web" ? webConfig.path.js : wapConfig.path.js)      //需要操作的文件
    .pipe(concat('main.js'))    //合并所有js到main.js
    .pipe(gulp.dest(type == "web" ? webConfig.dist.js : wapConfig.dist.js))       //输出到文件夹
    .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(uglify())    //压缩
    .on('error', handle.Errors)
    .pipe(gulp.dest(type == "web" ? webConfig.dist.js : wapConfig.dist.js))  //输出
    .pipe(notify({ message: 'minifyjs task ok' }))
    .pipe(connect.reload());
}
gulp.task('webjs', function() {
    var type = "web";
    minifyJsFun(type);
});
gulp.task('wapjs', function() {
    var type = "wap";
    minifyJsFun(type);
});
//插件
function pluginFun(type) {
     return gulp.src(type == "web" ? webConfig.path.plugin : wapConfig.path.plugin) 
        .pipe(gulp.dest(type == "web" ? webConfig.dist.plugin : wapConfig.dist.plugin))
}
gulp.task('webplugin', function() {
   var type = "web";
   pluginFun(type);
});
gulp.task('wapplugin', function() {
   var type = "wap";
   pluginFun(type);
});
//压缩，合并 css
function concatCSSFun(type) {
    return gulp.src(type == "web" ? webConfig.path.less : wapConfig.path.less)      //需要操作的文件
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(concat('main.css'))    //合并所有js到main.css
    .pipe(gulp.dest(type == "web" ? webConfig.dist.css : wapConfig.dist.css))       //输出到文件夹
    .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(minifyCss())    //压缩
    .on('error', handle.Errors)
    .pipe(cssBase64())
    .pipe(gulp.dest(type == "web" ? webConfig.dist.css : wapConfig.dist.css))  //输出
    .pipe(notify({ message: 'minifycss task ok' }))
    .pipe(connect.reload());
}
gulp.task('webless', function() {
    var type = "web";
    concatCSSFun(type);
});
gulp.task('wapless', function() {
    var type = "wap";
    concatCSSFun(type);
});
//组合公共部分html
function includeHtmlFun(type) {
    return gulp.src(type == "web" ? webConfig.path.html : wapConfig.path.html)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(type == "web" ? webConfig.dist.html : wapConfig.dist.html))
    .pipe(connect.reload());

}
gulp.task('webhtml', function() {
    var type = "web";
    includeHtmlFun(type);
});
gulp.task('waphtml', function() {
    var type = "wap";
    includeHtmlFun(type);
});
function tplReloadFun(type) {
    gulp.src(type == "web" ? webConfig.path.tpl : wapConfig.path.tpl)
    .pipe(connect.reload());
}
gulp.task('webtpl', function() {
    gulp.start("webhtml");
    var type = "web";
    tplReloadFun(type);
});
gulp.task('waptpl', function() {
     gulp.start("waphtml");
    var type = "wap";
    tplReloadFun(type);
});
//图片
function imagesFun(type) {
    return gulp.src(type == "web" ? webConfig.path.imgs : wapConfig.path.imgs)      //需要操作的文件
    .pipe(gulp.dest(type == "web" ? webConfig.dist.imgs : wapConfig.dist.imgs))       //输出到文件夹
}
gulp.task('webimg', function() {
    var type = "web";
    imagesFun(type);
});
gulp.task('wapimg', function() {
    var type = "wap";
    imagesFun(type);
});
gulp.task('server', function() {
    connect.server({
        root: "dist/",
        port: 8888,
        livereload: true,
         middleware: function (connect, opt) {
            return [
                proxy('/yydd-web', {
                    target: 'http://192.168.3.222:8080',
                    changeOrigin:true
                    
                })
            ]
        }
    });
});
// 监听任务
gulp.task("webwatch", function () {
    gulp.watch(webConfig.path.js, ["webjs"]);
    gulp.watch(webConfig.path.less, ["webless"]);
    gulp.watch(webConfig.path.html, ["webhtml"]);
    gulp.watch(webConfig.path.tpl, ["webtpl"]);
});
gulp.task("wapwatch", function () {
    gulp.watch(wapConfig.path.js, ["wapjs"]);
    gulp.watch(wapConfig.path.less, ["wapless"]);
    gulp.watch(wapConfig.path.html, ["waphtml"]);
    gulp.watch(wapConfig.path.tpl, ["waptpl"]);
});
// web任务
gulp.task("webrun", ["webjs", "webless", "webplugin", "webhtml", "webtpl", "webimg"])
gulp.task('webdev',["webrun", "webwatch"])
//wap任务
gulp.task("waprun", ["wapjs", "wapless", "wapplugin", "waphtml", "waptpl", "wapimg"])
gulp.task('wapdev',["waprun", "wapwatch"])
//总任务
gulp.task('dev',["webdev", "wapdev", "server"])
//生产环境
gulp.task('build',["webrun", "waprun"])