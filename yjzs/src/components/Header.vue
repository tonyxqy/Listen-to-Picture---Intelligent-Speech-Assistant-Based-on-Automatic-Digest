<template>
        <div class="nav-container mynav">
      <div class="via-1643894928834" via="via-1643894928834" vio="两侧导航栏">
        <nav id="menu2" class="bar bar-2 hidden-xs">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 order-lg-1">
                <div class="bar__module">
                  <ul class="menu-horizontal text-left">
                    <li class="textstyle">
                      <router-link to="/" class="textstyle">首页</router-link>
                    </li>
                    <li class="dropdown">
                      <span class="dropdown__trigger textstyle">实时助手&nbsp;</span>
                      <div class="dropdown__container">
                        <div class="container">
                          <div class="row">
                            <div class="dropdown__content col-lg-12 row w-100 ">
                              <div class="col-lg-3">
                                <h5>语音识别</h5>
                                <ul class="menu-vertical">
                                  <li>
                                    <a href="#">页面链接</a>
                                  </li>
                                </ul>
                              </div>
                              <div class="col-lg-3">
                                <h5>文本大纲提取</h5>
                                <ul class="menu-vertical">
                                  <li>
                                    <a href="#">页面链接</a>
                                  </li>
                                </ul>
                              </div>
                              <div class="col-lg-3">
                                <h5>思维导图制作</h5>
                                <ul class="menu-vertical">
                                  <li>
                                    <a href="#">页面链接</a>
                                  </li>
                                </ul>
                              </div>
                              <div class="col-lg-3">
                                <h5>演讲图谱</h5>
                                <ul class="menu-vertical">
                                  <li>
                                    <a href="#">页面链接</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="dropdown">
                      <span class="dropdown__trigger textstyle">本地上传&nbsp;</span>
                      <div class="dropdown__container">
                        <div class="container">
                          <div class="row">
                            <div class="dropdown__content col-lg-12 row w-100 ">
                              <div class="col-lg-3">
                                <h5>音频上传</h5>
                                <ul class="menu-vertical">
                                  <li>
                                    <a href="#">页面链接</a>
                                  </li>
                                </ul>
                              </div>
                              <div class="col-lg-3">
                                <h5>演讲文档上传</h5>
                                <ul class="menu-vertical">
                                  <li>
                                    <a href="#">页面链接</a>
                                  </li>
                                </ul>
                              </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
</template>
<style>
.mynav{
  background-color: #3889e6;
  /* border-bottom: 1px solid #3788e4; */
   border-bottom: 1px rgba(29,30,33,0.58);
   position:fixed; width:100%;
   z-index: 20;
}
.textstyle{
  color: #fff!important;
  font-weight:600!important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
