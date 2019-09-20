<template>
  <div class="header">
    <h1 class="tit">Todo App</h1>
    <button class="btn_reset" @click="removeAll">Reset</button>
    <p class="num">총 : {{ pdata }}, 완료 : </p>
  </div>
</template>

<script>
  export default {
    props: ["pdata"],
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
    overflow:hidden;
    min-height: 100px;
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
  .num{
    padding-top: 30px;
    text-align: left;
    font-size: 20px;
    color: $white;
  }
</style>