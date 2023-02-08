var nome = document.querySelector("#exampleInputName");
nome.value = "INSERT NAME"; // A VARIAVEL NOME VIRA UMA REFERENCIA DE OBJETO
nome.style.color = "#ccc" // MANIPULA A APARENCIA DO OBJETO

var fields = document.querySelectorAll('#form-user-create [name]')
var user = {};



console.log(user);

document.getElementById("form-user-create").addEventListener("submit", function(event){
    event.preventDefault();

    fields.forEach(function(field, index){ //forEach PERCORRE CAMPOS DE UM OBJETO / EXECUTAR UMA FUNCAO PARA CADA ITEM

        if (field.name == 'gender') {
    
            if (field.checked) {
                user[field.name] = field.value;
            }
        } else {
            user[field.name] = field.value;
        }
    });

});