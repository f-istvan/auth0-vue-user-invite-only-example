<template>
  <div>
    <app-header
      :auth="auth"
      :authenticated="authenticated"
      :admin="admin">
    </app-header>

    <div v-if="error.text" class="alert alert-danger">
      {{ error.text }}
    </div>
    <div v-if="message.text" class="alert alert-success">
      {{ message.text }}
    </div>
    <form>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <div class="form-group">
            <label for="email">Email to send invitation to:</label>
            <input
              type="text"
              id="email"
              class="form-control"
              :value="userData.email"
              @input="userData.email = $event.target.value">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <template v-for="availableRole in availableRoles">
            <span class="role" v-bind:key="availableRole">
              <input
                type="checkbox"
                v-bind:id="availableRole"
                v-bind:value="availableRole"
                v-model="userData.appMetadata.roles"
              >
              <label
                v-bind:for="availableRole">
                {{ availableRole }}
              </label>
            </span>
          </template>
          <br>
          <span>Added roles: {{ userData.appMetadata.roles }}</span>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <button
            @click.prevent="submit"
            class="btn btn-primary">
            Submit!
          </button>
        </div>
      </div>
    </form>
    <hr>
    <div class="row" v-if="savedUsers.length > 0">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>User invitation has been sent to the following email address:</h4>
          </div>
          <div class="panel-body email-container">
            <template v-for="userData in savedUsers">
              <div v-bind:key="userData.email">
                <span>{{ userData.email }}</span>
                <button
                  @click.prevent="submit"
                  v-on:click="sendChangePasswordREquestMail(userData.email)"
                  v-bind:key="userData.email"
                  class="btn btn-primary">
                  Send Invitation Mail!
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import { changePassword } from '../auth/AuthUtils.js'

const isInList = (email, list) => {
  return list.some(e => e.email === email)
}

export default {
  props: ['auth', 'authenticated', 'admin'],
  data () {
    return {
      userData: {
        email: '',
        appMetadata: {
          roles: []
        }
      },
      savedUsers: [],
      error: {
        text: ''
      },
      message: {
        text: ''
      },
      availableRoles: [ 'admin' ]
    }
  },
  methods: {
    submit () {
      console.log(this.userData.email && !isInList(this.userData.email, this.savedUsers))
      console.log(this.auth.getAccessToken())
      console.log('this.userData', this.userData)
      console.log(process.env.USER_SERVICE.BACKEND_HOST)
      let token = this.auth.getAccessToken()
      if (this.userData.email && !isInList(this.userData.email, this.savedUsers)) {
        this.$http.post(
          process.env.USER_SERVICE.BACKEND_HOST + '/users',
          this.userData,
          {
            headers: {
              'authorization': token
            }
          })
          .then(
            response => {
              console.log(response)
              this.savedUsers.push(JSON.parse(response.bodyText))
              this.error = {
                text: ''
              }
              this.message = {
                text: 'User saved: ' + response.body.email
              }
            },
            error => {
              console.log('log error', error)
              this.error = {
                text: error.body
              }
            })

        this.userData = {
          email: '',
          appMetadata: {
            roles: []
          }
        }
      }
    },
    sendChangePasswordREquestMail (email) {
      changePassword(email, (err, response) => {
        if (err) {
          this.error = {
            text: err
          }
          this.message = {
            text: ''
          }
        } else {
          this.error = {
            text: ''
          }
          this.message = {
            text: response
          }
        }
      })
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style scoped>
.email-container {
  overflow: scroll;
  max-height: 419px;
}
</style>
