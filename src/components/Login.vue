<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col md="7" lg="7">
          <v-card class="elevation-12">
            <v-app-bar dark color="pink">
              <v-toolbar-title>
                Login
              </v-toolbar-title>
              <v-alert class="mx-auto mt-auto"
                color="error"
                v-model="error"
                dismissible
              >
                The username or the password is incorrect.
              </v-alert>
            </v-app-bar>
            <v-card-text>
              <v-text-field
                v-model="email"
                prepend-icon="mdi-account-circle"
                label="Email"
              />
              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
              />
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn
                to="/signup"
                rounded
                color="pink darken-2"
                dark>
                Sign up</v-btn>
              <v-spacer></v-spacer>
              <v-btn rounded color="pink" dark
                     :loading="loading"
                     @click="doLogin()">
                Login
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: false,
      loading: false,
    };
  },
  methods: {
    async doLogin() {
      this.loading = true;
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        if (response) {
          await this.$store.dispatch('auth/setAuthenticatedUser', response.user);
          this.$nextTick(() => {
            this.$router.push({ name: 'todos' });
          });
        }
      } catch (e) {
        this.loading = false;
        this.error = true;
      }
    },
  },
};
</script>
