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
            <a href="#" @click="getswdt">点击获取</a>
            <a href="#" style="margin-left:10px" @click="swdtclose">点击关闭</a>
            <span class="label">New</span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="feature feature-3 boxed boxed--lg boxed--border">
            <span class="iconfont">&#xe618;</span>
            <h4>大纲视图</h4>
            <p>我编不出来了</p>
            <a href="#语音识别" class="inner-link" target="_self" @click="getdg">点击获取</a>
            <a href="#" style="margin-left:10px" @click="dgclose">点击关闭</a>
          </div>
        </div>
        <el-tree
          v-show="dgshow"
          :data="dgdataTree"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
    </div>
    <div id="treecontainer" class="treecontainer">
      <div id="product_tree"></div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { getTreeData } from "@/../public/assets/js/tree";

export default {
  data() {
    return {
      dgshow: false,
      dgdata: "",
      dgdataTree: [],
      datainside: ``,
      uploaddata: {
        id: this.$store.state.uploadId.id
      },
      loading: false,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    dgclose(){
      this.dgshow=false
    },
    swdtclose() {
      var child = document.getElementById("product_tree");
      child.innerHTML = "";
    },
    handleNodeClick(data) {
      console.log(data);
    },
    getdg() {
      this.loading = true;
      var that = this;
      this.uploaddata.id = JSON.parse(localStorage.getItem("upload"));
      console.log(this.uploaddata);
      axios({
        method: "POST",
        url: "http://localhost:3000/admin/getdg",
        headers: {
          key: "Content-Type",
          value: "application/x-www-form-urlencoded",
          type: "text"
        },
        data: that.uploaddata
      }).then(response => {
        console.log(response);
        this.dgdata = response.data;
        console.log(this.dgdata);
        this.dgdata.forEach(element => {
          if (element.level == 2) {
            let ans = {
              label: element.content,
              children: []
            };
            this.dgdataTree.push(ans);
          } else if (element.level == 1) {
            this.dgdataTree[this.dgdataTree.length - 1].children.push({
              label: element.content
            });
          }
        });
        this.loading = false;
        this.dgshow = true;
      });
    },
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
    },
    getswdt() {
      this.loading = true;
      var that = this;
      this.uploaddata.id = JSON.parse(localStorage.getItem("upload"));
      // console.log(this.uploaddata);
      axios({
        method: "POST",
        url: "http://localhost:3000/admin/getswdt",
        headers: {
          key: "Content-Type",
          responseType: "application/json",
          value: "application/json",
          type: "text"
        },
        data: that.uploaddata
      }).then(response => {
        var child = document.getElementById("product_tree");
        child.innerHTML = "";
        console.log(response.data);
        this.loading = false;
        let rootData = response.data;
        console.log("test", rootData);
        console.log("testinside", rootData.downward);
        getTreeData(rootData);
      });
      // axios({
      //   method: "POST",
      //   url: "http://localhost:3000/admin/getswdt",
      //   headers: {
      //     key: "Content-Type",
      //     responseType: "arraybuffer",
      //     value: "application/x-www-form-urlencoded",
      //     type: "text"
      //   },
      //   data: that.uploaddata
      // }).then(response => {
      //   console.log(response);
      //   this.loading = false;
      //   var x = new Uint8Array(response.data);
      //   var str = new TextDecoder("gbk").decode(x);
      //   console.log(str);
      //   let rootData = response.data;
      //   console.log(rootData);
      //   var child = document.getElementById("product_tree");
      //   child.innerHTML = "";
      //   getTreeData(rootData);
      // });
    }
  }
};
</script>

<style  scoped>
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
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  overflow: hidden;
  background: #fff;
}
svg {
  cursor: all-scroll;
}

.centralText {
  font: 23spx sans-serif;
  fill: #222;
}

.downwardNode text,
.upwardNode text {
  font: 10px sans-serif;
}

.downwardLink {
  fill: none;
  stroke: #8b4513;
  stroke-width: 1px;
  opacity: 0.5;
}

.upwardLink {
  fill: none;
  stroke: #37592b;
  stroke-width: 1px;
  opacity: 0.5;
}
</style>