// 트라이 : 문자열을 나눠서 그래프로 보관한 자료?

        // 자식 == 맵 { 키 == '자식문자' :  값 == 노드 { 값 == 'ca', 자식 == 맵},
        //              키 == '자식문자' :  값 == 노드 { 값 == 'ca', 자식 == 맵}
        //                }


        //  { data: 'c' , children : 
        //              'a' : { data : 'ca', childeren : 
        //                  't' : { data : 'cat' , children: new Map()},
        //                  'n' : { data : 'can' , children: new Map()}
        //                  }//t,n
        //              }//a
        //          }//c    

// 트라이 : 문자열을 나눠서 그래프로 보관한 자료?

class Node {// { data: '', children: { key : { node }}}
    constructor(data = "") {
        this.data = data;
        this.children = new Map(); 
        this.end = false; // can, canande 가려내기 : 끝난경우 true
    }
}

class Trie {
    constructor(){
        this.root = new Node();
    }

    insert(string){
        let currentNode = this.root;//초기 data == ""

        for(const char of string){ //c
            if(!currentNode.children.has(char)) {// c가 ""의 자식이 아니라면
                currentNode.children.set( // 현재 노드 ""의 자식으로  {'c' : { data: 'c', children: new Map()}}
                    char, new Node(currentNode.data + char)
                );
            }
            // c라면 {'a' : { data: 'ca', children: new Map()}} 을 넣어줌
            // c 다음 탐색 
            currentNode = currentNode.children.get(char);
        }
        currentNode.end = true;
    }
    //해당 키가 존재하는 지 확인 == 노드 존재 확인
    has(string) {
        let currentNode = this.root;

        for(const char of string){
            if(!currentNode.children.has(char)){
                return false;
            }
            currentNode = currentNode.children.get(char);
        }
        return true;
    }
    
    //키로 data가 검색어인 노드 찾기
    find(string) {
        let currentNode = this.root;

        for(const char of string){//키로 데이터 열람
            if(!currentNode.children.has(char)){
                return null //그런 노드 존재하지 않음
            }
            currentNode = currentNode.children.get(char); 
        }
        return currentNode;// 데이터가 검색어와 같은 노드
    }

    //자동완성 함수 
    autocomplete(string){
        const searchNode = this.find(string);// 데이터 == 검색어 노드 
        if(searchNode === null){
            return []; 
        }
        let searchList = [];//searchNode의 자식들
        let queue = [];//순회할 노드 큐
        queue.push(searchNode);

        while(queue.length !== 0){
            let currentNode = queue.shift();
            for(const [data,child] of currentNode.children){
       // console.log(child)
                if(child.children.size === 0){ //자식이 없는애 == 마지막 노드 
                    searchList.push(child.data);//마지막 노드의 data searchList에 추가
                }else{// 마지막 노드가 아니라면 순회
                		if(child.end === true){// can, canada 걸러내기
                			searchList.push(child.data);
                		}
                    queue.push(child);
                }
            }
        }

        return searchList;

    }



}

const trie = new Trie();

trie.insert("cat");
trie.insert("can");
trie.insert("canada");
trie.insert("cap");
trie.insert("captain");

console.log(trie.has("cat"));
console.log(trie.has("can"));
//console.log(trie.has("cap"));// false

console.log(trie.autocomplete('c'));
