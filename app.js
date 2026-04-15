let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let contadorVitorias = [0,0,0];
let dificuldadeEscolhida = 1;
let limiteTentativas = 5;


function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial(){
    exibirTextoTela("h1", "Jogo do número secreto");
    exibirTextoTela("p[id=subtitulo]", "Escolha um número entre 1 e " + numeroLimite + ": (Tentativas: " + limiteTentativas + ")");
}

exibirMensagemInicial()

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute < 1 || chute > numeroLimite){
        exibirTextoTela("p[id=subtitulo]","Tentativa inválida!");
        return;
    }

    if(chute == numeroSecreto){
        let palavraTentativas = tentativas > 1? "tentativas" : "tentativa";
        let mensagemTentativas = "Você descobriu o número secreto com " + tentativas + " " + palavraTentativas + "!";
        exibirTextoTela("h1", "Acertou! (" + numeroSecreto + ")");
        exibirTextoTela("p[id=subtitulo]", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");   
        document.getElementById("botao-chute").disabled = true;
        bloquearInput(true);
        limparCampo();
        if(dificuldadeEscolhida == 1){
            contadorVitorias[0]++;
            document.getElementById("medio").removeAttribute("disabled");
        }else if(dificuldadeEscolhida == 2){
            contadorVitorias[1]++;
            document.getElementById("dificil").removeAttribute("disabled");
        }else{
            contadorVitorias[2]++;
        }
        exibirVitorias();
    }else{
        limiteTentativas--;
        if(chute > numeroSecreto){
            exibirTextoTela("p[id=subtitulo]", "O número secreto é menor! (Tentativas restantes: " + limiteTentativas + ")");
        }else{
            exibirTextoTela("p[id=subtitulo]","O número secreto é maior! (Tentativas restantes: " + limiteTentativas + ")");
        }
        tentativas++;
    }

    if (limiteTentativas == 0){
        exibirTextoTela("h1","GAME OVER");
        exibirTextoTela("p[id=subtitulo]","O número era " + numeroSecreto + "! Tente novamente!");
        limparCampo();
        document.getElementById("botao-chute").disabled = true;
        document.getElementById("reiniciar").removeAttribute("disabled");
        bloquearInput(true);
        return;
    }
}

function exibirVitorias(){ 
    exibirTextoTela("p[id=contador-vitorias]","Vitórias - 🟢 Fácil: " + contadorVitorias[0] + "  | 🟡 Médio: " + contadorVitorias[1] + " | 🔴 Difícil: " + contadorVitorias[2] )
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;
    
    if (quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }


    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    definirTentativas();
    exibirMensagemInicial();
    document.getElementById("botao-chute").disabled = false;
    document.getElementById("reiniciar").toggleAttribute("disabled", true);
    tentativas = 1;
    bloquearInput(false);
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function definirDificuldade(dificuldade,numeroMaximo){
    numeroLimite = numeroMaximo;
    listaNumerosSorteados = [];
    dificuldadeEscolhida = dificuldade;

    definirTentativas();

    reiniciarJogo();
}

function definirTentativas() {
    if(dificuldadeEscolhida == 1) limiteTentativas = 5;
    else if(dificuldadeEscolhida == 2) limiteTentativas = 7;
    else limiteTentativas = 10;
}

function bloquearInput(estado){
    document.querySelector('input').disabled = estado;
}

