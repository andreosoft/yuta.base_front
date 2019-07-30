<template>
  <div>
    <div class="body body-login">
      <div class="vt-wrapper gray-background">
        <div class="vt" style="background-color: #000000c2;">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/libs/auth'

export default {
  mixins: [auth]
}
</script>
