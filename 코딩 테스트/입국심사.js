//https://school.programmers.co.kr/tryouts/38309/challenges

/*
로그 시간 = 이진 탐색
times => 선형 로그 시간으로 가능

 특정값을 찾는 게 아냐 - 최소 시간 탐색 => 결정문제!!!!

 이진 탐색 = Parametric Search

 최소 1분에서 10억 *n 사이

 면접관들이 몇명을 처리하는가
 처리 가능한 입국자 n 보다 작다면 분을 올리고 , 입국자가 n보다 크다면 분으로 낮춤

 심사관당 처리 가능한 입국자수 = 시간 / 심사시간
*/

function solution(n,times){

    const sortedTimes = times.sort((a,b)=> a-b);
    let left =1;
    let right = Math.max(times)*n;

    while(left<=right){

        const mid =Math.floor((left+right)/2);
        // sum([시간/심사시간]
        const sum = times.reduce((acc, time) => acc + Math.floor(mid/time))

        if(sum < n) { // 처리가능한 입국자수 < 실제 입국자 수 
            left = mid +1;
        }else{// 처리가능한 입국자수 > 실제 입국자 수 
            right = mid -1;
        }
        
    }
    return left;

}