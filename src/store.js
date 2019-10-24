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
    }
    return arr;
  }
}

export const store = new Vuex.Store({
  state: {
    titles : "New Todo App",
    todoListItems : storage.fetch(),
    countFilter: {
      listTotal :0, // 총
      listComplete : 0, // 완료
      listBeing : 0 // 진행
    },
    sort:''
  },
  getters:{
    countFilterGet: state => {
      return state.countFilter;
    },
    sortType: state => {
      return state.sort;
    }
  },
  mutations: {
    // reset
    removeAll(state) {
      alert('전체 삭제')
      state.todoListItems = [];
      localStorage.clear();
    },

    // 할일 추가
    todoAdd(state, payload) {
      const newKey = "k" + new Date().getTime().toString();
      const data = {
        key: newKey, 
        value: payload.str, 
        isEdit: false, //편집
        isDone: false, //할일완료여부
        dDay: payload.dday
      };
      state.todoListItems.push(data);
      payload.addinp.focus();
      localStorage.setItem(newKey, JSON.stringify(data));
    },

    // item 지우기
    removeTodoList(state, payload) {
      state.todoListItems.splice(payload.idx, 1);
      localStorage.removeItem(payload.todoItem);
    },

    // 상태 체크
    changeDone(state, payload) {
      state.todoListItems[payload.idx].isDone = payload.mode;
      const data = state.todoListItems[payload.idx];

      localStorage.setItem(payload.todoItem, JSON.stringify(data));
    },

    // 수정
    editItem(state, payload) {
      state.todoListItems.map(todo => {
        return todo.isEdit = false;
      })
      state.todoListItems[payload.idx].isEdit = payload.edit;
      // localStorage.getItem(state.todoListItems);
      setTimeout(function(){payload.inp[payload.idx].focus()},100)
    },

    // 수정완료
    editDone(state, payload) {
      if (payload.val === ""){
        alert("할일을 입력하세요")
      }else{
        state.todoListItems[payload.idx].value = payload.val;
        state.todoListItems[payload.idx].isEdit = payload.edit;
        const edittodo = state.todoListItems[payload.idx];
        localStorage.setItem(payload.todoItem, JSON.stringify(edittodo));
      }
    },

    // filter
    filterTodo(state){
      const countFilter = {
        listTotal : state.todoListItems.length, // 총
        listComplete : 0, // 완료
        listBeing : 0 // 진행
      };
      countFilter.listComplete = state.todoListItems.filter(it => it.isDone === true).length;
      countFilter.listBeing = state.todoListItems.filter(it => it.isDone === false).length;
      state.countFilter = countFilter;
    },

    // sort
    changeSort(state, payload){
      if (localStorage.length > 0) {
        if (payload == "reg"){ // 등록순
          state.todoListItems.sort((a,b) => {
            let x = a["key"]; 
            let y = b["key"];
            // 0 또는 양수를 음수를 반환. 0:동일, 1 : 이상 반환은 무효. 숫자 대신 >사용 가능
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          });
        }else if(payload == "new"){ // 최신순
          state.todoListItems.sort((a,b) => {
            let x = a["key"]; 
            let y = b["key"];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0)); // 내림차순
          });
        }else if (payload == "ing"){ // 진행순
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
        }else if (payload == "cmp"){ // 완료순
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
        }else if (payload == 'day'){ // 마감 임박순
          state.todoListItems.sort((a,b) => {
            let x = a["dDay"]; 
            let y = b["dDay"];
            // 0 또는 양수를 음수를 반환. 0:동일, 1 : 이상 반환은 무효. 숫자 대신 >사용 가능
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          });
        }else if (payload == "abc"){ // 가나다순
          state.todoListItems.sort((a,b) => {
            let x = a["value"];
            let y = b["value"];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)); // 오름차순
          })
        }
      }
      const val = payload;
      state.sort = val;
    }
  },
  actions: {

  }
});