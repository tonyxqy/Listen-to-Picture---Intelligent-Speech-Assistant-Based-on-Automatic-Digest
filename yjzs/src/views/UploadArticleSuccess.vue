<template>
  <div class="home">
    <div class="main-container">
      <ArticleShow />
      <UploadArticleSuccessBorder/>
    </div>
  </div>
</template>
<script>
import ArticleShow from '@/components/ArticleShow.vue'
import UploadArticleSuccessBorder from '@/components/pages/UploadArticleSuccessBorder.vue'


export default {
      components: {
          ArticleShow,
          UploadArticleSuccessBorder
  }
}
</script>