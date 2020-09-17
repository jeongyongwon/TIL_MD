# vue-property-decorator

---



## @Component(vue-class-component)

- 정의한 클래스를 vue가 인식할 수 있음

  

  

  #### TS - @Component

  ```typescript
  ...
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  
  //class명은 vue component 이름을 정한다 생각하면 될듯
  @Component
  export default class SampleComponent extends Vue {}
  </script>
  ...
  ```

  #### JS - Vue Component

  ```js
  ...
  <script>
  export default {
    name: 'SampleComponent'
  };
  </script>
  ...
  ```



#### 	컴포넌트 내부 옵션정보

- Child Components
- Directives
- Filters
- Mixins
- Data
- DOM
- Life-cycle Hooks
- Asset
- Configuration



## @Prop

- 컴포넌트 내의 지정한 멤버들을 속성(props)으로 사용할 수 있도록 구성

> @Prop(options: (PropOptions | Constructor[] | Constructor) = {})

#### TS - @Prop

```typescript
...
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SampleComponent extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
</script>
...
```

#### JS - Prop

```js
...
<script>
export default {
  name: 'SampleComponent',
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    }
  }
};
</script>
...
```



## @Emit

- 부모에서 자식으로 전달은 props 사용
- 자식에서 부모로 전달은 event 사용
- @Emit(event?: string)

#### TS - @Emit (자식)

```typescript
<template>
  <form @submit="onSubmit">
    <input v-model="value">
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ChildComponent extends Vue {
  value = '';

  // 부모로 값 전달
  onSubmit() {
    this.$emit('submit', this.value);
  }
  // 밑에꺼랑 같다 (그냥 적은거임) - 이게 더 간단함
  //@Emit()
  //submit() {
  //  return this.value;
  //}    
}
</script>
```

#### TS - @Emit (부모)

```js
<template>
  <ChildComponent @submit="onReceiveSubmit" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ChildComponent form '@/components/childcomponent.vue';

@Component({
  components: {
    ChildComponent
  }
})
export default class ParentComponent extends Vue {
  async onReceiveSubmit(newVal: string) {
    // $emit을 통해서 전달된 값 수신
    await this.$request.post(newVal);
  }
}
</script>
```



## @Ref (잘쓰진 모르겠으나 뭐 ..일단)

- 참조할 수 있는 요소 또는 컴포넌트를 정의하는 것으로 사전에 정의함으로서 오타나 수정에 대응하기 쉽도록 하는 역할을 담당한다.

- @Ref(refKey?: string)

```typescript
<template>
  <ChildComponent ref="childComponent" />
  <button ref="submitButton">Submit</button>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ChildComponent
  }
})
export default class SampleComponent extends Vue {
  @Ref() childComponent: ChildComponent;
  @Ref() submitButton: HTMLButtomElement;

  mounted() {
    // 자식 컴포넌트 메서드 실행
    this.childComponent.updateValue();
    // 버튼에 포커스 설정
    this.submitButton.focus()
  }
}
</script>
```







