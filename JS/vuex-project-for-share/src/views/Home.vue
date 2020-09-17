<template>
  <v-container>
    <h1>Home</h1>
    <h1>All Users({{$store.getters.allUsers.length}})</h1>
    <h2>Seoul Users: {{ $store.getters.countOfSeoul }} {{ $store.getters.percentOfSeoul }}</h2>
  </v-container>
</template>
