<template>
  <div>
    <app-header
      :auth="auth"
      :authenticated="authenticated"
      :admin="admin">
    </app-header>
    <p>
      HOME - YOU ARE AUTHENTICATED
    </p>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  props: ['auth', 'authenticated', 'admin'],
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style>
</style>
