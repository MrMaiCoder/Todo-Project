<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col md="7" lg="7">
        <v-card class="elevation-12">
          <v-toolbar dark color="pink">
            <v-toolbar-title>Signup form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert
                :value="error"
                color="error"
                icon="warning"
              >{{ errorMessage }}</v-alert>
              <v-text-field
                prepend-icon="email"
                name="email"
                v-model="email"
                label="Email"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Confirm Password"
                :rules="[rules.required, rules.confirm]"
                type="password"
                v-model="confirmPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn to="/login" rounded color="pink darken-2" dark>Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="success" @click="doSignup()" :loading="loading">
              Register
              <v-icon>mdi-chevron-up</v-icon>
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
      confirmPassword: '',
      error: false,
      errorMessage: '',
      loading: false,
      rules: {
        required: (value) => !!value || 'Required',
        confirm: (confirm) => confirm === this.password || 'Passwords are different',
      },
    };
  },
  methods: {
    async doSignup() {
      this.loading = true;
      try {
        const response = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        if (response) {
          alert('User successfully created');
          await this.$store.dispatch('auth/setAuthenticatedUser', response.user);
          this.$nextTick(() => {
            this.$router.push({ name: 'todos' });
          });
        }
      } catch (e) {
        this.loading = false;
        this.error = true;
        this.errorMessage = e.message;
      }
    },
  },
};
</script>
