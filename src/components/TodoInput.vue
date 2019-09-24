<template>
  <div class="bx_inp">
    <form @submit.prevent="addItem">
      <input type="text" class="inp" autofocus v-model.trim="newItem" placeholder="할일을 입력 후 추가해 주세요.">
      <button type="button" class="btn_add" @click="addItem">+</button>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        newItem :''
      }
    },
    methods: {
      addItem(){
        if (this.newItem !== ''){
          var str = this.newItem;
          this.$emit('addItemEvt', str);
          this.clearText();
        }else{
          alert('할일을 입력해주세요.')
        }
      },
      clearText(){
        this.newItem = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variable';
  
  input:focus {
    outline: none;
  }
  ::placeholder {
    color: rgb(242, 174, 174);
  }
  .bx_inp {
    height: 40px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    text-align: left;
    border-bottom: 1px dashed #a5a5a5;
    form{
      padding-left: 10px;
      background: white;
      border-radius: 5px;
      line-height: 40px;
    }
  }
  .inp {
    width: calc(100% - 4rem);
    border-style: none;
    background: white;
    font-size: 0.9rem;
    color: rgb(137, 11, 179);
  }
  .btn_add {
    float: right;
    height: 40px;
    background: $color2;
    color: $white;
    width: 3.5rem;
    font-size: 1.6rem;
    border-radius: 0 5px 5px 0;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgb(50, 34, 0);
    cursor: pointer;
    &:hover {
      background: $color3;
    }
    &:focus {
      outline: none;
    }
  }
</style>