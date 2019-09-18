<template>
  <div>
    <ul>
      <li v-for="(item, index) in propsdata" :key="item.key" :class="{'todoComplete_li':item.isDone, 'edit_li': item.isEdit}">
        <div v-if="!item.isEdit">
          <input type="checkbox" 
            v-model="checked" true-value="true" false-value="false"
            :id="item.key" @click="toggleCheck(item.key, index, item.isDone, item.toggle)">
          <span class="item_txt" @dblclick="editItem(item.key, index, item.isEdit)">{{item.value}}</span>
          <button class="btn_remove" @click="removeItem(item.key, index)">-</button>
        </div>
        <div v-else>
          <input type="text" class="edit" 
            v-model="item.value"
            @keyup.enter="doneEdit(item.key, index, item.value, item.isEdit)">
          <button type="button" class="btn_ok" @click="doneEdit(item.key, index, item.value, item.isEdit)">ok</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["propsdata"],
    methods : {
      // 삭제
      removeItem($todoItem, $idx) {
        event.stopPropagation();
        this.$emit("removeItemEvt", $todoItem, $idx);
      },
      // 완료 체크
      toggleCheck($todoItem, $idx, state, $checked) {
        event.stopPropagation();
        this.$emit("toggleCheckEvt", $todoItem, $idx, !state, $checked);
      },
      // 수정시작
      editItem($todoItem, $idx, edit) {
        event.stopPropagation();
        this.$emit("editItemEvt", $todoItem, $idx, !edit);
      },
      // 수정완료
      doneEdit($todoItem, $idx, $val, done) {
        event.stopPropagation();
        this.$emit("doneEditEvt", $todoItem, $idx, $val, !done);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variable';

  ul {
    list-style-type: none;
    padding: 0px;
    margin-top: 0px;
    text-align: left;
  }
  li {
    display: flex;
    height: 40px;
    line-height: 40px;
    background: $color1;
    margin: 0.6rem 0;
    border-radius: 6px;
    &:hover{
      margin-left: 7px;
      opacity: 0.8;
    }
    >div{
      display: flex;
      width: 100%;
      flex-direction: row;
      align-items: center;
    }
    &.edit_li{
      background: #fff;
      opacity: 1;
    }
    &.todoComplete_li {
      background:rgb(201, 201, 201)
    }
  }
  .btn_complete{
    z-index: 1;
    height: 40px;
    width: 3.5rem;
    font-size: 1.2rem;
    border-radius: 6px 0 0 6px;
    color: rgb(176, 0, 82);
    font-weight: bold;
    text-shadow: 1px 1px 1px rgb(50, 34, 0);
    cursor: pointer;
    &:hover{
      background: rgb(176, 0, 82);
      color: white;
    }
    &:focus {
      outline: none;
    }
  }

  .item_txt {
    flex:1;
    overflow: hidden;
    width: calc(100% - 3.5rem);
    cursor: pointer;
  }

  input[type="checkbox"] {
    margin: 0 20px;
    &:checked + .item_txt{
      color: gray;
      text-decoration: line-through;
    }
  }

  .btn_remove, .btn_ok {
    z-index: 1;
    height: 40px;
    background: rgb(23, 23, 23);
    width: 3.5rem;
    margin-left:auto;
    font-size: 1.6rem;
    border-radius: 0 6px 6px 0;
    color: $color1;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgb(50, 34, 0);
    cursor: pointer;
    &:hover{
      background: rgb(176, 0, 82);
      color: white;
    }
    &:focus {
      outline: none;
    }
  }

  .edit{
    width: 100%;
    border:none;
    padding: 10px;
    border-radius: 6px 0 0 6px;
  }
</style>