
# BFS (Breadth-First Search)

> 너비 우선 탐색 : 레벨순회

루트 노드(또는 다른 임의의 노드)에서 시작해 인접한 노드를 먼저 탐색하는 방법

같은 레벨에서 왼쪽노드부터 오른쪽 노드 순으로 탐색한다.

큐를 이용해 구현, O(V+E) V: 정점의 수 E: 간선의 수 

<br/>

## 사용


두 노드 사이의 최단 경로, 임의의 경로 찾기에서 사용 



<br/>

## 여행경로  문제


<br/>


### 나의 풀이 
<br/>


> 트리와 레벨순회 사용 - 너비 우선 탐색 

> 결과 : 풀지 못 함 😥

```


class Node {
    constructor(dest){//목적지
        this.data = dest;
        this.children = new Map();// { src : { data: dest, children: map } } ==  { 키 : 노드 }
    }
}

class Tree {
    constructor(node){
        this.root = node;
        this.currentNode = node; // 현재 노드가 바뀌면서 해당 노드의 children에 새로운 노드를 insert
    }
    
    insert(src,dest){//출발 공항 - 도착공항
        console.log(this.currentNode.children)
        this.currentNode.children.set(src,new Node(dest)) //노드의 children은 맵구조
        this.currentNode = this.currentNode.children.get(src) // 지금 만든 노드의 맵 넣기 dest : { data: dest, children: map }
    }
    
    bfs(){
        let queue = [];
        queue.push(this.root.data)// 첫 출발 공항 
        
        while(queue.length !== 0){
            let trip = [];
            let srcNode = queue.shift(); //출발지 노드
            
            let children = [...srcNode.children.values()].sort((a,b) => a.data - b.data)// children의 값만 빼서 배열로 만들고, data를 알파벳 순으로 정렬
           
            for( const node of children){//node == { data: dest, children: map(key : node) }
                if(children.size()){
                    queue.push(node);
                }
                
            }
            trip.push(srcNode.data); //출발지였던 공항을 여행 경로 배열에 추가
        }

        return trip;
    }
}
function solution(tickets) {
    var answer = [];
   
    const root = new Node("ICN")
    
    console.log(linkedList)
    const list = new LinkedList(root);

    for(const [src,dest] of tickets){
	    list.insert(src,dest);
    }

    return  list.bfs();

    //console.log(list.bfs());
    
}

```

먼저 tickets 배열의 [출발지, 목적지]를 노드로 만들어 준다. 루트의 데이터는 무조건 인천 공항이기 때문에 처음 노드는 ICN으로 만들어서 트리를 생성했다. 루트의 자식들은 맵구조의 value 값에 들어있다. 

<br/>


> 자식맵 ==  { 키: 출발지, 노드: { data: 목적지, children : 자식 맵} } 

for문으로 해당 트리가 완성 되면, 트리를 레벨 순회 level()해서(조건문으로 자식의 알파벳정렬 추가) 차례로 나온 값을 배열에 넣고 반환하면 답이라고 생각했다. 그런데 안된다. 😰


<br/>


### 🔑해답

<br/>


> 깊이우선 탐색

경로는 같은 레벨을 순회하는 게 아니라 한 분기의 마지막까지 내려가는 게 포인트였다. 

따라서 너비우선이 아닌 깊이 우선 탐색을 해야된다! 😫

```
function solution(tickets) {
  let answer = [];
  const result = [];
  const visited = [];
  
  tickets.sort();
  
  const len = tickets.length;
  const dfs = (str, count) => {
    result.push(str);
    
    if(count === len) {
      answer = result;
      return true;
    }
    
    for(let i = 0; i < len; i++) {
      if(!visited[i] && tickets[i][0] === str) {
        visited[i] = true;
        
        if(dfs(tickets[i][1], count+1)) return true;
        
        visited[i] = false;
      }
    }
    
    result.pop();
    
    return false;
  }
  
  dfs("ICN", 0);
  
  return answer;
}
```

<br/>


## 오답정리

경로가 무조건 이어질 수 있다는 점이 편향트리다.  다만 어떤식으로 잇느냐가 관건이라고 생각한다. 



<br/>

<br/>

<br/>


# DFS (Depth-First Search)

> 깊이 우선 탐색 : 전위 순회, 중위 순회, 후위 순회

루트(또는 다른 임의의 노트)에서 시작해 다음 분기로 넘어가기 전 해당 분기를 완벽하게 탐색하는 방법

같은 레벨의 노드로 가기전 해당 노드의 마지막 후손을 탐색

스택을 이용해 구현



<br/>
<br/>
<br/>


# 그리디 

> 매 선택에서 최적의 답 선택

매선택에서 최적의 값이기 때문에 결과가 최적해인 건 아님 

<br/>


## 특징

- 보통 최적해를 구하는 알고리즘보다 빠르다.
- 크루스칼, 다익스트라 알고리즘 등에 사용된다.
- 직관적인 문제 풀이에 적합하다. 

<br/>
<br/>


## 예시 : 동전 반환문제 

> 거스름 돈 : 큰 수부터 채워나감 

<br/>


## 예제: 큰 수 만들기

<br/>


### 나의 풀이 
<br/>


> 순회 + 조건문 


```
function solution(number, k) {
    let arr = number.split('');
    let answer =""
    
    
    for(let i = 1; i < arr.length; i++){//number 배열 순회
        let current = arr[i-1]
        let next = arr[i];
        let len = answer.length
        if(answer.lenght>arr.length - k){
           break;
        }else{
            if(current>next)e{// 다음값이 작으면 현재값을 answer에 추가
                console.log('curr',+current)
                answer += current;
            }       
        }
    }
    return answer;
}


```

number를 배열로 만들고 for문을 돌렸다. 해당 인덱스와 다음인덱스를 비교해, 다음값보다 크면 answer에 추가 했다. answer의 길이가 k삭제한 길이와 같으면 반복문을 나가고 마지막 answer값을 반환한다.


<br/>

### 🔑해답

> 스택 + 순회 + 조건

```
//다음값이 크면 이전 값을 전부 삭제!
//스택의 바닥에서부터 탑까지 큰 수 부터 작은 수로 나열이 돼야해

function solution(number, k) {
    
    const stack = [];
    let count = 0;
    
    for(let n of number){
        while(count< k && stack[stack.length -1] < n){ // 스택의 마지막값 == n-1 == 이전값이 n현재값보다 커야됨
            stack.pop();
            count++;//삭제한 갯수 == k 될때까지
        }
        stack.push(n); // 스택에 차례로 n값을 넣어줌 
        
    }
    
    while(count< k){//스택이 내림차순으로 정렬이 됐다면 삭제가 안됨 그래서 따로 해줌
        stack.pop();
        count++;
    }

    return stack.join("");
}

```
<br/><br/>

## 🤔 오답정리
<br/>

> 왜 틀렸을까?


number배열의 다음값이 작을 때 현재값을 answer에 추가하기에 마지막 값은 비교대상이 없어 추가되지 않는다. 또 내 생각과달리 다음값이 작아도 바로 
answer에 추가되는건 아니었다.  


> 어떻게 풀지?

문제의 요지는 number의 각 수를 차례로 stack에 넣고 바닥이 큰값 탑이 작은값이 되도록 k개 문자를 제거해주는 것이다. 

그러기 위해서 number배열 for문을 돌려 각각의 n이 stack에 담기게 한다. 담기 전 삭제 문자 수를 세기위해 count를 만들고 while문 조건을 다음과 같이 둔다.

> count < k && stack[stack.length-1] < n

그러면 k개 문자가 삭제되기 전 스택의 마지막 값(이전값)이 현재값보다 작으면 현재값보다 커질 때까지 스택을 제거한다. 

그럼 stack엔 가장 큰수가 배열의 형태로 담긴다.


단, 내림차순 정렬될 경우 삭제가 없기에 for문 밖에서 다시 k개 삭제할 때까지 마지막값을 삭제한다. 

그 이후 .join('')을 써서 문자열로 반환하면 된다!

<br/><br/>

<br/><br/>




# 참조 

💻 https://devuna.tistory.com/32

💻 [프로그래머스 스쿨 데브코스 DAY6](https://school.programmers.co.kr/tryouts/38311/challenges)