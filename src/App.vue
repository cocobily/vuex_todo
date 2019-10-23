<template>
  <div id="app" class="wrap">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

export default {
  created() {
      if (this.$store.getters.sortType == ""){this.$store.state.sort = 'reg'}
      this.$store.commit('changeSort', this.$store.getters.sortType);
      this.$store.commit('filterTodo', this.$store.getters.countFilterGet);
  },

  components: {
    TodoHeader,
    TodoInput,
    TodoList,
  }
}
</script>