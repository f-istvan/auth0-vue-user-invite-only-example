list-user-roles
<template>
  <div>
    <app-header
      :auth="auth"
      :authenticated="authenticated"
      :admin="admin">
    </app-header>
    <p v-if="auth.getRoles().length > 0">
      Your roles are:
      <ul>
        <li v-bind:key="role" v-for="role in auth.getRoles()">{{ role }}</li>
      </ul>
    </p>
    <p v-else>
      You don't have any roles.
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

<style scoped>
</style>
