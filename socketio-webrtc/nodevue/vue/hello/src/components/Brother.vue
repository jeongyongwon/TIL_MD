<template>
  <div>
    <h1>This is Brother: {{msg}}</h1>
    <input type="text" v-model="myMsg">
    <button @click="sendToHome()">SendToHome</button>
  </div>
</template>

<script>
  import {EventBus} from '@/main'

  export default {
    props: ['msg'],

    created() {
      console.log("Brother.created!!!")
      this.myMsg = this.msg;
      EventBus.$on('fromSister', ret => {
        console.log("Brother:on>>", ret)
        this.myMsg = ret;
      })
    },

    data() {
      return {
        myMsg: null
      }
    },

    methods: {
      sendToHome() {
        // this.msg += "aaa"
        // this.msg.msg = "aaaaaaaaaaaaa"
        this.$emit('fromBrother', this.myMsg)
      }
    }
  }
</script>