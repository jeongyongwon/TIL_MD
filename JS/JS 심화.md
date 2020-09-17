# JS 심화개념

---



## CallBack 이해하기 - 지정한 시간에 돌려줘!!

> **콜백 함수**는 **함수** 안에서 어떤 특정한 시점에 호출되는 **함수**를 말합니다
>
> **대표적은 setTimeout이 있음**
>
> ````js
> setTimeout(() => console.log('2'),1000);
> ````
>
> 

- **hoisting이란**

  => **var 변수나 function을 선언하면 자동적으로 제일 위로 올라가는 것**

- **sync는 언제 코드가 실행될 지 아는 것이고, async는 언제 실행되는지 모르는 것이다**

### => CallBack도 동기/비동기 다 존재함

### 1. 동기적 요청

```JS
function printImmediately(print) {
    print();
}

printImmediately(() => console.log('hello'));
```

### 2. 비동기적 요청

```js
function printwithdelay(print, timeout) {
    setTimeout(print, timeout);
}

printwithdelay(() => console.log('비동기 콜백'), 2000);
// 2초 뒤에 됨
```



### Callback 지옥 코드 작성

#### 1. 우선 로그인하는 로직을 작성함

```js
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') || 
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            } 
        }, 2000);
    }
    
    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role:'admin'});
            } else {
                onError(new Error('no access'));
            } 
        }, 1000);        
    }
}
```

#### 2. 위의 로직에 이어서 밑에서 콜백함수를 사용해본다

```js
const userStorage = new UserStorage();
const id = promt('enter id')
const password = prompt('enter password')
// 새로 생성된 인스턴스를 활용하여 클래스 내의 로직을 이용함
userStorage.loginUser(
    	id, 
    	password,
    	//onSuccess 부분
    	user => {
            userStorage.getRoles(
            	user,
                userWithRole => {
                    alert(`hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
                },
                error => {
                    console.log(error);
                }
            
            );
        },
    	error => {
        	console.log(error);    
        }
    );
```

