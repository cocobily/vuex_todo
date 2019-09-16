<template>
  <div id="app" class="wrap">
    <TodoHeader @removeAllEvt="removeAll"></TodoHeader>
    <TodoInput @addItemEvt="todoAdd"></TodoInput>
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

export default {
  data(){
    return {
      todoListItem: [],
    }
  },
  methods: {
    // reset
    removeAll() {
      alert('remove all')
      this.todoListItems = [];
      
    },

    // 할일 추가
    todoAdd() {
      
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList
  }
}
</script>

<style lang="scss">
  // reset.css
  html,body,div,ul,li,dl,dt,dd,ol,p,h1,h2,h3,h4,h5,h6,form,fieldset {
    margin:0;
    padding:0;
  }
  h1,h2,h3,h4,h5,h6,strong,b,th{
    font-weight:bold;
  }
  article, aside, details, figcaption, figure, footer, header, menu, nav, section, main {display: block;}
  ul,ol,dl {
    list-style:none;
  }
  em,address{font-style:normal}
  img {
    border:0;
    vertical-align:top;
  }
  fieldset {
    border:0;
  }
  table {
    table-layout: fixed;
    width:100%;
    border-collapse:collapse;
  }
  caption{
    display: none;
  }
  button {
    border:none;
    background:none;
    cursor:pointer;
    outline:none;
  }
  // style
  body{
    text-align: center;
    background-color: rgb(36, 36, 36);
  }
  .wrap{
    padding: 20px;
  }
</style>
