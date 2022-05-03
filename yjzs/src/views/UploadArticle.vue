<template>
  <div class="home">
    <div class="main-container">
      <UploadArticleBanner />
      <UploadArticleInner/>
    </div>
  </div>
</template>
<script>
import UploadArticleBanner from '@/components/pages/UploadArticleBanner.vue'
import UploadArticleInner from '@/components/pages/UploadArticleInner.vue'

export default {
      components: {
          UploadArticleBanner,
          UploadArticleInner
  }
}
</script>