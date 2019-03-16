<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">

        <div class="navbar-header">
          <a class="navbar-brand">App</a>
        </div>

        <div>
          <ul class="nav navbar-nav">
            <router-link
              to="/"
              tag="li"
              v-if="authenticated"
              active-class="active" exact>
              <a>Home</a>
            </router-link>

            <router-link
              to="/user-invite"
              tag="li"
              v-if="authenticated && admin"
              active-class="active">
              <a>User Invite</a>
            </router-link>

            <router-link
              to="/list-user-roles"
              tag="li"
              v-if="authenticated"
              active-class="active">
              <a>List User Roles</a>
            </router-link>

            <router-link
              to="/login"
              tag="li"
              v-if="!authenticated"
              active-class="active">
              <a>Login</a>
            </router-link>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li v-if="auth.getUserNickname()">
              <p>Welcome {{ auth.getUserNickname() }}!</p>
            </li>
            <li>
              <a @click.prevent="logout" v-if="authenticated">Logout</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['auth', 'authenticated', 'admin'],
  methods: {
    logout () {
      console.log('logout called')
      this.auth.logout()
    }
  }
}
</script>

<style scoped>
a:hover {
  cursor:pointer;
}

p {
  margin-top: 15px;
}
</style>
