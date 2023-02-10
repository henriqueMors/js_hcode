class UserController {

    constructor(formId) {

        this.formEl = document.getElementById(formId);


    }

    getValues() {

        fields.forEach(function(field, index){ //forEach PERCORRE CAMPOS DE UM OBJETO / EXECUTAR UMA FUNCAO PARA CADA ITEM

            if (field.name == 'gender') {
        
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else {
                user[field.name] = field.value;
            }
        });
    
        var objectUser = new User(
                                    user.name, 
                                    user.gender, 
                                    user.country, 
                                    user.birth, 
                                    user.email, 
                                    user.password, 
                                    user.photo, 
                                    user.admin
                                );
    
        addLine(objectUser);

    }

}