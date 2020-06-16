<template>
  <div class="page">
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="textleft f24 bold">好文共享圈</div>
      </div>
      <div class="weui-flex__item">
        <router-link class="textright f16 bold rslineh block f-black" to="postarticle">发帖</router-link>
      </div>
    </div>
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="mtitle f20">
          <a>主页</a>
          <a>邀请奖卡</a>
          <a>教程</a>
        </div>
        <div class="right f14 card rslineh">
          发帖卡:
          <span>999</span>张
        </div>
      </div>
    </div>
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="slide" id="slide2">
          <ul>
            <li>
              <a href="javascript:;">
                <img src="../../public/images/u33.png" alt />
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img src="../../public/images/u34.png" alt />
              </a>
            </li>
          </ul>
          <div class="dot">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="mtitle f20">好文列表</div>
      </div>
    </div>
    <template v-for="item in article">
      <div class="weui-flex">
        <a class="weui-flex__item" @click="readArticle(item.Id,item.Url)">
          <div class="cright">
            <img :src="item.PicUrl" />
          </div>
          <div class="cleft">
            <div :class="item.IsRead?'read':''">{{item.Title}}</div>
            <div class="num">
              <span>{{item.Author}}</span>
              <span>{{item.ModifyTime}}</span>
              <span>{{item.ReadNum}}</span>
            </div>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>
<script>
import "../../public/js/swipe.js";
import Api from "../http/api";
import util from "../utils/index";
export default {
  data() {
    return {
      
      article: []
    };
  },
  methods: {
    
    initSwipe: function() {
      $("#slide2").swipeSlide({
        autoSwipe: true, //自动切换默认是
        speed: 3000, //速度默认4000
        continuousScroll: true, //默认否
        transitionType: "cubic-bezier(0.22, 0.69, 0.72, 0.88)", //过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
        lazyLoad: true, //懒加载默认否
        firstCallback: function(i, sum, me) {
          me.find(".dot")
            .children()
            .first()
            .addClass("cur");
        },
        callback: function(i, sum, me) {
          me.find(".dot")
            .children()
            .eq(i)
            .addClass("cur")
            .siblings()
            .removeClass("cur");
        }
      });
    },
    initArticle: function() {
      Api.get("Article_Record/GetArticle?Page=1&PageSize=100", {}).then(res => {
        if (res.Code == "200") {
          res.Data.forEach((v, i) => {
            v.PicUrl = "http://bobchen.top:5000" + v.PicUrl;
            v.ModifyTime = util.getDateDiff(v.ModifyTime);
          });
          this.article = res.Data;
        }
      });
    },
    readArticle: function(Id, Url) {
      Api.post(
        "Article_Record/ReadArticle?Id=" + Id + "&UserId=" + this.userId,
        {}
      ).then(res => {
        if (res.Code == "200") {
          location.href = Url;
        } else {
          $.alert(res.Msg, "提示", function() {});
        }
      });
    }
  },
  mounted() {
  
    this.userId = "管理员";
    this.initSwipe();
    this.initArticle();
  }
};
</script>
<style lang="less" scoped>
.page {
  padding: 15px;
  font-family: "微软雅黑";
}
.textleft {
  text-align: left;
}
.textright {
  text-align: right;
}
.rslineh {
  line-height: inherit !important;
}
.weui-flex {
  margin-top: 15px;
}
.mtitle {
  display: inline-block;
  a {
    color: #333;
    display: inline-block;
    margin-right: 15px;
  }
}
.card {
  color: #fed6e7;
}
.slide {
  max-height: 100%;
}
.cleft {
  margin-right: 120px;
  height: 80px;
  color: #333;
  .num {
    color: #ccc;
    span {
      padding-right: 5px;
    }
  }
}
.read {
  color: #ccc;
}
.cright {
  float: right;
  width: 120px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>