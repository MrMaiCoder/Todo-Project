<template>
  <v-row justify="center">
    <v-dialog persistent v-model="open" scrollable max-width="60%">
      <v-card>
        <v-card-title>
          <span class="headline">
            Task title
          </span>
        </v-card-title>

      <v-card-text>
        <v-container>
          <v-form>
            <v-textarea
            outlined
            v-model="subtask"
            label="Subtask"
            placeholder="Write your subtask here"
            ></v-textarea>
            <v-btn color="success">Save</v-btn>
          </v-form>
        </v-container>
        <v-list three-line subheader>
          <v-subheader>Subtasks</v-subheader>
          <v-list-item
            v-for="(subtask, key) in subtasks"
            v-bind:key="key"
          >
            <v-list-item-action>
              <v-btn icon>
                <v-icon v-if="subtask.isDone">mdi-bookmark-check</v-icon>
                <v-icon v-else>mdi-bookmark-check-outline</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ subtask.text }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="close">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="red" dark @click="() => removeTask()">Remove Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import store from '@/store';

export default {
  name: 'taskDetails',
  data: () => ({
    subtask: '',
    open: true,
    subtasks: store.state.todos.task.subtask,
    todoKey: '',
  }),
  methods: {
    close() {
      this.$router.back();
    },
    removeTask() {
      const taskKey = store.state.todos.currentTaskKey;
      const childRef = store.state.todos.todosRef.child(taskKey);
      // childRef.on('value', (snapshot) => {
      //   console.log(snapshot.val());
      // });
      childRef.remove();
      // console.log(store.state.todos.todosRef.child(parent));
      this.$router.back();
    },
  },
};
</script>
