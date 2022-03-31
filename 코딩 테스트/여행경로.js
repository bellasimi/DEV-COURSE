function solution(tickets){

    let answer = [];
    let stack = [];
    let visited = [];

    tickets.sort()//정렬된 티켓들 -> 알파벳 순

    const len = tickets.length; //티켓수 == 여행횟수 == 도착지 수 

    
    const DFS = (src,cnt) => { //출발지, 여행횟수 == 도착지수

        stack.push(src); //출발지를 스택에 넣어 

        //경로 완성됐다면
        if(cnt === len ){//여행 다 갔으면 끝
            answer = stack;//[ B,D,A,F,A ]
    //DFS의 리턴문
            return true;
        }

        //경로 미완성 티켓 배열 순회
        for(let i =0; i<len;i++){//여행 다니는 중 [ [A-C], [A-F], [B,D], [D-A], [F-A]] 5번
            if(!visited[i] && tickets[i][0] === src){//만약 티켓 안썼고, 티켓의 출발지가 현재값과 같다면? 
                visited[i] = true;//여행 티켓 사용시 방문 true [ false, false, false, false, false ]

                if(DFS(tickets[i][1],cnt+1)){//재귀함수 -- 도착지와 여행횟수 +1로 위의 구문 반복

        //재귀 함수의 결과가 맞으면 ==========================================================================================//
    //재귀 리턴문
        return true;// 이거 안해도 되지 않아? 안하면 통과 못하는 케이스도 있네...??
                    //[A-C] 보다 [A-F]를 먼저가야 되는 경우
                   // DFS(c,3)은 for문 조건을 만족하지 못해서 for문 아래를 실행

                }
                
        //재귀 함수의 결과가 틀리면===========================================================================================//
                //[A-C] 의 경우 
                visited[i] = false;//
            }
        }

        //A-C의 경우 C는 tickets 배열의 src중에 없었기 때문에 
        stack.pop();//stack에서 c 제거 
    //재귀 리턴문    
        return false;//재귀 함수에서 빠져나와서 기존 함수의 남은 for문 마저 돌아 -> [A-F]

    }

    DFS("ICN",0);

    return answer;
}