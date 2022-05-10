# call(thisArg,thisArg의 인수1, 인수2,...)

주어진 this값 및 각각 전달된 인수와 함께 함수를 호출합니다.
이미 할당된 다른 객체의 함수 메소드를 호출하는 해당 객체에 재할당할 때
사용됩니다. this는 현재 객체를 참조합니다. 메소드를 한 번 작성하면 새 객체를 위한
메소드를 재작성할 필요 없이 call을 이용해 다른 객체에 상속할 수 있습니다.

## 상속 예시

```js
function People(name, gender){
    this.name = name
    this.gender = gender
}

function Shin(name,gender){
    People.call(this, name, gender) // this는 Shin
    this.category = 'student'
}

new Shin('shin','w')

function Shin('shin','w'){
    this.name = 'shin'
    this.gender = 'w'
    this.categoru = 'st'
}


console.log(new Shin('shin','w').gender) // 'w'

```


# apply(thisArgs,[argsArray === thisArgs 인수들의 배열])

이미 존재하는 함수를 호출할 때 다른 this 객체를 할당할 수 있습니다. this는 현재 객체, 호출하는 객체를 참조합니다. 

argsArray 파라미터를 위한 arguments를 사용할 수도 있습니다. arguments는 함수의 지역 변수입니다. 이는 호출된 객체의 지정되지 않은 모든 인수에 대해 사용할 수 있습니다. 즉, 호출된 객체의 인수들을 몰라도 arguments로 뭉뚱그려서 처리할 수 있습니다. 

```js
Function.prototype.construct = function(arguments){
    let newObject = Object.create(this.prototype) 
    this.apply(newObject,arguments)
    return newObject
}
```

# 정리

둘다 thisArgs에 인수를 상속한다는 점이 같지만 call은 인수를 하나 하나 따로 매개변수로 받고, apply는 인수들을 단 하나의 배열로 모아 받는 다는 점이 다르다.

> A.call(B, A의 인수1, 인수2,...)
> A.apply(B,[A의 인수1, 인수2,...])

A야 B한테 너가 가진 값을 줘


# 더 생각해보기 : 디바운스 함수

```js

const fn = async (keyword) => {
  await fetchSuggests(keyword)
}
```
만약 위 함수를 디바운싱하려면 다음과 같이 작성해 주면 된다. 

```js

export default function debounce(fn, 300) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(context, args)
    }, 300)
  }
}

```

fn아 0.3초가 지났는데 이벤트 발생이 없다면 현재 return function에 너가 가진 값을 내놔라 

context === debouce
arguments === fn