<template>
  <section class="switchable bg--primary">
    <div class="container" style="margin-top:2rem">
      <div class="row justify-content-between">
        <div class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInRight">
          <textarea name id cols="30" rows="10" v-model="articletext"></textarea>
        </div>
        <div class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInLeft">
          <router-link to="/UploadArticle">
            <img width="40%" src="@/assets/演讲文本上传.svg" alt />
            <div class="text">演讲文本</div>
          </router-link>
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
      articletext: "",
      uploaddata: {
        id: this.$store.state.uploadId.id
      }
    };
  },
  methods: {
    getArticle() {
      var that = this;
      this.uploaddata.id = JSON.parse(localStorage.getItem("upload"));
      console.log(this.uploaddata);
      axios({
        method: "POST",
        url: "http://localhost:3000/admin/getArticle",
        headers: {
          key: "Content-Type",
          value: "application/x-www-form-urlencoded",
          type: "text"
        },
        data: that.uploaddata
      }).then(response => {
        console.log(response);
        this.articletext = response.data;
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getArticle();
    });
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