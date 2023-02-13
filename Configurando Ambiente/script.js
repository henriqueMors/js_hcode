/*var nome = document.querySelector("#exampleInputName");
nome.value = "INSERT NAME"; // A VARIAVEL NOME VIRA UMA REFERENCIA DE OBJETO
nome.style.color = "#ccc" // MANIPULA A APARENCIA DO OBJETO
*/
var fields = document.querySelectorAll('#form-user-create [name]')
var user = {};

function addLine(dataUser) {

    console.log(dataUser)

        document.getElementById('table-users').innerHTML = 
            `<tr>
                <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>`;

}

