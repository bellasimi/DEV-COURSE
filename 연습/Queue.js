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