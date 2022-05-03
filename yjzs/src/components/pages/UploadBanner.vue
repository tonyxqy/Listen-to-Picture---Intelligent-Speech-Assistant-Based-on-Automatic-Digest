<template>
  <section class="switchable bg--primary">
    <div class="container"  style="margin-top:2rem">
      <div class="row justify-content-between">
        <div class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInRight">
            <router-link to="/UploadVideo">
                <img width="40%" max-height="50%" max-hei src="@/assets/音频上传.svg" alt="">
                <div class="text">演讲音频上传</div>
            </router-link>
        </div>
        <div class="col-lg-7 col-md-5 col-12 box animate__animated animate__bounceInLeft">
            <router-link to="/UploadArticle">
                <img width="40%" src="@/assets/演讲文本上传.svg" alt="">
                <div class="text">演讲文本上传</div>
            </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
    };
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
<style scoped>
.text{
    color: white;
        font-size: 1.35714286em;
    line-height: 1.68421053em;
}
</style>