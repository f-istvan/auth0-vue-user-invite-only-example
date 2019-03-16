<template>
  <div>
    <app-header
      :auth="auth"
      :authenticated="authenticated"
      :admin="admin">
    </app-header>
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h2><strong>Please Log In</strong></h2>
        <br/>
        <button type="button" class="btn btn-primary" @click="login()">Login</button>
      </div>
    </div>
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
  },
  methods: {
    login () {
      this.auth.login()
    }
  }
}

</script>

<style scoped>
</style>
