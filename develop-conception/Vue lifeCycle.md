# Vue Life Cycle

---

크게 4가지가 있다

- **Created**
- **Mounted**
- **Updated**
- **destroyed**

### 

### 1. Created (컴포넌트가 보여주기 하지만, 화면에 나타나기 전)

- 컴포넌트가 DOM에 추가되기 전임
- 서버 렌더링에서 지원되는 훅
- 따라서 클라이언트 - 서버단 렌더링 모두에서 처리해야할 일이 있으면 이 단계에서 실행
- `this.$el` 를 사용할 수 없음 => **DOM이 추가 되기 전이기 때문임**



### 2. mounted

- 실제로 화면에 나타나는 순간
- Dom 조작과 관련된 method는 mounted에서 함



### 3. updated

- 화면이 바뀌면 (ex 1+1 =2 가 2+3으로 바뀐다던지)
- 컴포넌트의 데이터가 변하여 재 렌더링이 일어나 후에 실행



### 4. destroyed

- 화면에 있다가 없어졌을 때