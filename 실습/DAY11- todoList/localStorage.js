const storedName = localStorage.getItem('name')|| ''

if(storedName){
    document.querySelector('input[name=name]').value = storedName
}

document.querySelector('#save').addEventListener('click', () =>{
    console.log('???')
    localStorage.setItem('name', document.querySelector('input[name=name]').value)
})

document.querySelector('#remove').addEventListener('click', () => {
    localStorage.removeItem('name')
})