<template>
  <div>
    <div v-if="!propsdata.length">
      <p class="nodata">할일이 없습니다.</p>
    </div>
    <div v-else>
      <div class="bx_top">
        <select name="slct" class="slct" @change="changeSort($event.target.value)" v-model="slct">
          <option value="reg">등록순</option>
          <option value="new">최신순</option>
          <option value="ing">진행순</option>
          <option value="cmp">완료순</option>
          <option value="abc">가나다순</option>
        </select>
      </div>
      <ul class="li_todo">
        <li v-for="(item, index) in propsdata" :key="item.key" :class="{'todoComplete_li':item.isDone, 'edit_li': item.isEdit}">
          <div v-show="!item.isEdit">
            <input type="checkbox" 
              :id="item.key" 
              v-model="item.isDone"
              @click="toggleCheck(item.key, index, item.isDone)">
            <div class="todo">  
              <span class="item_txt" :title="item.value"
                @dblclick="editItem(item.key, index, item.isEdit)">
                  {{item.value}}
              </span>
              <span class="item_dt"> (2019-10-01)</span>
            </div>
            <button class="btn_remove" @click="removeItem(item.key, index)">-</button>
          </div>
          <div v-show="item.isEdit">
            <form @submit.prevent="doneEdit(item.key, index, item.value, item.isEdit)">
              <legend>할일 수정하기</legend>
              <input type="text" class="edit" 
                v-model="item.value" ref="inp"
                @keyup.enter="doneEdit(item.key, index, item.value, item.isEdit)">
              <button type="button" class="btn_ok" @click="doneEdit(item.key, index, item.value, item.isEdit)">OK</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["propsdata", "sortTodo"],
    data() {
      return {
        slct : ''
      }
    },
    methods : {
      // 삭제
      removeItem($todoItem, $idx) {
        event.stopPropagation();
        this.$emit("removeItemEvt", $todoItem, $idx);
      },
      // 완료 체크
      toggleCheck($todoItem, $idx, state) {
        event.stopPropagation();
        this.$emit("toggleCheckEvt", $todoItem, $idx, !state);
      },
      // 수정시작
      editItem($todoItem, $idx, edit) {
        event.stopPropagation();
        this.$emit("editItemEvt", $todoItem, $idx, !edit, this.$refs.inp);
      },
      // 수정완료
      doneEdit($todoItem, $idx, $val, done) {
        event.stopPropagation();
        this.$emit("doneEditEvt", $todoItem, $idx, $val, !done);
      },
      // 정렬
      changeSort($sortValue) {
        this.$emit("changeSortEvt", $sortValue)
      }
    },
    created(){
      this.slct = this.sortTodo;
    },
  }
</script>