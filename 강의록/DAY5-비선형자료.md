# 그래프

> 지하철 노선도, 인물 관계도

여러 개의 간선 가질 수 있다. 노드 뒤에 노드가 여러개 나올 수 있다. 간선은 가중치를 가질 수 있다. 

방향, 무방향 

## 1. 연결 그래프

## 자바스트립트 구현 방법 

![image](https://user-images.githubusercontent.com/79133602/160165799-d48a7f7e-46c9-4f81-b34b-29712fb1bf19.png)

이런 그래프를 자바스크립트 코드로 구현하려면 어떻게 해야 할까?


### 인접행렬: 2차원 배열 

```
const graph = Array.from(Array(5), () => Array(5).fill(false));

graph[0][1] = true; // 0 -> 1
graph[4][0] = true; //4 -> 
.
.
```
 
이런식으로 행엔 원점 src => 열엔 도착점 dest을 넣고 해당 2차원 배열의 값을 true 즉 1로 준다.

그러면 다음과 같이 출력된다. 

![image](https://user-images.githubusercontent.com/79133602/160166140-a2aa95d4-857d-4d19-a547-20c73383a2dc.png)


true값이 있는 지점은 간선이 연결된 곳이고 만약 가중치를 주고 싶다면 false, true 대신 null과 가중값을 넣어주면 됨!



### 인접리스트: 연결리스트

> 데이터: 현재 노드 + 포인터: 간선으로 이어진 노드들

```
const graph = Array.from(Array(5), () =>[]);

graph[0].push(1);// 0 -> 1
graph[0].push(3);// 0 -> 3
graph[1].push(2);// 1 -> 2
graph[2].push(0);// 2 -> 0

```

연결리스트의 경우 배열의 인덱스가 노드가 되고 해당 인덱스의 값엔 간선으로 이어진 노드들이 배열로 들어 간다. 

즉, 데이터가 인덱스 포인터가 해당 인덱스의 값 배열이다.

![image](https://user-images.githubusercontent.com/79133602/160168528-d8f06e6f-81da-4d03-b85f-3789990fdaa1.png)

### 💡 시작 노드 값이 1이면?

배열의 인덱스는 0부터 시작한다. 따라서 값이 1인 노드가 0번째 인덱스에 있다면 계산하기 불편하다. 그럴 땐 배열 초기값을 ${ 원하는 크기+1 } 로 주자

```
const graph1 = Array.from(Array(n+1), () => Array(n+1).fill(false));
const graph2 = Array.from(Array(n+1), () => []);
graph2.fill(0)

```

# 트리

> 조직도, 디렉토리 

![image](https://user-images.githubusercontent.com/79133602/160230695-62870577-984f-413b-863c-3f0d7dcd79ac.png)


방향 그래프의 일종, 정점을 가리키는 간선이 하나 밖에 없다. 

루트 정점을 제외한 모든 정점은 반드시 하나의 부모 정점을 가져 (부모-자식 관계 o)

정점이  n개 라면 반드시 n-1개의 간선을 가져( n개의 정점 노드 중 루트를 제외하곤 간선으로 내려옴 )

루트에서 특정 정점으로 가는 경로는 유일 ( 방향성 :  노드 간에 1개의 간선으로 이어짐)

# 이진 트리 

> 자식이 최대 2개 

![image](https://user-images.githubusercontent.com/79133602/160230933-fbcf9990-097c-499d-84ff-15470506a8c0.png)


탐색을 위한 알고리즘

## 특징 

- 정점이 n개인 이진트리 최악의 경우 높이가 n => 편향트리 

- 정점이 n개인 포화, 완전 이진 트리의 높이  == log N

- 높이가 h인 포화 이진 트리는 2^h -1개 정점을 가짐 

- 사용되는 경우: 이진 탐색트리, 힙, AVL 트리, 레드 블랙 트리

## 구현 방법

그래프와 마찬가지로 인접행렬, 인접리스트 방식으로 구현할 수도 있는데 이진 트리의 경우 자식이 2개라는 
조건이 있어서 다음과 같이 연결 리스트로 구하면 편하다. 

### 이진트리 : 연결리스트

![image](https://user-images.githubusercontent.com/79133602/160233830-28e06ed6-899c-4039-95d5-3753c7d61b9c.png)


```
const input = [[9,3],[9,8],[8,7],[3,2],[3,5],[5,4]]

//인접 리스트
const tree = Array.from(Array(n),()=> []);
for(const [src,dest] of input){
    tree[src].push(dest);
}

// 배열

// left = idx *2 : 왼쪽 정점
// right = idx*2+1 : 오른 쪽 정점
// parent = floor(idx /2) : 부모 인덱스


const tree = [
    undefined,
    // 1
    9,
    // 1*2 , 1*2+1
    3,8,
    // 2*2, 2*2+1, 3*2,3*2+1
    2,5 ,undefined,7
    // 4*2, 4*2+1  ,5*2, 5*2+1 
    undefined,undefined,undefined, 4
]


// 연결리스트 : 링크가 두개 
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

//큐가 하는 일 원점 노드를 저장
class Queue {
    constructor(){
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(node){
        this.queue[rear++].push(node);
    }
    
    dequeue(){
        const val = this.queue[this.front];
        delete this.queue[this.front];
        this.front++;
        return val;
    }

    size(){
        return this.rear - this.front;
    }

    isEmpty(){
        return this.front === this.rear;
    }

}

//트리 구조
class Tree {
    constructor(node){        
        this.root = node;
    }

    display() {
        const queue = new Queue();
        queue.enqueue(this.root);//루트가 초기값

        while(queue.size) {// 큐 원점이 존재하는 한 === !isEmpty()
            const currentNode = queue.dequeue();//지금 큐에 있는 노드 == 원점, 부모
            console.log(currentNode.data);
            if(currentNode.left) queue.enqueu(currentNode.left);// 만약 왼쪽 정점 존재? 그놈을 원점으로 큐에 넣어
            if(currentNode.right) queue.enqueu(currentNode.right);// 오른쪽 자식도 마찬가지
        }

    }

}

const tree = new Tree(new Node(9));
tree.root.left = new Node(3);
tree.root.right = new Node(8);
tree.root.left.left = new Node(2);
tree.root.right.right = new Node(5);
tree.root.left.right.right = new Node(4);


console.log(tree);
```
