# fetch로 받아온 데이터 조작
> fetch는 http error 발생하더라도 reject 되지 않습니다. 네트워크 에러나 요청이 완료되지 못한 겨웅만 reject되기에 요청 중 에러가 생겨도 then으로 떨어지는 것을 방지하기 위해선 response의 status code나 ok를 체크해줘!!



## 1. response.text() : text 파일


## 2. response.json() : json 파일





## 3. response. blob() : 이미지 파일

```
fetch(imageUrl)
.then((res) => { 
    return res.blob()
})
.then((data) => {
    const url = URL.createObjectURL(data)

    $imgage.src = url

    document.querySelecor('body').appendChild($image)

})
```

# innerHTML

성능이 안좋지 않아?

그정도 되려면 1초에 INNERHTML이 수십번 불려야 해..

그럴 경우 별로 없어.

장점 : 상태가 바뀌고 그걸로 화면 렌더링이 되는 게 보장됨 

=> 버그가 덜 생기니까 기회비용이 더 좋아

=> 장점보다 단점이 크다고 생각한다면? 
이전상태와 지금 상태가 값이 같으면 렌더링 스킵, 최적화하면 돼 

=> 또는 전부 createElement 해서 append 하는 방법도 있지만... 너무 가독성이 떨어져...


# dataset의 문제

개발자 도구에서 해당 값들을 볼 수 있어.

중요 정보는 여기에 넣으면 안돼
