# @container

```
.contianer {

    container-type: inline-size;
    container-name: card-container;
}

@container card-container (inline-size < 400px){
    .container .item {
        컨테이너가 아니라 아이템만 조작
    }
}
```

# css도 이제 중첩 제공 예정

# @layer

```
@layer b,a //정렬순서

.container1 {

}

.container2 {

}

@layer a {
    .container2{

    }
}

@layer b {
    .container1{

    }
}

```

# aspect-ratio : 화면 비율

# content-visibility: auto //chrome 85

intersection observer 처럼 뷰포트 밖의 내용 어떻게 처리할 지 지정, 최적화에 필요

> 내릴 때 새로 받은 값 때문에 스크롤바 튕켜

contain-intrinsic-size: 2000px 이런식으로 전체 뷰포트 지정하면 안 튕겨

```
@supports (content-visibility: auto) and ( contain-intrinsic-size: 2000px){
    img {

    }
}
```

# overscroll-behavior: contain

내부 스크롤 끝나면 외부 스크롤이 내려가는 경우 위 속성으로 외부 스크롤 조작 막을 수 있음

# contain: size

컨테이너의 height: auto를 주면 그안의 후손 아이템의 높이만큼 높이가 생성, 근데 contain: size라고 속성값을 주면 후손 아이템 무시, 높이가 확 줄어들음

# contain: layout

요소 외부로 튀어 나가지 않고 요소안에서만 존재, 아이템 position: absolute , right:0 줘도 컨테이너 밖이면 안 내보내고 컨테이너 right: 0위치에 둠

# contain: paint

후손을 밖에 그리지 않아
