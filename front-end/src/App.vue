<template>
  <div>
    <div id="app" class="container-fluid">
      <router-view
        :auth="auth"
        :authenticated="authenticated"
        :admin="admin">
      </router-view>
    </div>
  </div>
</template>

<script>
import auth from './auth/AuthService'

export default {
  name: 'app',
  data () {
    return {
      auth,
      authenticated: auth.authenticated,
      admin: auth.admin
    }
  },
  created () {
    auth.authNotifier.on('authChange', authState => {
      console.log('App created authState', authState)
      this.authenticated = authState.authenticated
      this.admin = authState.admin
    })

    auth.renewSession()
  }
}
</script>

<style>
</style>
