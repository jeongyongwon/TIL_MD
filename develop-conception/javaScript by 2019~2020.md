# JS 2019 ~ 2020

---

## ECMAScript 2018



### 동적 import() 구문

Promise 기반의 [import() 구문](https://github.com/tc39/proposal-dynamic-import)은 JavaScript 모듈을 동적으로 로딩한다.

```js
import("./myModule.mjs")  
    .then(module => {
        ...
    });
// using async/await
(async () => {
    const module = await import("./myModule.mjs");
    ...
})();
```



###  나머지 속성과 펼침 속성

[나머지(rest) 속성과 펼침(spread) 속성](https://github.com/tc39/proposal-object-rest-spread)을 객체에서 사용할 수 있다. 

```js
// Rest property
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };  
x; // 1  
y; // 2  
z; // { a: 3, b: 4 }

// Spread property
let n = { x, y, ...z };  
n; // { x: 1, y: 2, a: 3, b: 4 }  
```



## ECMAScript 2019



### Array.prototype.flat() 메서드와 Array.prototype.flatMap() 메서드

```js
// Array.prototype.flat
 [1, 2, [3, 4]].flat();  // [1, 2, 3, 4]
 [1, 2, [3, 4, [5, 6]]].flat(1);  // [1, 2, 3, 4, [5, 6]]

// Array.prototype.flatMap
 [1, 2, 3, 4].map(x => [x * 2]);  // [[2], [4], [6], [8]]
 [1, 2, 3, 4].flatMap(x => [x * 2]);  // [2, 4, 6, 8]
```



### Object.fromEntries() 메서드

- [Object.fromEntries() 메서드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)는 '키-값' 쌍으로 이루어진 데이터 목록을 객체로 변환

````js
const entries = new Map([  
    ['foo', 'bar'],
    ['baz', 42]
]);

Object.fromEntries(entries);  // { foo: "bar", baz: 42 }  
````



### String.prototype.trimStart() 메서드와 String.prototype.trimEnd() 메서드

- 공백제거

````js

const greeting = "   Hello world!   ";

greeting.trimStart();  // "Hello world!   "  
greeting.trimEnd();  // "   Hello world!"  
````



### catch 구문의 파라미터 생략

- "[Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding)"의 제안은 try...catch 구문에서 catch 구문에 파라미터가 사용되지 않음

```js
try { ··· } catch(e) { ··· }

// Optional catch binding
// 파라미터가 필요없는 경우, (e) 생략 가능
try { ··· } catch { ··· }  
```





## 그 외 새로운 것들

#### 초기화 영역

- 일반적으로 클래스에서 인스턴스 변수를 초기화하는 방법은 다음 예처럼 생성자(constructor)를 통해 이뤄진다.

```js
class MyClass {  
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}

class MyClass {  
    // Initializer
    x = 1;
    y = 2;
    log = console.log("Initializer");

    constructor() {
        console.log("Constructor:", this.x, this.y);
    }
}

new MyClass();  
// Initializer
// Constructor: 1 2
```



#### private 선언자



JavaScript 문법이 private 선언자를 제공하지 않았을 때에는 많은 개발자가 밑줄(`_`)을 접두사로 사용해 private 변수나 메서드를 정의했다. 하지만 이 방법은 코드를 작성하는 형식일 뿐 실제로는 `_`가 해당 변수나 메서드를 private 요소로 작동하게 하지는 못한다(물론, 실제로 private 요소로 작동하게 만드는 방법도 있다).

```js
function MyClass() {  
    this._x = 1;
    this._y = 2;
}

MyClass.prototype.getX = function() {  
    return this._x;
}
```



private 선언자 명세는 숫자 기호(`#`)를 접두사로 사용해 private 요소임을 명시적으로 선언하게 한다. `#`가 붙은 변수나 메서드는 오로지 클래스 블록 안에서만 접근할 수 있다.

```js
class MyClass {  
    #foo; // private field

   constructor(foo) {
        this.#foo = foo;
    }

    incFoo() {
        this.#foo++;
    }
}
```



####  선언과 접근

다음은 다양한 형태로 클래스 필드를 선언하고 접근하는 방법을 보여 주는 간단한 예이다.

````js
class MyClass {  
    A = 1;  // (a) instance field
    static B = 2;  // (b) static class field
    #C = 3;  // (c) private field

    getPrivate() {
        return this.#C;
    }
}

new MyClass().A;  // 1  
MyClass.B;  // 2  
new MyClass().getPrivate();  // 3  
````



### Promise.allSettled

- 나열된 여러 개의 Promise 모음이 모두 처리(settled)(이행(fulfilled) 또는 거부(rejected))된 후, 각 Promise의 결과 값의 컬렉션을 반환한다.

```js
const promise1 = Promise.resolve(3);  
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));

Promise.allSettled([promise1, promise2]).  
  then((results) => results.forEach((result) => console.log(result.status)));

// 결과 값:
// "fulfilled"
// "rejected"
```



#### Export * as ns from "mod"

- 모듈을 모두 import한 후, 새로운 이름(namespace)로 export할 수 있게 하는 문법이다.

```js
export * as ns from "mod";  
```



#### Promise.any

- 나열된 여러 개의 Promise 모음 중, 첫 번째로 이행(fulfilled)되고 처리(resolved)된 Promise를 반환

```js
const promise1 = Promise.reject(0);  
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));  
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

Promise.any([promise1, promise2, promise3])  
  .then((value) => console.log(value)); // "quick"
```

