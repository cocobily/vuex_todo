<template>
  <div class="header">
    <h1 class="tit">Todo App</h1>
    <button class="btn_reset" @click="removeAll">Reset</button>
  </div>
</template>

<script>
  export default {
    methods:{
      removeAll(){
        this.$emit('removeAllEvt')
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/variable';
  
  .header{
    min-height: 70px;
    width: 100%;
    margin-bottom: 20px;
    .tit {
      color: $color1;
      position: relative;
      height: 30px;
    }
  }
  .btn_reset {
    float: right;
    height: 30px;
    width: 3.5rem;
    background: rgb(28, 28, 28);
    font-size: 0.9rem;
    border-radius: 6px;
    color: $color1;
    cursor: pointer;
    &:hover{  
      color: rgb(28, 28, 28);
      background: $color1;
      font-weight: bold;
    }
    &:focus{
      outline: none;
    }
  }
</style>