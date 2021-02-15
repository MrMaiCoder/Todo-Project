export default {
  state: {
    task: null,
    todosRef: null,
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    setTask(state, task) {
      state.task = task;
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    setTodosRef(state, ref) {
      state.todosRef = ref;
    },
  },
  actions: {
    clearCompleted(context) {
      context.commit('todos/setTodos', context.state.todos.filter((todo) => !todo.isDone));
    },
    destroyTodo(context, todo) {
      const index = context.state.todos.indexOf(todo);
      context.commit('todos/removeTodo', index);
    },
    setTask(context, task) {
      context.commit('setTask', task);
    },
    setTodosRef(context, ref) {
      context.commit('setTodosRef', ref);
    },
  },
  getters: {
    activeTodos(state) {
      console.log(state.todos);
      return state.todos.filter((todo) => !todo.isDone);
    },
    completedTodos(state) {
      return state.todos.filter((todo) => todo.isDone);
    },
  },
};
