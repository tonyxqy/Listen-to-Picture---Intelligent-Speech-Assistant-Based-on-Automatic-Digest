<template>
  <section class="switchable bg--primary">
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
            <div class="el-upload__tip" slot="tip" style="color:#fff">只能上传txt文件，且不超过10MB</div>
          </el-upload>
        </div>
        <div
          v-show="uploadSuccess"
          class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInRight"
        >
          <div class="mt--2">
            <h1>您的文件已经上传成功</h1>
            <p class="lead">点击按钮立刻开始体验</p>
            <router-link to="/UploadArticleSuccess"  class="btn btn--primary type--uppercase" href="#customise-template">
              <span class="btn__text">立即开始</span>
            </router-link>
            <span class="block type--fine-print">
              or
              <a href="index.html">查看演示</a>
            </span>
          </div>
        </div>
        <div class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInLeft">
          <router-link to="#">
            <img width="40%" src="@/assets/演讲文本上传.svg" alt />
            <div class="text">演讲文本上传</div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      uploadSuccess: false,
      uploadData: {
        name: this.$store.state.uploadId.id
      }
    };
  },
  methods: {
    getAvatarSuccess(res, file) {
      // res是响应数据 file是文件信息
      this.avatar = res.avatar;
      console.log(file);
      console.log(res); // 本例中是  { avatar: 'xxx.jpg' }
      this.uploadSuccess = true;
    },
    beforeAvatarUpload(file) {
      this.uploadSuccess = false;
      const isfile = file.type === "text/plain";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isfile) {
        this.$message.error("上传文件只能是 txt 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      let uploadId = {
        id: nanoid()
      };
      localStorage.setItem("upload", JSON.stringify(uploadId.id));
      this.uploadData.name = uploadId.id;
      this.$store.commit("updateUploadId",uploadId.id);
      //返回 true 时进行请求上传
      return isfile && isLt10M;
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