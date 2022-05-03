<template>
  <div class="home">
    <div class="main-container">
      <UploadVideoBanner />
      <UploadVideoInner/>
    </div>
  </div>
</template>
<script>
import UploadVideoBanner from '@/components/pages/UploadVideoBanner.vue'
import UploadVideoInner from '@/components/pages/UploadVideoInner.vue'

export default {
      components: {
          UploadVideoBanner,
          UploadVideoInner
  }
}
</script>