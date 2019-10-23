<template>
  <div>
    <div v-if="!this.$store.state.todoListItems.length">
      <p class="nodata">할일이 없습니다.</p>
    </div>
    <div v-else>
      <div class="bx_top">
        <select name="slct" class="slct" @change="changeSort($event.target.value)" v-model="slct">
          <option value="reg">등록순</option>
          <option value="new">최신순</option>
          <option value="ing">진행순</option>
          <option value="cmp">완료순</option>
          <option value="day">마감임박순</option>
          <option value="abc">가나다순</option>
        </select>
      </div>
      <ul class="li_todo">
        <li v-for="(item, index) in this.$store.state.todoListItems" :key="item.key" :class="{'todoComplete_li':item.isDone, 'edit_li': item.isEdit}">
          <div v-show="!item.isEdit">
            <input type="checkbox" 
              :id="item.key" 
              v-model="item.isDone"
              @click="toggleCheck(item.key, index, item.isDone)">
            <div class="todo">  
              <span class="item_txt" :title="item.value">{{item.value}}</span>
              <span class="item_dt">( 마감일 : {{ item.dDay | moment('YYYY-MM-DD') }} )</span>
            </div>
            <button class="btn_edit" @click="editItem(item.key, index, item.isEdit, item.value, item.dDay)">edit</button>
            <button class="btn_remove" @click="removeItem(item.key, index)">-</button>
          </div>
          <div v-show="item.isEdit">
            <form @submit.prevent="doneEdit(item.key, index, item.isEdit, item.value, item.dDay)">
              <legend>할일 수정하기</legend>
              <div class="bx_edit">
                <input type="text" class="edit" v-model="item.value" ref="inp">
                <datepicker class="inp_date" ref="date" v-model="item.dDay" :language="ko" format="yyyy-MM-dd"></datepicker>
              </div>
              <button type="button" class="btn_ok" @click="doneEdit(item.key, index, item.isEdit, item.value, item.dDay)">OK</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {ko} from 'vuejs-datepicker/dist/locale/';

  export default {
    data() {
      return {
        slct : '',
        ko: ko,
      }
    },
    methods : {
      // 삭제
      removeItem(todoItem, idx) {
        event.stopPropagation();
        this.$store.commit("removeTodoList", {todoItem, idx});
        this.$store.commit('changeSort', this.$store.getters.sortType);
        this.$store.commit('filterTodo', this.$store.getters.countFilterGet);
      },
      // 완료 체크
      toggleCheck(todoItem, idx, mode) {
        event.stopPropagation();
        mode = !mode;
        this.$store.commit("changeDone", {todoItem, idx, mode});
        this.$store.commit('changeSort', this.$store.getters.sortType);
        this.$store.commit('filterTodo', this.$store.getters.countFilterGet);
      },
      // 수정시작
      editItem(todoItem, idx, edit, val, day) {
        event.stopPropagation();
        const inp = this.$refs.inp;
        edit = !edit;
        this.$store.commit("editItem", {todoItem, idx, edit, val, day, inp});
      },
      // 수정완료
      doneEdit(todoItem, idx, edit, val, day) {
        event.stopPropagation();
        edit = !edit;
        const dday = this.day
        this.$store.commit("editDone", {todoItem, idx, edit, val, dday});
      },
      // 정렬
      changeSort(sortValue) {
        this.$store.commit("changeSort", sortValue)
      }
    },
    created(){
      this.slct = this.$store.state.sort;
    },
    components: {
      Datepicker,
    }
  }
</script>