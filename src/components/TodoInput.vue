<template>
  <div class="bx_inp">
    <form @submit.prevent="addItem">
      <input type="text" class="inp" ref="addinp" v-focus v-model.trim="newItem" placeholder="할일을 입력 후 추가해 주세요.">
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
          this.$emit('addItemEvt', str, this.$refs.addinp);
          this.clearText();
        }else{
          alert('할일을 입력해주세요.')
          this.$refs.addinp.focus();
        }
      },
      clearText(){
        this.newItem = '';
      }
    },
        
    directives: {
      focus: {
        // 디렉티브 정의
        inserted: function (el) {
          el.focus()
        }
      }
    },
  }
</script>