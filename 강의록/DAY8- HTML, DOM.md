# HTML

> Hyper Text Markup Langage

구조 + 의미 

Mark up  문서 수정 방식 

웹문서 , 스타일 지정 하이퍼링크로 연결됨 html은 프로그래밍 언어라 부르기 어렵 계산이 없자냐
그냥 워드 문서와 비슷

> xml

초창기 브라우저 : html 만으로 제작


수정사항 발생시 일일이 파일 수정하지 않고 css 등 기능에 따라 파일을 분리 후 다른 곳에서 가져다 쓰게 함

재사용성 증가

# HTML5 

멀티미디어 요소 추가, 구조적 태그 추가 기존 CSS

# CSS
 
> HTML 문서를 표현하는 STYLE

브라우저 마다 CSS 기본 달리 표현 , NOMALIZE CSS 사용하면 통일 가능

## CSS3 

selector {
    property: value;
}

## 사용방법

1. 외부 css 파일 만든 후 사용할 html 파일 상단 링크태그로 가져다 쓰기

2. 해당 html 파일 헤드 태그 안에 스타일 태그 만들고 css 지정

3.  각각의 요소마다 직접 스타일 지정

2,3번은 재사용성이 낮아.. 비효율적 ! 1번 방법을 쓰자!!!



# DOM

> Document Object Model

![image](https://user-images.githubusercontent.com/79133602/160793522-6b76b4c1-e9d4-4255-9f5d-0aa540f9aefd.png)


추상적인 개념의 객체를 물리적으로 표현 => HTML 문서 직접 수정

HTML을 읽어서 파싱 -> 트리구조로 노드를 계층으로 분리 

순회는 전위순회로 이뤄짐

## DOM 트리 Rendering

![image](https://user-images.githubusercontent.com/79133602/160793826-91e7fa47-cd2f-4df1-823e-e333e47d179d.png)

1. 브라우저가 html을 읽고 파싱해 돔트리 구성 -> DOM 트리

2. Attachment: 스타일 시트 파싱 해 돔요소에 스타일을 입힘 -> CSSOM 트리

3. Render Tree 생성: 1,2 과정을 합쳐서 돔 노드의 위치를 정해주고 화면을 출력



## DOM 선택

> id는 유일, class는 여러개

1. document.getElementById('아이디명') 

만약 id를 실수로 똑같이 주면 제일 먼저 찾은 요소 하나만 반환

2. document.getElementsByClassName('클래스명')

일치하는 모든 요소 반환

3. document.getElementsByTagName('태그명')

> ('li'), span, nav... 

일치하는 모든 요소 반환 li 태그들 전부...

4. document.querySelector('쿼리문')

> ('.클래스명'), ('#아이디명')

일치하는 제일 첫번째 요소만 반환

5. document.querySelector('쿼리문')

> ('.클래스명')

일치하는 클래스 요소 전부 반환 -> for문으로 각각 조작 

6. window[id] : id를 넣어준 태그 모두 반환

> window.id명

## DOM 접근

1. 선택노드.className 

해당 노드의 className을 초기화할 수도 출력할 수도 있음

2. 선택노드.classList 

3. 선택노드.hasAttribute('style...등등 속성명')

해당 속성이 존재하는 지 확인

4. 선택노드.getAttribute('속성명')

해당 속성의 값을 반환 없으면 null

5. 선택노드.setAttribute('속성명','값');

6. 선택노드.textContent = '원하는 글 내용'

> <선택된 태그> 원하는 글 내용 </선택된 태그>

해당 태그의 글을 바꿀 수 있음 

7. 선택노드.removeAttribute('속성명')

해당 속성 제거

8. 선택노드.innerHTML = '<p>HTML작성</p>'

> <선택된 태그><p>HTML작성</p></선택된 태그>

HTML을 직접 수정 XSS 위험이 있어 지양

9. const newDom = document.createElement('h1')

> newDome.textContent ='제목1'

해당 태그로 노드를 생성한다. 

10. document.body.appendChild(newDom)

> <h1>제목1</h1>이 마지막에 추가됨

선택한 요소 노드 마지막 자식 요소로 매개변수 노드 추가한다.

11. document.body.removeChild(newDom)

선택요소에서 매개변수 노드 삭제

## DOM 탐색

1. 선택노드.parentNode

선택된 노드의 부모 노드를 가져온다. document의 부모노드는 null 임

2. 선택노드.firstElementNode

선택 노드의 첫번째 자식노드를 가져온다. 없으면 null

3. 선택노드.children

선택노드의 모든 자식들을 불러온다. 없으면 빈배열

4. 선택노드.nextElementSibling

선택노드의 다음 형제 노드를 가져옴. 없으면 null

5. 선택노드.previousElementSibling

선택노드의 이전 형제 노드를 가져옴. 없으면 null





# Virtual DOM 

> 실제 돔트리 객체로 만들어 객체를 수정

돔을 수정할 때마다 재렌더링이 일어나, 자원소모가 심해... 만약 돔을 수정하고 싶은데 랜더링 덜 하려면? 

가상돔 사용 : 리액트, 뷰

## 주의 : 돔보다 빠르진 않아!

렌더링을 덜 한다고 항상 더 빠른거 아냐. 그리고 돔, 가상돔 둘다 탐색하고 수정하기에 더 비효율 적일 수도 있어!




