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

}

const tree = new Tree( new Node(9));

tree.root.left = new Node(3);
tree.root.right = new Node(8);
tree.root.right.right = new Node(7);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(5);
tree.root.left.right.right = new Node(4);


console.log(tree.display());


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

const inorderStack = () => {
    if(!node){
        return;
    }
    let stack = [];
    stack.push(node);

    while (stack.length !== 0){
        let currentNode = stack.pop();
        console.log(currentNode);
        if(currentNode.right){
            
        }
    }

}   
