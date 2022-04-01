# 백트래킹

> 모든 경우의 수 찾기 + 가지치기

주로 BFS,DFS로 풀이 

모든 경우의 수를 찾을 수 있도록 코딩 

이후 문제에서 특정한 조건을 만족하는 것만 탬색, 나머지 안하도록 가지치기하는 조건문을 준다. 


## 에제 : N Queen


> 길이가 n인 체스판위에 퀸이 서로 공격 안하도록 배치

### 전략

> 퀸은 직선, 대각선 무한으로 이동 가능

 퀸을 둔 행,열,대각선을 가지치기 합니다. 단, 루프로 행,열,대각선을 검사하면 비효율적입니다. 따라서 1차원 배열을 이용해야 합니다. 

> let queen = Array.from({length:n}, () => 0) 

 - 행: 배열의 인덱스
 - 열: 해당 인덱스의 값
 - 대각선: 두 요소를 비교, ${ | 행1-행2 === 열1-열2 | }인 곳

```

function check(queen,row){//row는 현재행 but row는 계속 이동( 재귀호출 )
//이전까지 뒀던 퀸의 위치를 현재자리와 비교
    for(let i = 0;  i< row; i++){
        if(queen[i] === queen[row] || Math.abs(queen[row]-queen[i]) === row -i){
            return false; // 만약 이전열들 중 === 현재열의 값 or 대각선의 값이 같다면 해당 자리엔 퀸이 올 수 없다 => false
        }
    }
    //열, 대각선이 다른 경우만
    return true;
}

function search(queen,row) {//row는 계속 이동( 재귀호출 )
    const n = queen.length;//퀸의 갯수 
    let count = 0;
    
    if(n===row){ //체스판 끝에 도달한 경우, 재귀를 탈출
        return 1;
    }
    
    for(let col =0; col< n; col=+1){//row+1이 
        queen[row] = col; //일단 첫 시작값은 queen[0] = 0
        //퀸을 두고나서 얘가 여기있어도 되는지 배열과 해당 행으로 check!
        if(check(queen,row)){// check결과 열,대각선 true 괜찮다면
        console.log('d')
            count += search(queen,row+1) //재귀를 통해 계속 행을 이동, true면 1이 반환
        }
        //check 결과 열,대각선이 곂치면 그다음 열 이동
    }
    
    return count; // 재귀함수 다 끝나고 기존 search 함수의 for문을 다 돌린 경우
    
}


function solution(n) {
    let queen = Array.from({length: n}, () => 0)
    return search(queen,0);
}
```

# 동적 계획법

> 작은 문제로 큰 문제를 해결

가장 작은 문제를 정의할 수 있는지? 그리고 작은 문제로 큰 문제를 해결할 수 있다면 동적계획법으로 풀어야 한다. 

## 1. 메모이제이션

- 하향식 접근법 : 단어 퍼즐

```
function solution(strs, t) {
    // 편의를 위해 t의 길이+1만큼의 배열을 만든다. 그럼 인덱스1부터 따져봄
    const dp = Array.from({ length: t.length+1},()=> 0);//해당 char까지 자른 문자의 최솟값
    
    const strSet = new Set(strs);//단어조각
    
    //1부터 문자열 길이+1까지 루프를 돈다.
    for( let i = 1; i < t.length +1; i++){ // i 문자의 인덱스 i==4 bana
        //일단 해당 문자열의 최솟값을 무한으로 준다.
        dp[i] = Infinity;
        //문자열을 자르면서 단어 조각을 찾기위해 루프를 돈다.
        // 단어 조각의 길이는 5이하기 때문에 마지막까지 자를 필요 없다.
        for(let j = 1; j< Math.min(i+1,6); j++){ //j 조각의 인덱스 1,2,...,i 4 j가 3일경우 ban
            const start = i-j; //단어조각 뺀 나머지 == 삭제 후 시작인덱스  4-3 = 1
            const end = i;// 루프로 돌고 있는 단어 인덱스 4
            // 헤당 인덱스까지 자른 단어 조각이 존재한다면
            if(strSet.has(t.slice(start,end))){ //bana
                //이전 조합과 더해서 최솟값인지 확인 
                dp[i] = Math.min(dp[i],dp[i-j]+1)
            }
        }
    }

    return dp[dp.length-1] === Infinity? -1: dp[dp.length-1];
}

```


## 2. 타뷸레이션

- 타뷸레이션 : 상향식 접근법 , 필요한 값들을 미리 계산 

