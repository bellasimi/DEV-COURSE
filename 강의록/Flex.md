# display: flex

요소 안의 아이템을 정렬할 때 사용하는 속성입니다. 

> float 속성을 쓰면 안되나?

float을 써서 아이템을 정렬하는 방법도 있지만 이는 float의 기본 특성에 반하는 행위입니다. 
float은 이미지 정렬을 위한 속성이기 때문에 그 외 요소들을 정렬할 땐 다른 속성을 사용해야 합니다.

> display: inline, inline-block + margin 쓰면?

간단한 레이아웃을 짤 때는 위 속성만으로도 정렬이 가능하겠지만, 실제 웹 사이트의 페이지는 여러개의 요소로 구성됩니다.
또 margin은 주변 요소의 영향을 받는데 이를 잘 못 계산하면 레이아웃이 달라집니다.

때문에 위 속성으로 레이아웃을 짜면 수 많은 아이템을 전부 고려해야 하는 만큼 변수가 많아서 작업이 힘들어집니다.

> display: flex를 쓰자!

요소들을 아이템으로 만들어서 블록으로 묶으면 레이아웃을 짤 때 좀 더 체계적이고 효율적으로 작업할 수 있습니다. 

그러므로 요소들을 정렬할 땐 flex를 써야 합니다!

## 예외

> 내 웹사이트의 타겟층에 구형 브라우저를 쓰는 유저가 많다면..?

다양한 계층의 사람들이 사용하는 사이트의 경우 구형 브라우저 사용자들을 고려해서 display: flex대신 float을 사용합니다. 
그러므로 나의 사정을 고려해 flex가 유용해도 레거시 코드가 필요하다면 사용합시다.


# 그럼 어떻게 쓸까?

## align-content vs align-items

> 2줄이상은 content, 1줄은 items

flex-wrap: wrap이면 items가 container 넘어가면 줄바꿈함

이 때 2줄이상이 되면 교차축을 align-content!

## container 안 item의 비율을 정하고 싶다면

```
.container {
    gap: 10px;  flex item 사이 여백주기
}

.item {
    flex-grow: 1; 해당 비율로 늘어나라
    flex-basis: 0; 0으로 초기화
    flex-shrink : 0 줄어들지 마
    overflow: hidden;
    white-space: wrap;
}
```

## 아이템 하나만 정렬할 때도 사용

> 컨테이너의 중간에 아이템을 두고 싶을 때

```
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

```

## 모달창

```
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.modal .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal .box {
    width: 100%;
    max-width: 500px;
    height: calc(100% -100px);
    position: ralative; // 이게 없으면 static -> position이 없는 거나 같아
    overflow: hidden; // 해당 박스 밖으로 넘어가면 삭제
}
```

position이 존재해야 요소의 제일 가까운 조상을 제대로 인식함, position: static이 기본 값인데 position이 없는 상태나 다름 없어서 인식 못하고 window로 조상인식해버림

## 레이어가 여러개인 경우? 

위의 예시에서 모달 배경이 화면에 꽉 차서 레이어가 생겼는데, 뒤에 나온 모달이 우선권이 생겨서 상위 레이어가 된다. 단!  position이 지정된 경우에 한해서!!
만약 지정 없다면, 배경 뒤에 묻힌다. 

> z-index: 1 쓰면 되잖아?

모달 배경 position 존재하는 데 모달은 없다? z-index 안 먹혀


# 번외: css 가상요소 

> ::before

선택한 요소 앞에 가상요소 삽입

> ::after

선택한 요소 뒤에 가상요소 삽입



