<template>
  <div>
    <!-- <div class="page-hd">
      <h1 class="page-hd-title">tabbar</h1>
      <p class="page-hd-desc">底部工具菜单</p>
    </div>-->

    <div class="weui-tab" style="height:auto;">
      <div class="weui-tab__panel">
        <div id="c0" class="weui-tab__content">
          <huyue></huyue>
        </div>
        <div id="c1" class="weui-tab__content">
          <my :imgUrl="imgUrl" :nickName="nickName"></my>
        </div>
      </div>

      <div class="weui-tabbar tab-bottom">
        <a href="javascript:;" class="weui-tabbar__item">
          <span style="display: inline-block;position: relative;">
            <i class="icon icon-27 f27 weui-tabbar__icon"></i>
            <!-- <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span> -->
          </span>
          <p class="weui-tabbar__label">好文</p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item">
          <i class="icon icon-30 f27 weui-tabbar__icon"></i>
          <p class="weui-tabbar__label">我的</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import huyue from "../views/huyue.vue";
import my from "../views/my.vue";
import Api from "../http/api";
import util from "../utils/index";
export default {
  data() {
    return {
      imgUrl: "",
      nickName: "",
      userId: "",
      appid: "wx5e40c57bde272ccc",
      AppSecret: "15673703365014e3df03521c4e0bfb3e",
      code: "011gt0z30sjOEI1cb7B30pCQy30gt0z3",
      myurl: "http://bobchen.top"
    };
  },
  components: {
    huyue,
    my
  },
  methods: {
    initUser: function() {
      const data = util.parseQueryString();
      if (util.isEmptyObject(data)) {
        var url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          this.appid +
          "&redirect_uri=" +
          this.myurl +
          "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        location.href = url;
      } else {
        var url =
          "Article_Record/GetWXUserInfo?Appid=" +
          this.appid +
          "&Secret=" +
          this.AppSecret +
          "&Code=" +
          data.code;
        Api.get(url, {})
          .then(res => {
            
            if (res.Code == "200") {
              this.imgUrl = res.Data.headimgurl;
              this.nickName = res.Data.nickname;
            }
          })
          .catch(err => {
            $.alert(JSON.stringify(err), "标题", function() {});
          });
      }
    },
    initTab: function() {
      $(".weui-tab").tab({
        defaultIndex: 0,
        activeClass: "weui-bar__item_on",
        onToggle: function(index) {
          // if (index == 0) {
          //   $("#c" + index).html("我是第一个0");
          // } else if (index == 1) {
          //   $("#c" + index).html("我是第2个1");
          // }
          // console.log(index);
        }
      });
    },
    test: function() {
      var url =
        "Article_Record/GetWXUserInfo?Appid=" +
        this.appid +
        "&Secret=" +
        this.AppSecret +
        "&Code=" +
        this.code;
      Api.get(url, {})
        .then(res => {
          $.alert(JSON.stringify(res), "标题", function() {});
          if (res.Code == "200") {
            this.imgUrl = res.Data.headimgurl;
            this.nickName = res.Data.nickname;
          }
        })
        .catch(err => {
          $.alert(JSON.stringify(err), "标题", function() {});
        });
    }
  },
  mounted() {
    //this.test();
    this.initUser();
    this.initTab();
  }
};
</script>
<style lang="less" scoped>
</style>