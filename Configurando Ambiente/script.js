var nome = document.querySelector("#exampleInputName");
nome.value = "INSERT NAME"; // A VARIAVEL NOME VIRA UMA REFERENCIA DE OBJETO
nome.style.color = "red" // MANIPULA A APARENCIA DO OBJETO

var gender = document.querySelectorAll('#form-user-create [name=gender]:checked') // UTILIZANDO UM METODO SELETOR / INPUT
var birth = document.querySelector('#exampleInputBirth')
var country = document.querySelector('#exampleInputCountry')
var email = document.querySelector('#exampleInputEmail')
var password = document.querySelector('#exampleInputPassword')
var photo = document.querySelector('#exampleInputFile')
var admin = document.querySelector('#exampleInputAdmin')

var fields = document.querySelectorAll('#form-user-create [name]')
fields.forEach(function(fields, index){ //foreach PERCORRE CAMPOS DE UM OBJETO / EXECUTAR UMA FUNCAO PARA CADA ITEM

    if (field.name == 'gender') {

        if (field.checked) {
            console.log('sim, field')
        }
    } else {
        console.log('nao')
    }
});