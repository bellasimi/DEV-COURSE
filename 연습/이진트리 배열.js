const tree = [
    undefined,
    // 1
    9,
    // 1*2 , 1*2+1
    3,8,
    // 2*2, 2*2+1, 3*2,3*2+1
    2,5 ,undefined,7
    // 4*2, 4*2+1  ,5*2, 5*2+1 
    ,undefined,undefined,undefined, 4
]

//전위 순회
const preorder = (node) => {
    let left = node*2;
    let right = node*2+1;
    if(tree[node] !== undefined ) {
        console.log(tree[node]);
        preorder(left);
        preorder(right);
    }
}

//중위 순회
const inorder = (node) => {
    let left = node*2;
    let right = node*2+1;
    if(tree[node] !== undefined ) {
        preorder(left);
        console.log(tree[node]);
        preorder(right);
    }
}

//후위 순회
const postorder = (node) => {
    let left = node*2;
    let right = node*2+1;
    if(tree[node] !== undefined ) {
        preorder(left);
        preorder(right);
        console.log(tree[node]);
    }
}

console.log('전위순회');
preorder(1);// 9,3,2,5,4,8,7
console.log('중위순회');
inorder(1);// 2,3,5,4,9,8,7
console.log('후위순회');
postorder(1);// 2,4,5,3,7,8,9

