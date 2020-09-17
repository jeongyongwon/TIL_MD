<template>
  <div>
    <h1>This is POSTS</h1>
    <ul>
      <li v-for="post in posts">
        {{post.id}}. <router-link :to="'/posts/post/' + post.id">{{post.title}}</router-link>
        <router-link :to="{ name: 'post', params: {id: post.id}, query: {aaa:123} }">
          {{post.title}}
        </router-link>
      </li>
    </ul>

    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: [
          {id: 390, title: "1번 글입니다."},
          {id: 391, title: "2번 글입니다."},
        ]
      }
    }
  }
</script>