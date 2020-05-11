<template>
  <div class="page">
    <div class="weui-header weui-btn_default">
      <div class="weui-header-left"> <a class="icon icon-109 f-black">返回</a> </div>
      <h1 class="weui-header-title f-black">发布文章</h1>
      <div class="weui-header-right"><a class="icon f-black">发布</a></div>
    </div>

    <div class="weui-cells__title">文章链接
      <a href="javascript:;"
         class="weui-btn weui-btn_mini weui-btn_default">自动解析</a></div>

    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input"
                 placeholder="请粘贴文章链接"
                 type="text">
        </div>
      </div>
    </div>

    <div class="weui-cells__title">标题</div>

    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input"
                 placeholder="请输入文章标题"
                 type="text">
        </div>
      </div>
    </div>

    <div class="weui-cells__title">封面图</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-uploader">
          <!-- <div class="weui-uploader__hd">
            <p class="weui-uploader__title">单图压缩上传,使用lrz压缩</p>
            <div class="weui-uploader__info">0/2</div>
          </div> -->
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
            </ul>
            <div class="weui-uploader__input-box">
              <input class="weui-uploader__input"
                     accept="image/*"
                     multiple=""
                     type="file"
                     onchange="uploadimg(this)">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {}
  }, methods: {
    removeimg: function (obj) {
      $.confirm('您确定要删除吗?', '确认删除?', function () { $(obj).remove(); });
      return false;
    },
    uploadimg: function (obj) {
      lrz(obj.files[0], { width: 750, fieldName: "file" }).then(function (data) {
        $.post("../php/upload.php", { imgbase64: data.base64 }, function (rs) {
          $(obj).parent().prev().html('<li onclick="removeimg(this)" class="weui-uploader__file" style="background-image:url(/php/' + rs.src + ')"><input value="' + rs.src + '"  type="hidden"  name="file" /></li>');
        }, 'json');

      }).then(function (data) {

      }).catch(function (err) {
        console.log(err);
      });
    }
  },
  mounted() {

  }
}


</script>
<style lang="less" scoped>
.weui-input {
  font-size: 14px;
}
.weui-header {
  font-weight: bold;
  .weui-header-title {
    font-weight: bold;
  }
}
.weui-cells__title {
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: #323133;
  margin: 10px 0;
  position: relative;
  a {
    position: absolute;
    right: 10px;
    top: -5px;
  }
}
</style>