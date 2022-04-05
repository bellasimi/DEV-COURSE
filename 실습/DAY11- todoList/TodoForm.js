export default function TodoForm({ $target, onSubmit }){
    const $form = document.createElement('form')
    $target.appendChild($form);
    
    let isInit = false

    this.render = () => {
        $form.innerHTML = `
            <input type = "text" name = "todo" />
            <button>Add</button>
            <p>
            <input type = "text" name = "name" />
            <button id="save" type = "button" >save</button>
            <button id="remove" type = "button" >remove</button>
        `

        if(!isInit){
            $form.addEventListener('submit', e => {
                e.preventDefault()

                const $input = $form.querySelector('input[name=todo]')
                const text = $input.value
                //console.log(text)이값을 여기서 TodoList에 직접 넣으면 의존성이 너무 강해져, 분리
                //생성 파라미터에 이벤트 콜백 넣고, text를 해당 콜백으로 넘겨줌!

                if(text.length>1){
                    $input.value =''
                    onSubmit(text)//TodoForm 입장에선 onSubmit 관심 없고 걍 실행해줌
                }
                
            })
            isInit = true
        }

    }

    this.render();
    
}
