// MVC - ANTIGAMENTE OS DADOS ERAM TODOS AGRUPADOS EM UM LUGAR SÓ, MVC CHEGOU PARA ORGANIZAR
//MODEL - TRATA OS DADOS, VERIFICA SE O USER TEM PERMISSÃO
//VIEW - INTERFACE INTERAGIVEL
//CONTROLLER - REGRAS DE CONTROLE

class CalcController { //PRIMEIRA LETRA DA CLASSE SEMPRE MAIUSCULA - PASCAL CASE

    constructor(){ //VARIAVEIS E FUNÇÕES QUE AGORA SE CHAMAM ATRIBUTOS E MÉTODOS
        this._audio = new Audio('click.mp3'); //THIS FAZ A REFERENCIA AO OBJETO, É COMO SE FOSSE UM VAR/LET, MAS É UM ATRIBUTO
        this._lastOperator = ''; // O underline É UMA FORMA DE EMCAPSULAMENTO (PRIVATE), PROTEGER OS DADOS
        this._lastNumber = '';
        this._operation = []; //É UM ARRAY QUE VAI GUARDAR A OPERAÇÃO
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display'); // QUERYSELECTOR PARA SELECIONAR ITEM COMO O GETELEMENT
        this._dateEl = document.querySelector('#date');
        this._timeEl = document.querySelector('#hour');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    pasteFromClipboard() { //MÉTODO PARA COLAR         

        document.addEventListener('paste', e => {
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        })

    }

    copyToClipboard(){ //MÉTODO PARA UTILIZAR O COPIA 

        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove();

    }

    initialize(){ // RECEBE TODAS AS FUNÇOES INICIAIS

        this.setDisplayDateTime(); //A HORA VAI AQUI PARA JÁ INICIAR AO CCARREGAR A CALC
        
        setInterval(() => { // SETINTERVAL FAZ EXECUTAR ALGO DE FORMA INTERMITENTE

            this.setDisplayDateTime();
            
        }, 1000); // ESSE É O PARAMENTRO DE MILISEGUNDOS

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        document.querySelectorAll('.btn-ac').forEach(btn => {
            btn.addEventListener('dblclick', e => {
                this.toggleAudio();
            })
        })

    }

    // settimeout faz o método parar a partir de um determinado tempo

    toggleAudio(){ // FORMA CONDICIONAL PARA AUDIO

        this._audioOnOff = !this._audioOnOff // CONDICIONAL 
    }

    playAudio(){ // AUDIO A SER TOCADO E O TEMPO ESTIMADO PARA REINICIAR

        if (this._audioOnOff) {
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }

    initKeyboard() { // EVENTO DE ESCUTA / RECOHECIMENTO DE DIGITAÇÃO DE TECLADO 

        document.addEventListener('keyup', e=>{
            this.playAudio();
            switch (e.key) {

                case 'Escape':
                    this.clearAll();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;
    
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(e.key);
                    break;
    
                case 'Enter':
                case '=':
                    this.calc();
                    break;
    
                case '.':
                case ',':    
                    this.addDot('.');
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard(); // CAS0 O CTRL SEJA ACIONADO
                    break;
                
            }
        });

    }

    addEventListenerAll(element, events, fn){ // SÃO ESCUTAS DE EVENTO `MOUSE, TECLADO`

        events.split(' ').forEach(event  => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll(){ //FAZ LIMPEZA DA TELA E RETORNA OS VALORES INICIAIS

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry(){ //FAZ A LIMPEZA DO ULTIMO NUMERO DIGITADO

        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation() { // BUSCA A ULTIMA OPERAÇÃO COM NUMERO / ULTIMO ITEM DO ARRAY

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value){ //CONCATENANDO OS NUMEROS

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) { //

        return (['+', '-', '*', '%', '/'].indexOf(value) > - 1); // O INDEX FAZ A VALIDAÇÃO DE OPERADOR

    }

    pushOperation(value){

        this._operation.push(value);//MÉTODO PUSH ADICIONA MAIS UM ARRAY NA ULTIMA POSICAO

        if (this._operation.length > 3) {

            this.calc();

        }
    }

    getResult(){ 
        try{
        return eval(this._operation.join(''));
        } catch (e) {
            setTimeout(()=>{
                this.setError();
            }, 1);

        }
    }

    calc(){ //MÉTODO DE CALCULO JUNTANDO OS ARRAYS 

        let last = '';
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        if (last == '%') {

            result /= 100;

            this._operation = [result]

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){
        let lastItem;
        for (let i = this._operation.length - 1; i >= 0; i--){
            
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
                }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value){ // CONCATENANDO NUMEROS E VALIDANDO NAN

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) { // CASO OCORRA TROCA DE OPERADOR

                this.setLastOperation(value); // ATUALIZA O NUMERO NO DISPLAY CASO ELE NAO SEJA UM OPERADOR

            } else {
                
                this.pushOperation(value);
                this.setLastNumberToDisplay();
                
            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                this.setLastNumberToDisplay();

            }

        }

    }

    setError(){ // PARA RETORNAR A MSG DE ERRO

        this.displayCalc = 'ERROR';

    }

    addDot() {
        let lastOperation = this.getLastOperation();

        if ( typeof lastOperation === 'string' && lastOperation.split("").indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
                this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    execBtn(value) { //VAI SERVIR PARA INFORMAR A FUNÇÃO DE CADA BOTAO
            this.playAudio();
        switch (value) { //SWITCH ANALISA AS CONDIÇOES E EXCECUTA UM CASO

            case 'ac':
                this.clearAll();
                break; //EXECUTA O CLEARALL E PARA DE RODAR O PROGRAMA

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value)); //
                break;

            default: //SERVE ONDE FORAM EXECUTADOS OS CASOS E NENHUMA CONDIÇÃO FOI ENCONTRADA
                this.setError();
                break;
            
        }
    }

    initButtonsEvents(){ // EVENTOS DE BOTOES EM TELA

        let buttons = document.querySelectorAll('#buttons > g, #parts > g'); // QUERYSELECTORALL SELECIONA TODOS OS G`S QUE ESTÃO DENTRO DE BUTTONS
            
            buttons.forEach((btn, index) => { //FOREACH SIGF PARA CADA, É UM LAÇO PARA PERCORRER OS PARAMETROS
                this.addEventListenerAll(btn, 'click drag', e => { // MÉTODO PARA MANIPULAR MULTIPLOS EVENTOS
                    let textBtn = btn.className.baseVal.replace('btn-','');// REPLACE = SUBSTITUA
                    this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => { 
                btn.style.cursor = 'pointer';
            })

        });
    }

    setDisplayDateTime(){ //TRABALHANDO COM DATAS 'dir(new Date)' NO CONSOLE TE RETORNA TODAS AS FUNÇÕES

        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: '2-digit',
            month: 'short',
            year: '2-digit'
        });// APÓS ABRIR CHAVES, VOCE PODE FORMATAR DATA E HORA
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime(){

        return this._timeEl.innerHTML; // INNERHTML VAI FAZER ALTERAÇÃO NO CONTEUDO DE UMA HTML

    }

    set displayTime(value){

        return this._timeEl.innerHTML = value;

    }

    get displayDate(){

        return this._dateEl.innerHTML;

    }

    set displayDate(value){

        return this._dateEl.innerHTML = value;

    }

    get displayCalc(){ // MÉTODO GETTERS - RETORNA O VALOR DO ATRIBUTO ENCAPSULADO

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value){ // MÉTODO SETTERS - AUTORIZA A ALTERAÇÃO DO ATRIBUTO / ATRIBUI VALOR

        if (value.toString().length > 10) {
            this.setError();
            return false
        }

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate(){ //GETTER NAO TEM VALOR, MAS TEM RETURN

        return new Date();

    }

    set currentDate(value){ // SETTER TEM VALOR, MAS NAO TEM RETURN

        this._currentDate = value;

    }

}