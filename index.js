//Cria um vetor que inicializa com 9, para sabermos que as casas não foram ciicadas.
var box = [9, 9, 9, 9, 9, 9, 9, 9, 9];
//Variável que indica o jogador da vez : x = 1, O = -1.
var turn = 1;
//Variável que contará a quantidade de cliques dados.
var counterClick = 0;
//Variáveis do placar.
var scoreX = 0, scoreO = 0, scoreV = 0;
var result = "";

//Função que verifica as jogadas.
function verificar(Box) {
    //Verifica de 9 para o jogador da vez.
    if (box[Box] == 9) {
        //Modifica de 9 para o jogador da vez.
        box[Box] = turn;
        //Invertendo o jogador da vez.
        turn*=-1;
        //Se o jogador da vez for 1, insere o X, se não insere O
        if (turn == 1) {
            document.getElementById("casa" + Box).src = "images/xis.jpg";
        } else {
            document.getElementById("casa" + Box).src = "images/bola.jpg";
        }
        counterClick++;
        //Chamar a função que irá conferir se houve ganhador
        Check();
    }
}

function Check() {
    var i;
    //Variável que indicará se houve ganhador.
    var Win = false;
    //Variável que indicará se o jogo acabou (todas as casas clicadas).
    var End = true;
    //Percorre todas as casas para verificar se ainda existe alguma não clicada.
    for (i = 0; i < box.length; i++) {
        if (box[i] == 9) {
            //Se existe casa com 9, é pq ainda existem casas a serem clicadas.
            End = false;
            break;
        }
    }
    //Verifica se a contagem não é 9.
    if (counterClick == 9) {
        End = true;
    }
    //Realiza a soma de cada linha, coluna e diagonais e coloca num vetor.
    var Add = [];
    Add[0] = box[0] + box[1] + box[2]; //Soma da linha 1.
    Add[1] = box[3] + box[4] + box[5]; //Soma da linha 2.
    Add[2] = box[6] + box[7] + box[8]; //Soma da linha 3.
    Add[3] = box[0] + box[3] + box[6]; //Soma da coluna 1.
    Add[4] = box[1] + box[4] + box[7]; //Soma da coluna 2.
    Add[5] = box[2] + box[5] + box[8]; //Soma da coluna 3.
    Add[6] = box[0] + box[4] + box[8]; //Soma da diagonal 1.
    Add[7] = box[2] + box[4] + box[6]; //Soma da diagonal 2.

    //Percore todos os valores de soma procurando 3 ou -3.
    for (i = 0; i < Add.length; i++) {
        //Se achou -3 é porque bola ganhou.
        if (Add[i] == 3) {
            Win = true;
            result = "O ganhou!!!";
            scoreO++;
            document.getElementById("O").innerHTML = "Score O: " + scoreO;
            break;
        } else if (Add[i] == -3) {
            Win = true;
            result = "X ganhou!!!";
            scoreX++;
            document.getElementById("X").innerHTML = "Score X: " + scoreX;
            break;
        }
    }
    //Se nem O e nem X ganharam, mas o jogo acabou é porque deu Velha.
    if (Win == false && End == true) {
        result = "Deu Velha!!!";
        scoreV++;
        document.getElementById("V").innerHTML="Score Velha: " + scoreV;
    }
    //Se Alguém ganhou ou o jogo acabou.
    if(Win || End){
        //Desabilita todas as casas para não serem.
        for(i = 0; i < box.length; i++){
            document.getElementById("casa" + i).disabled = true;
            box[i] = 0;
        }
        //Exibe os resultados.
        document.getElementById("result-winner").innerText = "Resposta: " + result;
    }
}

function NewGame(){
    for(i = 0; i < box.length; i++){
        //Habilita todas as casas.
        document.getElementById("casa" + i).disable = false;
        //Remove as imagens.
        document.getElementById("casa" + i).src = " ";
        //Restaura os 9 nas casas.
        box[i] = 9;
        //Inicializa as variáveis.
        Win = false;
        End = true;
        counterClick = 0;
        turn = 1;
    }
}
