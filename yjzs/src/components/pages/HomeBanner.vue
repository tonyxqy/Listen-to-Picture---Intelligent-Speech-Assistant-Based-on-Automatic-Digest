<template>
  <section class="switchable bg--primary">
    <div class="container"  style="margin-top:2rem">
      <div class="row justify-content-between">
        <div class="col-lg-5 col-md-7">
          <div v-show="firststep" class="mt--2 ">
            <h1>智能语音演讲助手</h1>
            <p class="lead">方便快捷、识别准确，适用于多种场合</p>
            <a @click="step1" class="btn btn--primary type--uppercase" href="#customise-template">
              <span class="btn__text">立即开始</span>
            </a>
            <span class="block type--fine-print">
              or
              <a href="index.html">查看演示</a>
            </span>
          </div>
          <div v-show="!firststep" class="mt--2 box animate__animated animate__bounceInRight">
            <router-link to="/">
                <img width="40%" max-height="50%" max-hei src="@/assets/线上会议.svg" alt="">
                <div class="text">实时演讲助手</div>
            </router-link>
            <router-link to="/Upload">
                <img width="40%" src="@/assets/云端管理.svg" alt="">
                <div class="text">演讲分析(上传)</div>
            </router-link>
          </div>
        </div>
        <div class="col-lg-7 col-md-5 col-12">
            <img class="box animate__animated animate__bounceInLeft" v-show="index==0" src="@/assets/accountant.svg" alt />
            <img class="box animate__animated animate__bounceInLeft" v-show="index==1" src="@/assets/analytics.svg" alt />
            <img class="box animate__animated animate__bounceInLeft" v-show="index==2" src="@/assets/binge watching.svg" alt />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      firststep:true
    };
  },
  methods: {
    step1(){
        this.firststep=!this.firststep
    },
    changepic() {
      var that = this;
      setInterval(() => {
        that.index = (that.index + 1) % 3;
      }, 8000);
    }
  },
  mounted() {
    this.changepic();
    console.log(this.pic);
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
.text{
    color: white;
        font-size: 1.35714286em;
    line-height: 1.68421053em;
}
</style>