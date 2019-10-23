<template>
  <div class="bx_inp">
    <form>
      <div class="row">
        <input type="text" class="inp" ref="addinp" v-focus v-model.trim="newItem" @keyup.enter="addItem" placeholder="할일을 입력 후 추가해 주세요.">
        <button type="button" class="btn_add" @click="addItem">+</button>
      </div>
      <div class="row center">
        <label for="inp_date">마감일 : </label>
        <datepicker class="inp_date" ref="dateinp" v-model="date" :language="ko" format="yyyy-MM-dd" placeholder="날짜를 선택하세요."></datepicker>
      </div>
    </form>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {ko} from 'vuejs-datepicker/dist/locale/';
  
  export default {
    data(){
      return {
        newItem :'',
        ko: ko,
        date : '',
      }
    },
    
    methods: {
      addItem(){
        if (this.newItem !== '' && this.date !== ''){
          const str = this.newItem;
          const addinp = this.$refs.addinp;
          const dday = this.date;
          this.$store.commit('todoAdd', {str, addinp, dday})
          this.$store.commit('changeSort', this.$store.getters.sortType);
          this.$store.commit('filterTodo', this.$store.getters.countFilterGet);
          this.clearText();
        }else{
          this.date == '' ? (alert('마감일을 입력하세요')) : alert('할일을 입력해주세요.')
          this.$refs.addinp.focus();
        }
      },
      clearText(){
        this.newItem = '';
        this.date = '';
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

    components: {
      Datepicker,
    }
  }
</script>