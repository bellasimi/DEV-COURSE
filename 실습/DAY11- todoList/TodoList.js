//params.$target - 해당 컴포넌트가 추가가 될 dom 엘리먼트
//$가 붙은 개체는 돔 개체임

export default function TodoList({ $target ,initialState }) {//params 대신 
    const $todoList = document.createElement('div');
    $target.appendChild($todoList);

    this.state = initialState;
    //[{text: '공부'}]

    this.setState = (newState) => {
        this.state = newState;
        this.render()
    }

    this.render = () =>{
        $todoList.innerHTML = `
            <ul>
                ${this.state.map(({text}) => `<li>${text}</li>`).join('')}
            </ul>
        `
    }

    this.render();

}