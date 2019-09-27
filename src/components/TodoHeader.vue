<template>
  <div class="header">
    <h1 class="tit">
      <img class="logo" alt="Vue logo" src="../assets/img/logo.png">
      Todo App
    </h1>
    <button class="btn_reset" @click="removeAll">전체 삭제</button>
    <div class="bx_count">총 : {{ pdata.listTotal }} <span>|</span> 완료 : {{ pdata.listComplete }} <span>|</span> 진행 : {{ pdata.listBeing }} </div>
  </div>
</template>

<script>
  export default {
    props: [
      "pdata"
    ],
    methods:{
      removeAll(){
        this.$emit('removeAllEvt')
      }
    }
  }
</script>