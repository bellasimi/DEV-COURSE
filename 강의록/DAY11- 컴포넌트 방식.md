# 쿠키

브라우저에 저장되는 작은 문자열

```
document.cookie = 'language = javascript; expired=Wed, 14 April 2022 02:11:11 GMT" // 시차 보정 안된 GMT 기준
```

이전 쿠키 덮어쓰지 않고 추가 ;로 구분되서 불러온 후 split등으로 쪼개 써야 함

```
document.cookie.split(';')

const date = new Date()
date.setDate(date.getDate() +1 )
document.cookie = `md=dl; expired = ${date.toGMTString()}`

```

# 주의 사항

- HTTP 요청시 헤더에 쿠키가 같이 나가서 쿠키가 방대해지면 데이터 소모가 크다.
- 보안 취약점이 있다.


# Local Storage

> 도메인 기반으로 key, value local에 저장

직접 삭제하지 않는 한 껐다 켰다고 삭제되지 않아


# 과거 LocalStorage 지원하지 않았을 때

직접 property를 수정 
```
window.localStorage.name = 'shin' 
window.localStorage['name'] = 'shin'
```

이 방법은 내장함수들을 덮어 씌울 수 있어서 비추!!

# 현재

아예 key와 value를 setItem으로 지정해서 입력

```
window.localStorage.setItem('name','shin')
localStorage.setItem('name','shin')
```
key와 value는 기본적으로 string이기때문에 숫자는 문자로 인식, 객체 같은 애는 JSON.stringify()사용 

불러올 땐 


```
localStorage.setItem('obj',JSON.stringify(객체))
JSON.parse(localStorage.getItem('obj'))
```
# LocalStorage 문제

## 1. 잘 못된 형식의 입력값이 들어가면?

만약 JSON 형식으로 값을 입력하라고 했는데, 그냥 일반 문자가 들어가면 에러가 납니다. 반대로 일반 문자가 들어가야하는 자리에 객체나 배열같은 자료형이 들어가면 에러가 난다. 


## 2. 용량제한

캐싱 잘 못 설정하면, 캐시 날리는 코드 없어서 쌓이기만 함 -> 동작 못해...



## 💡 해결

이를 해결하기 위해선 try catch로 자료형을 구분해 트러블 슈팅을 해줘야 합니다. 이를 위해 별도의 함수 만들면 좋다!

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
