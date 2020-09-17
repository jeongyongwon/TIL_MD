# **vue-vuex**

----

> **Prop과 Emit을 내용을 제외한 오직 Vuex을 위한 내용**

## vue-start

----

```bash
# 설치
npm install -g @vue/cli

# 업데이트
npm i -g @vue/cli to update!

# vuex, vue-router 설치
npm i vuex vue-router
```

### 프로젝트 생성

```bash
vue create {project-name}
```

### 라우터 생성

```bash
vue add router -y 눌러줘야함
vue add vuex
```

### 빌드 생성

```bash
npm run build
```





## vuex 

---

> **Vuex 란 **
>
> => 많은 컴포넌트의 데이터를 관리하기 위한 **상태 관리 저장소**
>
> 
>
> **Vuex가 필요한 이유**
>
> => 컴포넌트의 개수가 많아지면 데이터 전달이 어려워짐
>
> => 끝없이 `props` 로 내려주고 `emit`으로 끝없이 올려줘야함
>
> => 컴포넌트 간 데이터 전달 명시화
>
> => 여러 개의 컴포넌트에서 공통 데이터 동기화
>
> 
>
> **Vuex의 개념**
>
> - **state** : **`data()`와 같음**
> - **actions : 사용자의 입력에 따라 데이터를 변경하는 methods**
> - **getters: `computed()`와 같음 => 쉽게 말해 data()의 저장된 데이터를 가공 처리하는 것으로 이해하는게 쉽다**
> - **mutations: 데이터를 저장함**

**우선 대략적인 로직은 다음과 같다(`store.js`, `Hello.vue` )**

```js
mport Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        weight: 2,
        random: 0,
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            state.count--;
        },
        successGenerateRandomNumber(state, payload){
            state.random = payload.num;
        },
        failGenerateRandomNumber(/*state, payload*/){
            console.log('ERROR!');
        }
    },
    getters:{
        count(state, getters){
            return Math.pow(state.count, getters.weight);
        },
        weight(state, /*getters*/){
            return state.weight;
        },
        random(state, /*getters*/){
            return state.random;
        }
    },
    actions:{
        generateRandomNumber({commit, /*state*/}) {
            console.log(arguments);
            axios.get(`http://localhost:4321/`)
                .then((res) => {
                    commit('successGenerateRandomNumber', res.data);
                })
                .catch((res) => {
                    commit('failGenerateRandomNumber', res);
                });
        }
    }
})
```

```js
<!--HelloWorld.vue-->
<template>
    <div class="hello">
        <b>count : {{this.$store.state.count}}</b><br>
        <b>count^2 : {{this.$store.getters.count}}</b><br>
        <b>random : {{this.$store.getters.random}}</b><br>
        <input type="button" @click="increment()" value="increment"/>
        <input type="button" @click="decrement()" value="decrement"/>
        <input type="button" @click="randomNumber()" value="random"/>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
        created: function () {
        },
        methods: {
            increment: function () {
                this.$store.commit('increment')
            },
            decrement: function () {
                this.$store.commit('decrement')
            },
            randomNumber: function () {
                this.$store.dispatch('generateRandomNumber', /*100*/);
            }
        }
    }
</script>

<style scoped>
</style>
```



### **1. state로 데이터를 정의해준다**

```js
    state: {
        count: 0,
        weight: 2,
        random: 0,
    },
```

### **2.  `HelloWorld.vue`** 에서 `store.js` 에 있는 `actions` 안에 있는  `generateRandomNumber` 메서드를 이용함

```js
//HelloWorld.vue의 method
randomNumber: function () {
    this.$store.dispatch('generateRandomNumber', /*{Object를 보통담아보냄}*/);
}

//store.js
actions:{
        generateRandomNumber({commit, /*state*/}, payload) {
            //commit이나 state를 사용할 parameter 칸과 view 넘어오는 데이터 칸
            console.log(arguments);
            axios.get(`http://localhost:4321/`)
                .then((res) => {
                    commit('successGenerateRandomNumber', res.data);
                	// mutations으로 axios로 받은 데이터를 같이 담아 넘겨줌
                })
                .catch((res) => {
                    commit('failGenerateRandomNumber', res);
                });
        }
    }
```

### 3.  `commit` 을 통해      `mutations` 의 `successGenerateRandomNumber`을 호출함

```js
    mutations: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            state.count--;
        },
        // state와 payload(여기선 res.data)를 불러줌
        successGenerateRandomNumber(state, payload){
            state.random = payload.num;
        },
        failGenerateRandomNumber(/*state, payload*/){
            console.log('ERROR!');
        }
    },
```



