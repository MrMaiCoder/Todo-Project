<template>
  <div >
    <v-container fluid fill-height>
        <v-row
          justify="center"
          align-content="center">
          <v-col cols="6" >
            <Tasks/>
          </v-col>
        </v-row>
    </v-container>
    <v-footer color="pink">
      <v-col class="text-left white--text">
        Hello, {{ user }}
      </v-col>
      <v-col class="text-right">
        <v-btn type="submit" @click="doLogout">Log out</v-btn>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Tasks from '@/components/Tasks.vue';
import firebase from 'firebase/app';
import store from '@/store';

export default {
  name: 'todo',
  components: { Tasks },
  data() {
    return {
      user: store.state.auth.user.email,
    };
  },
  methods: {
    async doLogout() {
      firebase.auth()
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/setAuthenticatedUser', null);
          this.$nextTick(() => {
            this.$router.push({ name: 'login' });
          });
        })
        .catch((error) => {
          this.message = error.message;
        });
    },
  },
};

</script>

<!--<template>-->
<!--  <div>-->
<!--    <v-btn type="submit" @click="doLogout">Log out</v-btn>-->
<!--    <br>-->
<!--    <p if="errorMessage">{{ errorMessage }}</p>-->
<!--    <br>-->
<!--    <section class="todoapp">-->
<!--      <header class="header">-->
<!--        <h1 id="heading">{{ title }}</h1>-->
<!--        <input-->
<!--          v-model="todoText"-->
<!--          class="new-todo"-->
<!--          placeholder="What needs to be done?"-->
<!--          v-on:keyup.enter="createTodo"-->
<!--          autofocus-->
<!--        />-->
<!--      </header>-->
<!--      <tasks :todos="todos"/>-->
<!--      <todo-footer v-if="todos"/>-->
<!--    </section>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import TodoFooter from '@/components/TodoFooter.vue';-->
<!--import firebase from 'firebase/app';-->
<!--import Tasks from './Task.vue';-->
<!--import 'firebase/database';-->

<!--// const LOCAL_STORAGE_KEY = "todo-app-vue";-->

<!--const database = firebase.database();-->

<!--export default {-->
<!--  components: {-->
<!--    Tasks,-->
<!--    TodoFooter,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      title: 'TO DO LISTS!',-->
<!--      todoText: '',-->
<!--      editing: null,-->
<!--      todos: {},-->
<!--      todosRef: null,-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.todosRef = database.ref(`/users/${this.$store.state.auth.user.uid}`);-->
<!--  },-->
<!--  mounted() {-->
<!--    this.todosRef.on('value', (snapshot) => {-->
<!--      this.todos = snapshot.val();-->
<!--    });-->
<!--  },-->
<!--  methods: {-->
<!--    createTodo() {-->
<!--      this.todosRef.push({-->
<!--        text: this.todoText.trim(),-->
<!--        isDone: false,-->
<!--      });-->
<!--      this.todoText = '';-->
<!--    },-->
<!--    clearCompleted() {-->
<!--      this.$store.dispatch('todos/clearCompleted');-->
<!--    },-->
<!--    async doLogout() {-->
<!--      firebase.auth()-->
<!--        .signOut()-->
<!--        .then(() => {-->
<!--          this.$store.dispatch('auth/setAuthenticatedUser', null);-->
<!--          this.$nextTick(() => {-->
<!--            this.$router.push({ name: 'login' });-->
<!--          });-->
<!--        })-->
<!--        .catch((error) => {-->
<!--          this.message = error.message;-->
<!--        });-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
