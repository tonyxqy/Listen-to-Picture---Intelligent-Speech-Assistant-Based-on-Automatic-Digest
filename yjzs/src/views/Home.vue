<template>
  <div class="home">
    <div class="main-container">
      <HomeBanner/>
      <HomeBorder/>
      <HomeInner/>
      <section
        class="text-center cta cta-4 space--xxs border--bottom imagebg"
        data-gradient-bg="#4876BD,#5448BD,#8F48BD,#BD48B1"
      >
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <span class="label label--inline">Hot!</span>
              <span>
                加一句彩色广告啥的好看点&nbsp; &nbsp;
                <a href="#purchase-template">马上购买</a>仅 ￥299 RMB
              </span>
            </div>
          </div>
        </div>
      </section>
      <section class="switchable">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-md-6 switchable__text">
              <ul class="accordion accordion-2">
                <li class="active">
                  <div class="accordion__title">
                    <span class="h5">
                      <p>代码质量</p>
                    </span>
                  </div>
                  <div class="accordion__content">
                    <p
                      class="lead"
                    >Lapus遵循BEM命名约定，该约定着重于HTML和CSS都反映的逻辑代码可读性。 诸如手风琴和制表符之类的交互组件遵循相同的标记模式，从而使开发人员和初学者都更容易进行快速开发。</p>
                    <p class="lead">加上详细的介绍文档，其中包括代码突出显示，摘要，类定制程序说明，您将获得一个强大的工具包。</p>
                  </div>
                </li>
                <li>
                  <div class="accordion__title">
                    <span class="h5">视觉设计</span>
                  </div>
                  <div class="accordion__content">
                    <p
                      class="lead"
                    >Lapus提供干净而现代的产品，适合公司，科技初创公司，市场营销等各种运用场景的数字化解决方案。 设计组件的目的是以多种多样但一致的方式展示内容。</p>
                    <p
                      class="lead"
                    >Multiple font and colour scheme options mean that dramatically altering the look of your site is just clicks away — Customizing your site in the included 网页构建器 makes experimenting with styles and content arrangements dead simple.</p>
                  </div>
                </li>
                <li>
                  <div class="accordion__title">
                    <span class="h5">用户体验</span>
                  </div>
                  <div class="accordion__content">
                    <p
                      class="lead"
                    >HTMLPAGE.CN is an elite author known for offering high-quality, high-value products backed by timely and personable support. Recognised and awarded by Envato on multiple occasions for producing consistently outstanding products, it's no wonder over 20,000 customers enjoy using HTMLPAGE.CN templates.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-lg-5 col-md-6">
              <img
                alt="Image"
                class="border--round box-shadow-wide"
                src="https://static.lapus.cn/img/inner-2.jpg"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="switchable feature-large">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-md-6 col-lg-5">
              <div class="switchable__text">
                <h2>适合学生、老师等多种人员</h2>
                <p class="lead">快速而低成本地得到一次演讲的重点内容对于现代信息世界来说非常重要 — 牢抓核心内容，急速掌握要领。</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="boxed boxed--lg boxed--border">
                <div class="feature feature-2">
                  <i class="icon icon-Clock-Back color--primary"></i>
                  <div class="feature__body">
                    <h5>优点1</h5>
                    <p>通过大量样式化的组件来展示您的内容，节省时间</p>
                  </div>
                </div>
                <div class="feature feature-2">
                  <i class="icon icon-Duplicate-Window color--primary"></i>
                  <div class="feature__body">
                    <h5>优点2</h5>
                    <p>aaaabbb</p>
                  </div>
                </div>
                <div class="feature feature-2">
                  <i class="icon icon-Life-Jacket color--primary"></i>
                  <div class="feature__body">
                    <h5>优点3</h5>
                    <p>aaaabbb</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBanner from '@/components/pages/HomeBanner.vue'
import HomeBorder from '@/components/pages/HomeBorder.vue'
import HomeInner  from '@/components/pages/HomeInner.vue'


export default {
  name: "Home",
  components: {
    HomeBanner,
    HomeBorder,
    HomeInner
  }
};
</script>
