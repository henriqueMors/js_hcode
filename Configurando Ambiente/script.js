var nome = document.querySelector("#exampleInputName");
nome.value = "INSERT NAME"; // A VARIAVEL NOME VIRA UMA REFERENCIA DE OBJETO
nome.style.color = "#ccc" // MANIPULA A APARENCIA DO OBJETO

var gender = document.querySelectorAll('#form-user-create [name=gender]:checked') // UTILIZANDO UM METODO SELETOR / INPUT
var birth = document.querySelector('#exampleInputBirth')
var country = document.querySelector('#exampleInputCountry')
var email = document.querySelector('#exampleInputEmail')
var password = document.querySelector('#exampleInputPassword')
var photo = document.querySelector('#exampleInputFile')
var admin = document.querySelector('#exampleInputAdmin')

var fields = document.querySelectorAll('#form-user-create [name]')
var user = {};

fields.forEach(function(field, index){ //forEach PERCORRE CAMPOS DE UM OBJETO / EXECUTAR UMA FUNCAO PARA CADA ITEM

    if (field.name == 'gender') {

        if (field.checked) {
            user.gender
        }
    } else {
        user[field.name] = field.value;
    }
});

console.log(user);