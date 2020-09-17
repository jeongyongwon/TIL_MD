# Todo - Ts

---

> - **파일이 없으면 생성**
> - **철저히 정용원식 사고**

### src/store.ts 

```typescript
import Vue from 'vue';
import Vuex from 'vuex';
// 바로 밑에 있다
import ToDoModel from './models/ToDoModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      // todos라는 배열은 ToDoModel이라는 Type으로 정해졌다
      // ToDoModel은 밑에서 확인하자
    todos: Array<ToDoModel>()
  },

  mutations: {
    addToDo(state, todoModel: ToDoModel) {
      state.todos.push(todoModel);
    }
  },
  actions: {
    addToDo(context, todoModel: ToDoModel) {
      context.commit('addToDo', todoModel);
    }
  }
});
```



### src/models/ToDoModel.ts

- 우리만의 `class`를 정해보자

```typescript
export default class ToDoModel {
    Name: string;
    IsCompleted: boolean;
    // 기본적인 Type을 정하고 밑에선 Default 값을 정하는듯
    constructor() {
      this.Name = '';
      this.IsCompleted = false;
    }
  }
```



###  자 이제 ToDo 파일을 만들어보자

### src/components/ToDoWithoutStore.vue

- 일단은 길다. 그래서 알아서 왔다갔다 하시길
- `script` 로직 위주로 보면 될듯
- 낯선 부분 위주로 난 일일이 TMI로 설명할 듯

```typescript
<template>
  <div class="container">
    <div class="welcome">{{welcomeMessage}}</div>

    <div class="alert alert-primary" v-show="message">{{ message }}</div>

    <div>
      <div class="form-group row">
        <label for="Name" class="col-sm-1">Title</label>
        <div class="col-sm-4">
          <input type="text" id="Name" v-model="model.Name" class="form-control">
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            id="isCompleted"
            v-model="model.IsCompleted"
            class="form-check-input"
          >
          <label for="isCompleted" class="form-check-label">Completed</label>
        </div>
      </div>
      <div>
        <button type="submit" @click="AddToDo()" class="btn btn-primary">Add ToDo</button>
      </div>
    </div>

    <section>
      <ol class="list-group">
        <li
          class="list-group-item"
          v-for="todo of ToDos"
          :key="todo.Name"
        >{{ todo.Name}}, {{ todo.IsCompleted ? "Completed" : "Not Done" }}</li>
      </ol>
    </section>
  </div>
</template>

<script lang="ts">

/*
vue-property-decorator를 조금 이해해보자
생각보다 우리가 몰랐던 Vue 요소들이 많다
*/ 
import { Component, Vue } from "vue-property-decorator";
import ToDoModel from "../models/ToDoModel";

// Component 있으면 때려박아주면 됨. 하지만 여긴 없다
@Component({
  components: {}
})

// 우리가 vue 파일을 정할 때 name : ... 이런식으로 정한다
// 여기선 class 명으로 정하는 것 같다
// name : ToDoWithoutStore   <=  이거와 같다
export default class ToDoWithoutStore extends Vue {
  // 여긴 특별히 data() {return{}} 와 같이 공간이 아니라 뭔가 자유도가 높아진 느낌이다
  // TS는 늘 Type을 정하는게 기본이다
  // 우리가 쓸 것들을 정의해보자
  private welcomeMessage: string;
  private todos: Array<ToDoModel>;
  private model: ToDoModel;
  private message: string;
  // 우선 정의를 하고 default를 이렇게 설정하는 것 같다
  constructor() {
    super();
    this.welcomeMessage = "Welcome to ToDo App!";
    this.todos = [];
    this.model = new ToDoModel();
    this.message = "";
  }
   // Type을 ToDoModel로 선언
  get ToDos(): ToDoModel[] {
    let todos = this.$store.state.todos; //this.todos;
    return todos;
  }
  AddToDo() {
    this.message = `Adding ${this.model.Name} to ToDo List ...`;
     // 자바스크립트 배열 메서드임
      // 이미 안에 있으면 멘트를 return
    if (this.ToDos.some(x => x.Name == this.model.Name)) {
      this.message = `ToDo item ${this.model.Name} already exists in your list`;
      return;
    }
    // this.todos.push(this.model);
    this.$store
      .dispatch("addToDo", this.model)
      .then(() => {
        this.message = "ToDo added successfully to your list";
        setTimeout(() => {
          this.message = "";
        }, 1500);
      })
      .catch(error => {
        console.error(error);
      });    
    this.model = new ToDoModel();
    this.message = "";
  }
}
</script>

<style scoped>
.welcome {
  color: #090629e5;
  margin: 20px;
  font-size: 20px;
}
.message {
  margin: 20px;
  font-size: 14px;
}
section {
  margin: 20px;
}
ol.list-group li:nth-of-type(even) {
  background: #cdecda;
}
</style>
```

