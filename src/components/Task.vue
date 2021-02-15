<template>
  <v-container>
  <v-list-item>
    <v-list-item-action>
      <v-btn icon @click.stop="openTaskDetails">
        <v-icon color="pink">edit</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{task.text}}</v-list-item-title>
      <v-list-item-subtitle>This task has {{ subtasksLength }} subtasks left.</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action-text>
      <v-progress-circular :value="20" v-if="!task.isDone"></v-progress-circular>
      <v-icon color="green" v-if="task.isDone">mdi-check-circle</v-icon>
    </v-list-item-action-text>
  </v-list-item>
  </v-container>
</template>

<script>
import store from '@/store';

export default {
  name: 'task',
  data: () => ({
    count: 3,
    subtasksLength: null,
  }),
  props: {
    task: Object,
  },
  mounted() {
    if (this.task.subtask === undefined) {
      this.subtasksLength = 0;
    } else {
      this.subtasksLength = this.task.subtask.length;
    }
  },
  methods: {
    openTaskDetails() {
      store.state.todos.task = this.task;
      this.$router.push({
        name: 'TaskDetails',
        params: { taskId: this.task.text },
      });
    },
  },
};
</script>

<!--<template>-->
<!--  <div>-->
<!--    <section class="main" v-if="todos">-->
<!--      <ul class="todo-list">-->
<!--        <li-->
<!--          v-for="task in todos"-->
<!--          v-bind:key="task.id"-->
<!--          :class="{ completed: task.isDone, editing: task === editing }"-->
<!--        >-->
<!--          <div class="view">-->
<!--            <input class="toggle" type="checkbox" v-model="task.isDone" />-->
<!--            <label @dblclick="startEditing(task)">{{ task.text }}</label>-->
<!--            <button class="destroy" @click="destroyTodo(task)"></button>-->
<!--          </div>-->
<!--          <input-->
<!--            class="edit"-->
<!--            @keyup.esc="cancelEditing"-->
<!--            @keyup.enter="finishEditing"-->
<!--            @blur="finishEditing"-->
<!--            :value="task.text"-->
<!--          />-->
<!--        </li>-->
<!--      </ul>-->
<!--    </section>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      editing: null,-->
<!--    };-->
<!--  },-->
<!--  props: ['todos'],-->
<!--  methods: {-->
<!--    destroyTodo(task) {-->
<!--      this.$store.dispatch('todos/destroyTodo', task);-->
<!--    },-->
<!--    startEditing(task) {-->
<!--      this.editing = task;-->
<!--    },-->
<!--    finishEditing(event) {-->
<!--      if (!this.editing) {-->
<!--        return;-->
<!--      }-->
<!--      const textbox = event.target;-->
<!--      this.editing.text = textbox.value.trim();-->
<!--      this.editing = null;-->
<!--    },-->
<!--    cancelEditing() {-->
<!--      this.editing = null;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
