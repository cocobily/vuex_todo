<template>
  <div class="bx_inp">
    <form @submit.prevent="addItem">
      <div class="row">
        <input type="text" class="inp" ref="addinp" v-focus v-model.trim="newItem" placeholder="할일을 입력 후 추가해 주세요.">
        <button type="button" class="btn_add" @click="addItem">+</button>
      </div>
      <div class="row center">
        <label for="inp_date">완료 기한 : </label>
        <datepicker class="inp_date" v-model="date" :language="ko" ></datepicker>
        <!-- <input type="text" id="inp_date" class="inp_date" placeholder="YYYY-MM-DD"> -->
      </div>
    </form>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {ko} from 'vuejs-datepicker/dist/locale';
  import Moment from 'moment-timezone';
  
  export default {
    data(){
      return {
        newItem :'',
        ko: ko,
        date : ''
      }
    },
    
    methods: {
      addItem(){
        if (this.newItem !== ''){
          const str = this.newItem;
          const addinp = this.$refs.addinp;
          this.$store.commit('todoAdd', {str, addinp})
          this.clearText();
        }else{
          alert('할일을 입력해주세요.')
          this.$refs.addinp.focus();
        }
      },
      clearText(){
        this.newItem = '';
      },
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
      Moment
    }
  }

  
</script>