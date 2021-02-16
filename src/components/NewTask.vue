<template>
  <v-form @submit.prevent="createNewTask()">
    <v-text-field
      solo
      v-model="taskText"
      label="Add a new task" append-icon="add"></v-text-field>
  </v-form>
</template>

<script>
import store from '@/store';

export default {
  name: 'newTask',
  data() {
    return {
      taskText: '',
      todosRef: store.state.todos.todosRef,
    };
  },
  methods: {
    createNewTask() {
      this.todosRef.push({
        text: this.taskText,
        isDone: false,
      });
      this.taskText = '';
    },
  },
};
</script>
