class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(node){
        this.root = node;
    }

    display() {
        const queue = [];
        queue.push(this.root);
        // root만 출력해도 tree를 볼 수 있으니까 아래는 currentNode.data 따로 출력할 거 아니면 필요 없어
        // while( queue.length ){
        //     const currentNode = queue.shift();
        //     console.log(currentNode.data);
        //     if(currentNode.left) queue.push(currentNode.left);
        //     if(currentNode.right) queue.push(currentNode.right);
        // }

        return queue;
    }
    preorder(node) { 
        if(!node){
            return; //노드가 존재하지 않을 떈 종료
        }
       	console.log(node.data);
        //노드가 존재하는 한 재귀 반복
        this.preorder(node.left);
        this.preorder(node.right);
    }
    
    inorder(node){ 
        if(!node){
            return;
        }
        this.inorder(node.left);
        console.log(node.data);
        this.inorder(node.right);
    }
    postorder(node) {
        if(!node){
            return;
        }
        this.postorder(node.left);
        this.postorder(node.right);
        console.log(node.data);
    }
}

const tree = new Tree( new Node(9));

tree.root.left = new Node(3);
tree.root.right = new Node(8);
tree.root.right.right = new Node(7);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(5);
tree.root.left.right.right = new Node(4);


console.log(tree.display());

console.log('전위순회');
tree.preorder(tree.root);// 9,3,2,5,4,8,7
console.log('중위순회');
tree.inorder(tree.root);// 2,3,5,4,9,8,7
console.log('후위순회');
tree.postorder(tree.root);// 2,4,5,3,7,8,9
// 함수를 const에 할당? 선언문 이전 참조 방지 및 함수 오버로딩(재선언), 오버라이딩(재할당) 방지

//recursive 재귀호출로 순회 구현하기

// 루트(Center) 노드를 방문하는 시점따라 나뉨

//전위 순회 CLR : 루트 - 왼쪽 - 오른쪽

const preorder = (node) => { //루트 == 처음 node 
    if(!node){
        return; //노드가 존재하지 않을 떈 종료
    }
    console.log(node.data);
    //노드가 존재하는 한 재귀 반복
    preorder(node.left);
    preorder(node.right);
}

//중위 순회 LCR 
const inorder = (node) => { //맨 왼쪽 노드 == 처음 node
    if(!node){
        return;
    }
    inorder(node.left);
    console.log(node.data);
    inorder(node.right);
}

//후위순회  LRC
const postorder = (node) => {
    if(!node){
        return;
    }
    postorder(node.left);
    postorder(node.right);
    console.log(node.data);
}

console.log('전위순회');
preorder(tree.root);// 9,3,2,5,4,8,7
console.log('중위순회');
inorder(tree.root);// 2,3,5,4,9,8,7
console.log('후위순회');
postorder(tree.root);// 2,4,5,3,7,8,9


//반복+스택으로 구현하기

//전위순회 : CLR
const preorderStack = (node) => {
    if(!node){
        return;
    }
    let stack = [];
    stack.push(node);

    while (stack.length !== 0){
        let currentNode = stack.pop();//마지막 값이 left -> left 쪽 먼저 탐색 후 right 탐색
        console.log(currentNode.data);
        if(currentNode.right) stack.push(currentNode.right);
        if(currentNode.left) stack.push(currentNode.left);//left를 마지막에 넣어야 먼저 꺼냄
    }

}   
//중위 순회 : LCR
const inorderStack = (node) => {
    if(!node){
        return;
    }
    let stack = [];
    let currentNode = node;

    while(true){
        if(currentNode !== null){ //left자식 없는 노드가 나올 때까지
            stack.push(currentNode); //left들만 담김
            currentNode = currentNode.left; //자식없는 마지막 left 노드가 담김
        }else if(stack.length !== 0 ){
            currentNode = stack.pop(); //left 꺼내고
            console.log(currentNode.data); //left의 데이터 출력
            currentNode = currentNode.right;//해당 노드는 left자식이 없었으므로 right 자식이 있는지 탐색
        }else{
            break;
        }
    }
}

//후위 순회 : LRC
const postorderStack = (node) => {
    if(!node){
        return;
    }
    let stack = [];
    let currentNode = node;
    let lastNode = null;

    while(true){
        if(!currentNode){
            stack.push(currentNode);
            currentNode = currentNode.left;
        }else if(stack.length !== 0){
            currentNode = stack.pop();
            currentNode = currentNode.right;
            console.log(currentNode.data);
        }else{
            break;
        }
    }
}

console.log('전위순회');
preorderStack(tree.root);
console.log('중위순회');
inorderStack(tree.root);
console.log('후위순회');
postorderStack(tree.root);

