
# BFS (Breadth-First Search)

> 너비 우선 탐색 : 레벨순회

루트 노드(또는 다른 임의의 노드)에서 시작해 인접한 노드를 먼저 탐색하는 방법

같은 레벨에서 왼쪽노드부터 오른쪽 노드 순으로 탐색한다.

큐를 이용해 구현, O(V+E) V: 정점의 수 E: 간선의 수 


## 사용

두 노드 사이의 최단 경로, 임의의 경로 찾기에서 사용 

## 여행경로  문제

### 나의 풀이 

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


> 자식맵 ==  { 키: 출발지, 노드: { data: 목적지, children : 자식 맵} } 

for문으로 해당 트리가 완성 되면, 트리를 레벨 순회 level()해서(조건문으로 자식의 알파벳정렬 추가) 차례로 나온 값을 배열에 넣고 반환하면 답이라고 생각했다. 그런데 안된다. 😰


### 해답

> 깊이우선 탐색



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
깊이 우선 

## 오답정리

경로가 무조건 이어질 수 있다는 점이 편향트리다.  다만 어떤식으로 잇느냐가 관건이라고 생각한다. 

# DFS (Depth-First Search)

> 깊이 우선 탐색 : 전위 순회, 중위 순회, 후위 순회

루트(또는 다른 임의의 노트)에서 시작해 다음 분기로 넘어가기 전 해당 분기를 완벽하게 탐색하는 방법

같은 레벨의 노드로 가기전 해당 노드의 마지막 후손을 탐색

스택을 이용해 구현



# 참조 

https://devuna.tistory.com/32