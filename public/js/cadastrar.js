function submit(event) {
    event.preventDefault();
    console.log('submit');
    cadastrar();
}

function cadastrar() {
    fetch('/cadastrar', {
        method: 'POST',
        body: 'Teste'
    }).then(res => console.log(res));
}
