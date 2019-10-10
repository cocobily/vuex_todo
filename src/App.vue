<template>
  <div id="app" class="wrap">
    <TodoHeader :pdata="countFilter" @removeAllEvt="removeAll"></TodoHeader>
    <TodoInput @addItemEvt="todoAdd"></TodoInput>
    <TodoList :propsdata="todoListItems"
      :sortTodo="sort"
      @changeSortEvt="changeSort"
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
      countFilter: [],
      sort:""
    }
  },
  methods: {
    // reset
    removeAll() {
      alert('전체 삭제')
      this.todoListItems = [];
      this.filterTodo();
      localStorage.clear();
    },

    // 할일 추가
    todoAdd($item, inp) {
      const newKey = "k" + new Date().getTime().toString();
      const data = {
        key: newKey, 
        value: $item, 
        isDone: false, 
        isEdit: false
      };
      this.todoListItems.push(data);
      this.filterTodo();
      inp.focus();
      localStorage.setItem(newKey, JSON.stringify(data));
      this.changeSort(this.sort);
    },
    
    // item 지우기
    removeTodoList($todoItem, $idx) {
      this.todoListItems.splice($idx, 1);
      this.filterTodo();

      localStorage.removeItem($todoItem);
      this.changeSort(this.sort);
    },

    // 상태 체크
    changeDone($todoItem, $idx, state) {
      this.todoListItems[$idx].isDone = state;
      const data = this.todoListItems[$idx];
      this.filterTodo();

      localStorage.setItem($todoItem, JSON.stringify(data));
      this.changeSort(this.sort);
    },

    // 수정
    editItem($todoItem, $idx, str, inp) {
      this.todoListItems[$idx].isEdit = str;
      setTimeout(function(){inp[$idx].focus()},100)
    },

    // 수정완료
    editDone($todoItem, $idx, $val, str) {
      if ($val === ""){
        alert("할일을 입력하세요")
      }else{
        this.todoListItems[$idx].value = $val;
        this.todoListItems[$idx].isEdit = str;
        const data = this.todoListItems[$idx];

        localStorage.setItem($todoItem, JSON.stringify(data));
        this.changeSort(this.sort);
      }
    },

    // filter
    filterTodo(){
      const countFilter = {
        listTotal : this.todoListItems.length, // 총
        listComplete : 0, // 완료
        listBeing : 0 // 진행
      };
      countFilter.listComplete = this.todoListItems.filter(it => it.isDone === true).length;
      countFilter.listBeing = this.todoListItems.filter(it => it.isDone === false).length;
      this.countFilter = countFilter;
    },

    // sort
    changeSort($val){
      if (localStorage.length > 0) {
        if ($val == "reg"){ // 등록순
          this.todoListItems.sort((a,b) => {
            let x = a["key"]; 
            let y = b["key"];
            // 0 또는 양수를 음수를 반환. 0:동일, 1 : 이상 반환은 무효. 숫자 대신 >사용 가능
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          });
        }else if($val == "new"){ // 최신순
          this.todoListItems.sort((a,b) => {
            let x = a["key"]; 
            let y = b["key"];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0)); // 내림차순
          });
        }else if ($val == "ing"){ // 진행순
          this.todoListItems.sort((a,b) => {
            let ing = a["isDone"];
            let done = b["isDone"];
            let x = a["key"]; 
            let y = b["key"];
            return (
              (ing < done) ? -1 : (ing > done) ? 1 : ( 
                (x < y) ? 1 : (x < y) ? -1 : 0
              )
            )
          });
        }else if ($val == "cmp"){ // 완료순
          this.todoListItems.sort((a,b) => {
            let ing = a["isDone"];
            let done = b["isDone"];
            let x = a["key"]; 
            let y = b["key"];
            return (
              (ing < done) ? 1 : (ing > done) ? -1 : ( 
                (x < y) ? 1 : (x < y) ? -1 : 0
              )
            )
          });
        }else if ($val == "abc"){ // 가나다순
          this.todoListItems.sort((a,b) => {
            let x = a["value"];
            let y = b["value"];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          })
        }
      }
      this.sort = $val;
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
      if (this.sort == ""){this.sort = 'reg'}
      this.changeSort(this.sort);
      this.filterTodo();
    }
      // 라이프 사이클 참고...
      // created 
      // 인스턴스가 작성된 후 동기적으로 호출됩니다. 
      // 이 단계에서 인스턴스는 데이터 처리, 계산된 속성, 메서드, 감시/이벤트 콜백 등과 같은 옵션 처리를 완료합니다. 
      // 그러나 마운트가 시작되지 않았으므로 $el 속성을 아직 사용할 수 없습니다.
      // mounted
      // el이 새로 생성된 vm.$el로 대체된 인스턴스가 마운트 된 직후 호출됩니다. 
      // 루트 인스턴스가 문서 내의 엘리먼트에 마운트 되어 있으면, mounted가 호출 될 때 vm.$el도 문서 안에 있게 됩니다.
      
  },

  components: {
    TodoHeader,
    TodoInput,
    TodoList,
  }
}
</script>