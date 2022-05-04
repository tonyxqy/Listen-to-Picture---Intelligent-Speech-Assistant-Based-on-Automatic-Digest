<template>
  <section class="switchable bg--primary" v-loading="loading">
    <div class="container" style="margin-top:2rem">
      <div class="row justify-content-between">
        <div
          v-show="!uploadSuccess"
          class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInRight"
        >
          <el-upload
            style="margin-top:4em"
            class="upload-demo"
            drag
            action="http://localhost:3000/admin/yanjiangarticle-add"
            :data="uploadData"
            :on-success="getAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip" style="color:#fff">只能上传音频文件，且不超过20MB</div>
          </el-upload>
        </div>
        <div
          v-show="uploadSuccess"
          class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInRight"
        >
          <div class="mt--2">
            <h1>您的音频已经上传成功</h1>
            <p class="lead">点击按钮立刻开始语音转文字</p>
            <a href="#" class="btn btn--primary type--uppercase" @click="checktx">
              <span class="btn__text">立即开始</span>
            </a>
            <span class="block type--fine-print">
              or
              <a href="index.html">查看演示</a>
            </span>
          </div>
        </div>
        <div class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInLeft">
          <router-link to="#">
            <img width="40%" src="@/assets/音频上传.svg" alt />
            <div class="text">演讲音频上传</div>
          </router-link>
        </div>
      </div>
    </div>
    <el-dialog title="笑声检测" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"  v-loading="xsjcloading">
      <span style="color:black">{{xsjcdata}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import axios from "axios";
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      dialogVisible: false,
      Task: "",
      uploadSuccess: false,
      uploadData: {
        name: this.$store.state.uploadId.id
      },
      Timer: null,
      loading: false,
      xsjcloading:false,
      xsjcdata:''
    };
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            console.log(_);
            done();
          })
          .catch(_ => {
            console.log(_);
          });
      },
    lunxun() {
      this.uploadData.id = JSON.parse(localStorage.getItem("upload"));
      axios({
        method: "POST",
        url: "http://localhost:3000/admin/checktx",
        headers: {
          key: "Content-Type",
          value: "application/x-www-form-urlencoded",
          type: "text"
        },
        data: this.Task,
        params: this.uploadData
      }).then(response => {
        console.log("checktx", response);
        if (!response.data) {
          console.log(response.data);
          this.loading = false;
          this.$router.push("/UploadArticleSuccess");
        }
      });
    },
    checktx() {
      var that = this;
      let timer = window.setInterval(() => {
        that.loading = true;
        this.lunxun();
      }, 5000);
      this.$on("hook:deactivated", () => {
        window.clearInterval(timer);
        timer = null;
      });
    },
    getAvatarSuccess(res, file) {
      // res是响应数据 file是文件信息
      this.avatar = res.avatar;
      console.log(file);
      console.log(res); // 本例中是  { avatar: 'xxx.jpg' }
      this.uploadSuccess = true;
      this.uploadData.id = JSON.parse(localStorage.getItem("upload"));
      axios({
        method: "POST",
        url: "http://localhost:3000/admin/getwords",
        headers: {
          key: "Content-Type",
          value: "application/x-www-form-urlencoded",
          type: "text"
        },
        data: this.uploadData
      }).then(response => {
        console.log(response.data);
        this.Task = response.data;
      });
    },
    beforeAvatarUpload(file) {
      this.uploadSuccess = false;
      const isfile =
        file.type === "audio/mpeg" ||
        file.type === "audio/ogg" ||
        file.type === "application/ogg" ||
        file.type === "audio/wav";
      const iswav = file.type === "audio/wav";
      if (iswav) {
        this.xsjcloading = true
        this.dialogVisible = true;
        this.uploadData.id = JSON.parse(localStorage.getItem("upload"));
      axios({
        method: "POST",
        url: "http://localhost:3000/admin/getxsjc",
        headers: {
          key: "Content-Type",
          value: "application/x-www-form-urlencoded",
          type: "text"
        },
        data: this.uploadData
      }).then(response => {
        console.log(response.data);
        this.xsjcdata = response.data
        this.xsjcloading = false
      });
      }
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isfile) {
        this.$message.error("上传文件只能是 mp3，ogg，wav格式!");
      }
      if (!isLt20M) {
        this.$message.error("上传文件大小不能超过 20MB!");
      }
      let uploadId = {
        id: nanoid()
      };
      localStorage.setItem("upload", JSON.stringify(uploadId.id));
      this.uploadData.name = uploadId.id;
      this.$store.commit("updateUploadId", uploadId.id);
      //返回 true 时进行请求上传
      return isfile && isLt20M;
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
<style scoped>
.text {
  color: white;
  font-size: 1.35714286em;
  line-height: 1.68421053em;
}
</style>