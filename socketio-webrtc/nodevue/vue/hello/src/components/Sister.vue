<template>
  <div>
    <h1>This is Sister: {{msg}}</h1>
    <input type="text" v-model="myMsg">
    <button @click="sendToHome()">SendToHome</button>
  </div>
</template>

<script>
  import {EventBus, AAA} from '@/main'

  export default {
    props: ['msg'],

    created() {
      console.log("Sister.created!!!")
      this.myMsg = this.msg;
    },

    data() {
      return {
        myMsg: null
      }
    },

    methods: {
      sendToHome() {
        // EventBus.$emit('fromSister', this.myMsg)
        EventBus.fromSister(this.myMsg)
      }
    }
  }
</script>