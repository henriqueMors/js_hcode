class UserController {

    constructor(formId) {

        this.formEl = document.getElementById(formId);


    }

    onSubmit(){


        this.formEl.addEventListener("submit", event => {
    
            event.preventDefault();

            this.getValues();
          
        });        
    }

    getValues() {

        let user = {};

        this.formEl.elements.forEach(function(field, index){ //forEach PERCORRE CAMPOS DE UM OBJETO / EXECUTAR UMA FUNCAO PARA CADA ITEM

            if (field.name == 'gender') {
        
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else {
                user[field.name] = field.value;
            }
        });
    
        return new User (
                        user.name, 
                        user.gender, 
                        user.country, 
                        user.birth, 
                        user.email, 
                        user.password, 
                        user.photo, 
                        user.admin
                        );
    }

}