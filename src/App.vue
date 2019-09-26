<template>
  <div id="app" class="wrap">
    <TodoHeader :pdata="countFilter" @removeAllEvt="removeAll"></TodoHeader>
    <TodoInput @addItemEvt="todoAdd"></TodoInput>
    <TodoList :propsdata="todoListItems" 
      @toggleCheckEvt="changeDone" 
      @editItemEvt="editItem" 
      @doneEditEvt="editDone" 
      @removeItemEvt="removeTodoList">
    </TodoList>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

export default {
  data(){
    return {
      todoListItems: [],
      countFilter: {
        listTotal : 0, // 총
        listComplete : 0, // 완료
        listBeing : 0 // 진행
      }
    }
  },
  methods: {
    // reset
    removeAll() {
      alert('전체 삭제')
      this.todoListItems = [];
      this.countFilter.listTotal = this.todoListItems.length;
      this.filterTodoCp(this.countFilter.listComplete);
      this.filterTodoBe(this.countFilter.listComplete);

      localStorage.clear();
    },

    // 할일 추가
    todoAdd($item) {
      const newKey = "k" + new Date().getTime().toString();
      const data = {
        key: newKey, 
        value: $item, 
        isDone: false, 
        isEdit: false
      };
      this.todoListItems.push(data);
      this.countFilter.listTotal = this.todoListItems.length;
      this.filterTodoBe(this.countFilter.listComplete);

      localStorage.setItem(newKey, JSON.stringify(data));
    },
    
    // item 지우기
    removeTodoList($todoItem, $idx) {
      this.todoListItems.splice($idx, 1);
      this.countFilter.listTotal = this.todoListItems.length;
      this.filterTodoCp(this.countFilter.listComplete);
      this.filterTodoBe(this.countFilter.listComplete);

      localStorage.removeItem($todoItem)
    },

    // 상태 체크
    changeDone($todoItem, $idx, state) {
      this.todoListItems[$idx].isDone = state;
      const data = this.todoListItems[$idx];
      this.filterTodoCp(this.countFilter.listComplete);
      this.filterTodoBe(this.countFilter.listComplete);

      localStorage.setItem($todoItem, JSON.stringify(data));
    },

    // 수정
    editItem($todoItem, $idx, str) {
      this.todoListItems[$idx].isEdit = str
      const data = this.todoListItems[$idx];
    },

    // 수정완료
    editDone($todoItem, $idx, $val, str) {
      if ($val === ''){
        alert('할일을 입력하세요')
      }else{
        this.todoListItems[$idx].value = $val;
        this.todoListItems[$idx].isEdit = str;
        const data = this.todoListItems[$idx];

        localStorage.setItem($todoItem, JSON.stringify(data));
      }
    },

    // filter
    filterTodoCp(todo){
      this.countFilter.listComplete = this.todoListItems.filter(it => it.isDone === true).length;
      return this.countFilter.listComplete;
    },
    filterTodoBe(todo){
      this.countFilter.listBeing = this.todoListItems.filter(it => it.isDone === false).length;
      return this.countFilter.listBeing;
    }
  },

  directives: {
    focus: {
      // 디렉티브 정의
      inserted: function (el) {
        el.focus()
      }
    }
  },

  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === "loglevel:webpack-dev-server") continue;
        var strData = localStorage[localStorage.key(i)];
        var jsonObj = JSON.parse(strData);
        this.todoListItems.push(jsonObj);
      }
      // localStorage 는 입력된 순서데로 정렬되지 않는다 저장된 데이터를 불러올때 미리 정의해둔 key값으로 sort해야한다. 
      this.todoListItems.sort(function(a,b){
          var x = a['key']; var y = b['key'];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
      // 라이프 사이클 참고...
      // created 
      // 인스턴스가 작성된 후 동기적으로 호출됩니다. 
      // 이 단계에서 인스턴스는 데이터 처리, 계산된 속성, 메서드, 감시/이벤트 콜백 등과 같은 옵션 처리를 완료합니다. 
      // 그러나 마운트가 시작되지 않았으므로 $el 속성을 아직 사용할 수 없습니다.
      // mounted
      // el이 새로 생성된 vm.$el로 대체된 인스턴스가 마운트 된 직후 호출됩니다. 
      // 루트 인스턴스가 문서 내의 엘리먼트에 마운트 되어 있으면, mounted가 호출 될 때 vm.$el도 문서 안에 있게 됩니다.

    this.countFilter.listTotal = this.todoListItems.length;
    this.filterTodoCp(this.countFilter.listComplete);
    this.filterTodoBe(this.countFilter.listComplete);
  },

  components: {
    TodoHeader,
    TodoInput,
    TodoList
  }
}
</script>

<style lang="scss">
  @import 'scss/reset', 'scss/variable', 'scss/mixin';
  // style
  body{
    text-align: center;
    background-color: #e4f5ef;
  }
  .wrap{
    padding: 20px;
    @include respond-to(tablet){
      width: 800px;
      margin:0 auto;
    }
  }
</style>
