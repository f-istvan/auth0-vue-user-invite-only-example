<template>
</template>

<script>
import auth from '../auth/AuthService.js'

export default {
  created () {
    if (window.location.hash) {
      auth.resumeAuth(window.location.hash)
    }
  }
}
</script>
