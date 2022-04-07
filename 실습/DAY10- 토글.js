function ToggleButton ({$target, text, onClick}) {
    const $button = document.createElement('button')
    $target.appendChild($button)

    let clicks = 0;
  //상태에 따라 렌더링 되도록  
    this.state = {
        clickCount : 0,
        toggled : false
    }

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $button.textContent = text

        $button.style.textDecoration =
            this.state.toggled? 'line-through':'none'
    }

    $button.addEventListener('click',() => {
        clicks+=1;
        this.setState({ 
            clickCount: this.state.clickCount +1,
            toggled: !this.state.toggled
        })
        console.log(this.state.clickCount)

        if(onClick){
            onClick(this.state.clickCount)

        }
        
        if(this.state.clickCount % 3 === 0){
            alert('3번 클릭!')
         }
    })

    this.render()
}

function TimerButton ({$target, text, timer = 2000}) {
    const button = new ToggleButton({$target, text, onClick: () => {
        setTimeout(()=>{
            button.setState({
                ...button.state,
                toggled: !button.state.toggled
            })
        },timer)
    }})
}

const app = document.querySelector('#app')

function ButtonGroup({
    $target,
    buttons
}){
    const $group = document.createElement('div')
    let isInit = false

    this.render = () => {
        if(!isInit) {
            buttons.forEach(({type, ...props}) => {
                if(type === 'toggle'){
                    new ToggleButton({ $target: $group, ...props} )
                }else if (type === 'timer'){
                    new TimerButton({ $target: $group, ...props} )
                }
            })

            $target.appendChild($group)
            isInit = true
        }
    }

    this.render()
}

new ButtonGroup({
    $target: app,
    buttons: [
        {
            type: 'toggle',
            text: '토글버튼'
        },
        {
            type: 'toggle',
            text: '토글버튼2'
        },
        {
            type: 'timer',
            text: '토글버튼2',
            timer: 2000
        }
    ]
})

new ToggleButton({
    $target: app,
    text: '버튼1',
    onClick: (clicks) => {
        if(clicks % 3 === 0 ){
            alert('3번 클릭하지 마!')
        }
    }
})

new ToggleButton({
    $target: app,
    text: '버튼2',
    onClick: (clickCount) => {
        if(clickCount % 2 == 0){
            alert('2번 버튼은 2번 클릭 금지')
        }
    }
})

new TimerButton({
    $target: app,
    text: '2초뒤 토글이 풀림'
})

new TimerButton({
    $target: app,
    text: '5초뒤 토글이 풀림',
    timer: 1000*5
})

/* 돔을 직접 조작하기 보단 상태에 따라 렌더링을 달리해주는 게 좋다. 선언식 프로그래밍은 뭘하는 가에 초점을 둔 코딩방식
 click 수를 세는 변수 하나 만들어서 애드 이벤트 리스너 클릭 때마다 +1 하고 토글 버튼 생성자 함수의 파라미터 
 onClick()함수의 매개변수로 넣고 클릭수에 따른 변화를 주기 보다 

 state 객체 안에 clickCount: 0 이라고 해두고 클릭 애드 이벤트 리스너가 실행될 때 마다         
this.setState({ 
    clickCount: this.state.clickCount +1,
    toggled: !this.state.toggled
})
을 실행해 저 state로 재렌더링 해준다. 

그리고 this.setState 아래서 if(this.state.clickCount 조건문 ) 이라고하면 클릭 수에 대한 조건을 줄 수 있다. 대신 버튼 별로 줄 수는 없기에 원한다면 따로 조건문을 값을 toggleButton의 매개변수로 받자!

*/