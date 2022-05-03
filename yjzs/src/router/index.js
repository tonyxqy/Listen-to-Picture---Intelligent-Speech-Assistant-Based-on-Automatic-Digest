import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import(/* webpackChunkName: "Help" */ '../views/Help.vue')
  },
  {
    path: '/Upload',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "Upload" */ '../views/Upload.vue')
  },
  {
    path: '/UploadArticle',
    name: 'UploadArticle',
    component: () => import(/* webpackChunkName: "UploadArticle" */ '../views/UploadArticle.vue')
  },
  {
    path: '/UploadVideo',
    name: 'UploadVideo',
    component: () => import(/* webpackChunkName: "UploadVideo" */ '../views/UploadVideo.vue')
  },
  {
    path: '/UploadArticleSuccess',
    name: 'UploadArticleSuccess',
    component: () => import(/* webpackChunkName: "UploadArticleSuccess" */ '../views/UploadArticleSuccess.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
