<template>
<div>
  <v-card style="height: 100%; overflow: hidden">
    <v-toolbar color="pink" dark>
      <v-toolbar-title>
        Your to do List
      </v-toolbar-title>
    </v-toolbar>
    <v-list style="height: 460px ; overflow-y: scroll">
      <template v-for="(task, key) in tasks">
        <Task v-bind:key="key" :task="task" :index="key"/>
      </template>
    </v-list>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row>
        <v-col>
          <NewTask/>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <router-view :key="$route.fullPath" name="TaskDetails"></router-view>
</div>
</template>

<script>
// import store from '@/store';
import firebase from 'firebase/app';
import Task from './Task.vue';
import NewTask from './NewTask.vue';
import 'firebase/database';

const database = firebase.database();

export default {
  name: 'tasks',
  components: { Task, NewTask },
  data() {
    return {
      tasks: null,
    };
  },
  created() {
    this.todosRef = database.ref(`/users/${this.$store.state.auth.user.uid}`);
    this.$store.dispatch('todos/setTodosRef', this.todosRef);
  },
  mounted() {
    this.todosRef.on('value', (snapshot) => {
      this.tasks = snapshot.val();
      this.$store.dispatch('todos/setTask', this.tasks);
    });
  },
};
</script>
