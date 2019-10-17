<template>
  <div class="header">
    <h1 class="tit">
      <img class="logo" alt="Vue logo" src="../assets/img/logo.png">
      {{this.$store.state.titles}}
    </h1>
    <button class="btn_reset" @click="removeAll">전체 삭제</button>
    <div class="bx_count">총 : {{ this.$store.state.countFilter.listTotal }} <span>|</span> 완료 : {{ this.$store.state.countFilter.listComplete }} <span>|</span> 진행 : {{ this.$store.state.countFilter.listBeing }} </div>
  </div>
</template>

<script>
  export default {
    methods:{
      removeAll(){
        this.$store.commit("removeAll");
        this.$store.commit('changeSort', this.$store.getters.sortType);
        this.$store.commit('filterTodo', this.$store.getters.countFilterGet);
      }
    }
  }
</script>