function solution(numbers) {
    const answer = numbers.map(n => String(n)).sort((a,b) => (b+a)-(a+b)).join('');
    return answer[0] == '0'? '0':answer; // 0000이 나오는 걸 방지하기 위해서 
}