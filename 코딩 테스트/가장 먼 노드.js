// 핵심 키원드 노드, 간선, 최단 경로
//최단 경로가 제일 큰 경우의 집합 구하기
function solution(n, edge) {
    const graph =Array.from(Array(n+1),()=>[]);
    
    for(const [src,dest] of edge) {
        graph[src].push(dest);//src 원점 dest 도착지
        graph[dest].push(src);//양방향
    }
    
    const distance = Array(n+1).fill(0);//초기화
    distance[1] =1; // 
    
    //BFS  너비우선: 가까이 있는 거부터 탐색
class Queue {
    
    constructor(){
        this.queue = [];
        this.front = 0;
        this.rear = 0;   
    }
    
    enqueue(val){
        this.queue[this.rear++] = val; 
    }
    
    dequeue(){
        const val = this.queue[this.front];
        delete this.queue[this.front];
        this.front++;
        return val;
    }
    
    isEmpty(){
        return this.front === this.rear;
    }

}
    const queue = new Queue();
    queue.enqueue(1);
    
    while(!queue.isEmpty()){
        const src = queue.dequeue();
        //console.log(src)
        for(const dest of graph[src]){
            //console.log(dest)
            if(distance[dest]===0){
                queue.enqueue(dest)
                distance[dest] = distance[src] +1;
            }
        }
        
    }

    /* 배열로 풀기 : 값이 적을 땐 shift도 괜찮아. 자바스크립트 최적화 됨
       const queue = [];
    queue.push(1);
    
    while(queue.length !== 0){
        const src = queue.shift();
        
        for(const dest of graph[src]){
            if(distance[dest]===0){
                queue.push(dest);
                distance[dest] = distance[src] +1;
            }
        }
    }
    
    */
 
    //console.log(graph)
    //console.log(distance)
    const max = Math.max(...distance);
    return distance.filter(e=> e === max).length;
    
}