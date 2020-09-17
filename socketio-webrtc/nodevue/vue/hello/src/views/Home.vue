<template>
  <div class="home">
    <h1 class="red">{{jsonData.msg}}</h1>
    <Brother :msg="jsonData.msg" @fromBrother="fromBrother" />
    <Sister :msg="jsonData.msg" @fromSister="fromSister" />

    <ul>
      <li v-for="reply in replies">
        {{reply.rno}}. <input type="text" v-model="reply.replytext">
        <button @click.prevent="saveReply(reply)">Save</button>
      </li>
    </ul>
    <img alt="Vue logo" src="../assets/logo.png">

    <span v-once>메시지: {{ msg }}</span>
    <input type="text" v-model="msg">
    <span v-html="msg"></span>  <span class="red">{{reversedMessage}}</span>
    <button :disabled="isButtonDisabled" @click="isButtonDisabled = !isButtonDisabled">disabledButton</button>

    <div>
      <a href="#" @click.prevent="aaa()">
        aaaaaaa <span @click.stop="bbb()">bbbbbbbb</span>
      </a>
    </div>

    <div :class="{red:isButtonDisabled}">REDDDDDDD</div>

    <todo-item v-for="item in groceryList"
               v-if="item.id > 0"
               :todo="item"
               :key="item.id">
    </todo-item>

    <TodoItem :todo="groceryList[0]"/>
    <todo-item :todo="{id:9999, text: '999999'}"></todo-item>

    <HelloWorld v-if="isButtonDisabled" msg="Welcome to Your Vue.js App"/>
    <div v-else>nooooooooooooooo</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  // components: {
  //   TodoItem, Brother, Sister
  // },

  created() {
    console.log(">>>>>>>", this._.random(30))
    this.fetchReplies();
    // this.$watch('ttt', this._.debounce(this.aaa, 1000))
    // this.$watch('ttt', this.aaa)
  },

  computed: {
    reversedMessage: function () {
      return this.msg.split('').reverse().join('')
    }
  },

  watch: {
    msg: function() {
      console.log("............", this.msg)
      this.reversedMessage = this.msg + "::"
    },
    reversedMessage: function() {
      console.log("tttttttttt")
    }
  },

  methods: {
    fromBrother(newMsg) {
      console.log("fromBrother>>>>>", ...arguments)
      this.jsonData.msg = this.sister(newMsg);
    },

    fromSister(newMsg) {
      console.log("fromSister>>>>>", ...arguments)
      this.jsonData.msg = sister(newMsg);
    },

    saveReply(reply) {
      this.$http.put('http://localhost:7000/apis/replies/265/' + reply.rno, reply).then( ret => {
        console.log("saveReply.ret>>", ret)
        if (ret.status !== 200) return [];
        alert(ret.data + '개의 댓글이 수정되었습니다.');
      });
    },
    fetchReplies() {
      this.$http.get('http://localhost:7000/apis/replies/265').then( ret => {
        if (ret.status !== 200) return [];

        console.log("replies.ret>>", ret)
        this.replies = ret.data;
      });
    },

    aaa(e) {
      console.log("aaaaaaaaaaaaaaaaaaa", e)
    },

    bbb() {
      console.log("bbbbbbbbbbbbbb")
    }
  },

  data() {
    return {
      jsonData: {msg: 'message', id: 123},
      ttt: 'ttt',
      msg: 'abcd',
      isButtonDisabled: false,
      replies: [],
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}
</script>

<style>
  .red { color: red; }
</style>
