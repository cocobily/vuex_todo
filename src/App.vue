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
  // data(){
  //   return {
  //     // todoListItems: this.$store.todoListItems,
  //     countFilter: [],
  //     sort:""
  //   }
  // },
  // methods: {
    
  // },

  created() {
      // 라이프 사이클 참고...
      // created 
      // 인스턴스가 작성된 후 동기적으로 호출됩니다. 
      // 이 단계에서 인스턴스는 데이터 처리, 계산된 속성, 메서드, 감시/이벤트 콜백 등과 같은 옵션 처리를 완료합니다. 
      // 그러나 마운트가 시작되지 않았으므로 $el 속성을 아직 사용할 수 없습니다.
      // mounted
      // el이 새로 생성된 vm.$el로 대체된 인스턴스가 마운트 된 직후 호출됩니다. 
      // 루트 인스턴스가 문서 내의 엘리먼트에 마운트 되어 있으면, mounted가 호출 될 때 vm.$el도 문서 안에 있게 됩니다.
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