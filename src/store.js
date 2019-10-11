import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
  fetch(){
    const arr = [];
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === "loglevel:webpack-dev-server") continue;
        var strData = localStorage[localStorage.key(i)];
        var jsonObj = JSON.parse(strData);
        arr.push(jsonObj);
      }
      // localStorage 는 입력된 순서데로 정렬되지 않는다 저장된 데이터를 불러올때 미리 정의해둔 key값으로 sort해야한다. 
      // if (this.$state.state.sort == ""){(this.$state.state.sort = 'reg')}
      // this.changeSort(this.state.sort);
      // this.filterTodo();
    }
    return arr;
  }
}

export const store = new Vuex.Store({
  state: {
    titles : "new Todo App",
    todoListItems : storage.fetch(),
    countFilter: [],
    sort:'reg'
  },
  mutations: {
    // reset
    removeAll(state) {
      alert('전체 삭제')
      state.todoListItems = [];
      // filterTodo();
      localStorage.clear();
    },

    // 할일 추가
    todoAdd(state, payload) {
      const newKey = "k" + new Date().getTime().toString();
      const data = {
        key: newKey, 
        value: payload.str, 
        isDone: false, 
        isEdit: false
      };
      state.todoListItems.push(data);
      // this.$store.filterTodo();
      payload.addinp.focus();
      localStorage.setItem(newKey, JSON.stringify(data));
      // this.changeSort(state.sort);
    },

    // item 지우기
    removeTodoList(state, payload) {
      state.todoListItems.splice(payload.idx, 1);
      // this.filterTodo();

      localStorage.removeItem(payload.todoItem);
      // this.changeSort(state.sort);
    },

    // 상태 체크
    changeDone(state, payload) {
      state.todoListItems[payload.idx].isDone = payload.mode;
      const data = state.todoListItems[payload.idx];
      // this.filterTodo();

      localStorage.setItem(payload.todoItem, JSON.stringify(data));
      // this.$store.changeSort(state.sort);
    },

    // 수정
    editItem(state, payload) {
      state.todoListItems[payload.idx].isEdit = payload.edit;
      setTimeout(function(){payload.inp[payload.idx].focus()},100)
    },

    // 수정완료
    editDone(state, payload) {
      if (payload.val === ""){
        alert("할일을 입력하세요")
      }else{
        state.todoListItems[payload.idx].value = payload.val;
        state.todoListItems[payload.idx].isEdit = payload.isEdit;
        const data = state.todoListItems[payload.idx];

        localStorage.setItem(state.todoItem, JSON.stringify(data));
        // this.changeSort(state.sort);
      }
    },

    // filter
    filterTodo(state){
      const countFilter = {
        listTotal : state.todoListItems.length, // 총
        listComplete : 0, // 완료
        listBeing : 0 // 진행
      };
      state.countFilter.listComplete = state.todoListItems.filter(it => it.isDone === true).length;
      state.countFilter.listBeing = state.todoListItems.filter(it => it.isDone === false).length;
      state.countFilter = countFilter;
    },

    // sort
    changeSort(state){
      if (localStorage.length > 0) {
        if (state.sort == "reg"){ // 등록순
          state.todoListItems.sort((a,b) => {
            let x = a["key"]; 
            let y = b["key"];
            // 0 또는 양수를 음수를 반환. 0:동일, 1 : 이상 반환은 무효. 숫자 대신 >사용 가능
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          });
        }else if(state.sort == "new"){ // 최신순
          state.todoListItems.sort((a,b) => {
            let x = a["key"]; 
            let y = b["key"];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0)); // 내림차순
          });
        }else if (state.sort == "ing"){ // 진행순
          state.todoListItems.sort((a,b) => {
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
        }else if (state.sort == "cmp"){ // 완료순
          state.todoListItems.sort((a,b) => {
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
        }else if (state.sort == "abc"){ // 가나다순
          state.todoListItems.sort((a,b) => {
            let x = a["value"];
            let y = b["value"];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          })
        }
      }
      const val = state.sort;
      state.sort = val;
    }
  },
  actions: {

  }
});