<template>
  <div class="home">
    <div class="main-container">
      <UploadBanner />
      <UploadInner />
    </div>
  </div>
</template>
<script>
import UploadBanner from '@/components/pages/UploadBanner.vue'
import UploadInner from '@/components/pages/UploadInner.vue'
export default {
      components: {
          UploadBanner,
          UploadInner
  }
}
</script>