<template>
  <div class="header">
    <h1 class="tit">
      <img class="logo" alt="Vue logo" src="../assets/logo.png">
      Todo App</h1>
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
    width: 100%;
    .tit {
      height: 60px;
      color: #333;
      position: relative;
    }
    .logo{
      width: 50px;
    }
  }
  .btn_reset {
    float: right;
    padding:10px 20px;
    background: $point1;
    font-size: 0.9rem;
    border-radius: 6px;
    color: $white;
    cursor: pointer;
    &:hover{  
      background: $point2;
    }
    &:focus{
      outline: none;
    }
  }
  .num{
    padding: 60px 0 10px;
    text-align: right;
    font-size: 1rem;
    color: #333;
  }
</style>