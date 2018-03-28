var commentModule = {
    commentData : {},
    init : function() {
      this.commentData.character = 0;
      this.commentData.experience = 0;
      this.commentData.speed = 0;
      this.pageEvent();
    },
    pageEvent : function() {
      var $page = $("#commentPage"), that = this;
      $page.find(".star-wrap .star").click(function() {
          var value = $(this).attr("value"), $parent = $(this).parent();
          $parent.find(".star").removeClass("active");
          $parent.find(".star:lt("+value+")").addClass("active");
          var type = $parent.attr("type");
          if(type == 1) {
            that.commentData.character = value;
          } else if(type == 2) {
            that.commentData.experience = value;
          } else if(type == 3) {
            that.commentData.speed = value;
          }
      });

      $("#confirm").click(function() {
          var info = that.commentData, errorStr = "";
          if( info.character == 0) {
              errorStr = "请为茶叶品质评分";
          } else if(info.experience == 0) {
               errorStr = "请为服务体验评分";
          } else if(info.speed == 0) {
               errorStr = "请为配送速度评分";
          }
          if(errorStr != "") {
              common.errorMessage(errorStr, $page);
          } else {
            var $html = $('<div class="error-mes"><span>正在提交...</span></div>');
            $page.append($html);
            var info = that.commentData, reamk = $("#reamk").val();
            var params = {
                quality : info.character,
                service : info.experience,
                deliverySpeed : info.speed,
                content : reamk
            }
            common.commAjax({
                type : "POST",
                url : "comment/add",
                data : params,
                success : function(result) {
                   window.location.href = "/wap/view/comment/success.html"
                },
                error : function() {
                    $html.hide();
                    var error = "服务器异常！"
                    common.errorMessage(error, $page);
                }
              });
            //alert($("#reamk").val());
           
          }
      });
    }
}