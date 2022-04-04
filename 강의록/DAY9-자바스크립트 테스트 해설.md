# 자바 객체 생성 시 this란? 

## 1. window인 경우

> const shin = Man('shin',11)

생성자 함수를 쓰지 않고 그냥 함수를 넣었다면 함수에 return문이 있어야 객체가 생성된다. 

```
function Man (name,age) {
    this.name = name
    this.age = age

    this.talk = () => {
        console.log(`${this.name}, 넌 ${this.age}살이구나!`)
    }
}

const shin = Man('shin',11);// 실행시 Man 안의 this는 윈도우임
console.log(shin);// return 값이 없어서 undefined
console.log(shin.name);// undefined.name 값이 없어서 오류!
```

지금 Man() 함수를 shin에 넣었지만 반환 값이 없어서 shin은 undefined고 따라서 shin.name은 선언 된적도 없다! 
이 때 Man() 함수가 실행되면서 선언된 this는 window며 this.name은 전역변수가 된다. 

## 2. 새로 만든 객체인 경우

> const shin = new Man('shin',11)

 Man 안의 this는 new를 통해 실행된 Cat객체이고, return 문 없어도 객체 반환한다.

```
const shin = new Man('shin',11);// 실행시
console.log(shin);// 새로만든 객체 반환
console.log(shin.name);// shin
shin.talk();// shin, 넌 11살이구나!
```


<br/>
<br/>
<br/>

# this의 스코프 범위는?

## 객체의 경우

> 실행 함수가 속한 객체

```
const today = {
    who: 'shin',
    what: {
        study: 'java',
        how: function(){
            console.log(`${this.who} ${this.study} 열심히 해!`)
        }
    }
}

today.what.how();// undefined java 열심히 해!
```
현재 how가 실행될 때 this는 how가 속한 객체 what이다. 그러므로 what 밖에있는 who엔 접근할 수 없다. 

## 해결 방법

만약 접근하고 싶다면 다음과 같이 el식을 고쳐줘야 한다.

```
`${today.who} ${this.study} 열심히 해!`
```

## 함수인 경우

함수가 중첩된 경우 this의 스코프를 유심히 봐야 한다. 아래의 경우 this.subjects에서 setTimeOut이 스코프를 새로 생성했기 때문에  this는 기존의 toDoList가 아니라 setTimeOut이 속한 study다.
study엔 subjects가 존재하지 않아 오류가 난다. 

```
const subjects = [{ do: function(){ console.log('math') },
                  { do: function(){ console.log('english') }
                 ]

function toDoList(subjects) {
    this.subjects = subjects;
    this.study = function(){
        //여기까진 아직 this가 toDoList
                setTimeout(function(){
        //setTimeout이 새로 this를 study로 만듬
                    this.subjects.forEach(function(subject){    
                        subject.do();
                    })
                },1000)//1초뒤 실행
            }
        
    }
}

const today = new toDoList(subjects);
today.study(); // 에러 
```

원하는 subjects값은 toDoList 스코프에 존재하기 때문에 위 오류를 해결하기 위해선 다음과 같은 방법이 필요하다. 

## 해결 방법

### 1. arrow function 

> () => {}

arrow function 안의 this는 기존 this의 스코프를 유지한다. ( 새로 스코프 생성 x)

```
function toDoList(subjects) {
    this.subjects = subjects;
    this.study = function(){
                setTimeout(() => { // arrow인 경우 스코프 생성 안해
                    this.subjects.forEach(function(subject){    
                        subject.do();
                    })
                },1000)//1초뒤 실행
            }
    }
}
```

### 2. bind()

함수를 만드는 함수

```
function toDoList(subjects) {
    this.subjects = subjects;
    this.study = function(){
        //여기선 아직 this === toDoList
                setTimeout(function(){
                    this.subjects.forEach(function(subject){    
                        subject.do();
                    })
                }.bind(this),1000)
            }
    }
}
```

원래대로라면 setTimeout이 새로 this를 study로 인식하지만 bind로 this를 toDoList로 지정했기에 이제 오류가 나지 않는다.

### 3. 클로저 사용

원하는 외부 this를 변수에 담아서 내부 함수에서 사용한다.

```
function toDoList(subjects) {
    var that = this;
    this.subjects = subjects;
    this.study = function(){
                setTimeout(function(){
                    that.subjects.forEach(function(subject){    
                        subject.do();
                    })
                }.bind(this),1000)
            }
    }
}
```


# 