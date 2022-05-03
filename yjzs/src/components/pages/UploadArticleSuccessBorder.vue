<template>
  <section class="text-center" v-loading="loading">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="feature feature-3 boxed boxed--lg boxed--border">
            <span class="iconfont">&#xe662;</span>

            <h4>演讲图谱</h4>
            <p>通过视觉来迅速找到文章重点与亮点所在，快速定位关键内容</p>
            <a href="#" @click="gettupu">点击获取</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="feature feature-3 boxed boxed--lg boxed--border">
            <span class="iconfont">&#xe608;</span>
            <h4>思维导图</h4>
            <p>使用Texttiling算法进行文本的分段处理，这一算法通过将文章视作词汇流的方式，认为人们在讨论特定主题需要使用一些相关度较高的词汇，当主题产生变化时对应部分的词汇也会随之产生变化。通过d3.js方法构造思维导图</p>
            <a href="#">Learn More</a>
            <span class="label">New</span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="feature feature-3 boxed boxed--lg boxed--border">
            <span class="iconfont">&#xe618;</span>
            <h4>大纲视图</h4>
            <p>我编不出来了</p>
            <a href="#语音识别" class="inner-link" target="_self">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      datainside: ``,
      uploaddata: {
        id: this.$store.state.uploadId.id
      },
      loading: false
    };
  },
  methods: {
    gettupu() {
      this.loading = true;
      var that = this;
      this.uploaddata.id = JSON.parse(localStorage.getItem("upload"));
      console.log(this.uploaddata);
      axios({
        method: "POST",
        url: "http://localhost:3000/admin/gettupu",
        headers: {
          key: "Content-Type",
          value: "application/x-www-form-urlencoded",
          type: "text"
        },
        data: that.uploaddata
      }).then(response => {
        console.log(response);
        this.loading = false;
        var newPage = window.open("about:blank", "_blank");
        //将后台传过来的html页面写到新打开的浏览器窗口中显示
        newPage.document.write(response.data);
      });
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "iconfont";
  src: url("../../../public/assets/fonts/iconfont.ttf?t=1651225309570")
    format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 2.35714286em;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>