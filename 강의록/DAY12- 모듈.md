```
export default function App() {
    this.render = () => {
        alert('hello')
    }
    this.render()
}

export const print = () => {
    console.log('print')
}

```

다른 곳에서 import App from './App.js' 로 가져다 쓰면 됨 

만약 이름이 겹치면 import App as Dep from './App.js'

따로 가져올 때 

import App, { print } from './App.js'


# import

import를 사용하면 의존성관리를 편리하게 할 수 있다!

만약 스크립트를 전부 html에 두고 쓰면 

- 해당 파일간 의존성을 알기 어렵고 변수가 전역화 되서 곂치는 변수명이 있을 때 오버라이딩이 문제가 있다.

- 의존성에 따라 스크립트를 불러오는 순서를 직접 정해야 되서 불편하다!

- 사용하지 않는 스크립트를 추적하기 힘들다. 

# 해결: 모듈화

export한 스크립트를 의존성에 따라 import한 뒤 html에 최종 스크립트를 가져와 type ='module'로 지정합니다. 

```
    <main class="app"></main>
    <script src="./Header.js"></script>
    <script src="./storage.js"></script>
    <script src="./TodoForm.js"></script>
    <script src="./TodoList.js"></script>
    <script src="./App.js"></script>
    <script src="./main.js"></script>
    <script src="./localStorage.js"></script>
```

```
    <main class="app"></main>
    <script src="./main.js" type = "module"></script>
```

storage.js 

전

```


const storage = (function(storage) {
    const setItem = (key,value) => {
        try {
            storage.setItem(key, value)
        }catch(e) {
            console.log(e.message)
        }
    }

    const getItem = (key, defaultValue) => {
        try {
            const storedValue = storage.getItem(key)
            if(storedValue){
                return JSON.parse(storedValue)
            }
            return defaultValue
        }catch(e) {
            console.log(e.message)
            return defaultValue
        }
    }

    return {
        setItem,
        getItem
    }
})(window.localStorage)//전역 오염을 막기위해 
```

후

```
const storage = window.localStorage

export const setItem = (key,value) => {
    try {
        storage.setItem(key, value)
    }catch(e) {
        console.log(e.message)
    }
}

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key)
        if(storedValue){
            return JSON.parse(storedValue)
        }
        return defaultValue
    }catch(e) {
        console.log(e.message)
        return defaultValue
    }
}


```

# 장점

 스크립트 관리가 용이

 각 js별로 사용되는 모듈릉ㄹ 명시적으로 import 해서 사용되거나 사용되지 않는 스크립트 추적가능

 스크립트 불러오는 순서가 무관해짐

 전역 오염에서 탈출!

 # import 사용방법

 - 웹 서버가 필요해
 - from 엔 .js 붙여라

