<template>
  <div>
    <h1>This is POST: {{$route.params.id}}</h1>
    <div v-if="post">
      <div>{{post.replyer}}</div>
      <div>{{post.replytext}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    watch: {
      '$route': {
        handler: 'aaa',
        immediate: true
      }
    },

    methods: {
      aaa() {
        let id = this.$route.params.id;
        console.log("aaaaaaaaa>>", id)
        this.$http.get('http://localhost:7000/apis/replies/265/' + id).then( ret => {
          if (ret.status !== 200) return [];

          console.log("aaa.ret>>", ret.data)
          this.post = ret.data;
        });

      }
    },

    data() {
      return {
        id: 0,
        post: null,
        posts: [
          {id: 1, title: "1번 글입니다.", content: "111111111"},
          {id: 2, title: "2번 글입니다.", content: "2222222222222"},
        ]
      }
    }
  }
</script>