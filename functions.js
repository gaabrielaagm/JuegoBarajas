//VARIABLES GLOBALES
var baraja;
var barajacopy;
var score_usr;
var score_maq;
//var cartas = new Array(21);  
var cartas_usr = [];
var cartas_maq = [];
var usr_termino;
var maq_termino;

function inicio(){
    
    baraja = [
        ["A","p",[1,10]], ["2","p",2], ["3","p",3], ["4","p",4], ["5","p",5], 
        ["6","p",6], ["7","p",7],["8","p",8], ["9","p",9], ["10","p",10],
        ["J","p",10], ["Q","p",10], ["K","p",10],

        ["A","c",[1,10]], ["2","c",2], ["3","c",3], ["4","c",4], ["5","c",5], 
        ["6","c",6], ["7","c",7], ["8","c",8], ["9","c",9], ["10","c",10],
        ["J","c",10], ["Q","c",10], ["K","c",10],

        ["A","t",[1,10]], ["2","t",2], ["3","t",3], ["4","t",4], ["5","t",5], 
        ["6","t",6], ["7","t",7], ["8","t",8], ["9","t",9], ["10","t",10],
        ["J","t",10], ["Q","t",10], ["K","t",10],

        ["A","d",[1,10]], ["2","d",2], ["3","d",3], ["4","d",4], ["5","d",5], 
        ["6","d",6], ["7","d",7], ["8","d",8], ["9","d",9], ["10","d",10],
        ["J","d",10], ["Q","d",10], ["K","d",10]
    ];
    
    barajacopy = baraja;
    score_usr = 0;
    score_maq = 0;

    usr_termino = false;
    maq_termino = false;
    /*
    imprimir();
    */

    //PRIMERAS DOS CARTAS PARA USUARIO Y MAQUINA
    generarCartas();
    generarCartas();

    
    document.getElementById("repartir").disabled = "true";
/*    
    document.getElementById("nueva_carta").disabled = "false";
    document.getElementById("listo").disabled = "false";
    document.getElementById("reiniciar").disabled = "false";
*/
}

//Imprimir baraja completa
function imprimir(){
    for(i = 0; i < baraja.length; i++){
        for(j = 0; j < 3; j++){
            document.write('['+baraja[i][j]+']');
        }
        document.write('<br>')
    }
}

//Imprimir cartas del usuario
function imprimirCartas(){
    alert("ENTRE");
    for(i = 0; i < cartas.length; i++){
        for(j = 0; j < 3; j++){
            document.write('['+cartas[i][j]+']');
        }
        document.write('<br>');
    }
}


//Nueva carta Usuario
function nuevaCartaUsuario(){
    if(usr_termino == false){ //Si el usuario aún no termina de tomar cartas o aún no aprieta el boton de listo!
        //OBTIENE EL RANDOM
        var random = Math.floor(Math.random() * (baraja.length));
        //alert(random);
    /*
        var tamarray = cartas.length;
        cartas.
        cartas[0] = baraja[random];
        alert(cartas[tamarray]+" "+tamarray );
        imprimirCartas();
    */
        //AÑADE A LAS CARTAS QUE EL USUARIO LLEVA
        cartas_usr.push(baraja[random]);

        //MUESTRA LA CARTA NUEVA RANDOM
        var current_name = baraja[random][0];
        var current_type = baraja[random][1];
        var current_value = baraja[random][2];
        
        //SI LE TOCO EL AS
        if(current_name == "A"){
            if((score_usr+10) <= 21){ //Si As vale 10
                current_value = 10;   //El as vale 10
            }else{                    //El as vale 1
                current_value = 1; 
            }
        }

        var choise = "USUARIO: Name: " + current_name + " Type: " + current_type + " Value: " + current_value;
        document.getElementById("cartas_usuario").innerHTML = choise;
        alert(choise);

        //SUMA LOS PUNTOS 
        score_usr = parseInt(score_usr, 10) + parseInt(current_value, 10);
        document.getElementById("score_usuario").innerHTML = "Puntos: " + score_usr;

        //ELIMINAR DE LA BARAJA
        //alert(barajacopy.length);
        var elementoEliminado = baraja.splice(random,1);
        //alert("Eliminado: " + elementoEliminado);
        //alert(barajacopy.length);

        //nuevaCartaMaquina();
    }
}

//Nueva carta Maquina
function nuevaCartaMaquina(){
    if(maq_termino == false){ //SI LA MAQUINA AUN NO TERMINA DE TOMAR CARTAS
        //OBTIENE EL RANDOM
        var random = Math.floor(Math.random() * (baraja.length));
        //alert(random);

        //AÑADE A LAS CARTAS QUE EL USUARIO LLEVA
        cartas_maq.push(baraja[random]);

        //MUESTRA LA CARTA NUEVA RANDOM
        var current_name = baraja[random][0];
        var current_type = baraja[random][1];
        var current_value = baraja[random][2];

        //SI LE TOCO EL AS
        if(current_name == "A"){
            if((score_maq+10) <= 21){ //Si As vale 10
                current_value = 10;   //El as vale 10
            }else{                    //El as vale 1
                current_value = 1; 
            }
        }

        var choise = "MAQUINA: Name: " + current_name + " Type: " + current_type + " Value: " + current_value;
        document.getElementById("cartas_maquina").innerHTML = choise;
        alert(choise);

        //SUMA LOS PUNTOS 
        score_maq = parseInt(score_maq, 10) + parseInt(current_value, 10);
        document.getElementById("score_maquina").innerHTML = "Puntos: " + score_maq;

        //ELIMINAR DE LA BARAJA
        //alert(baraja.length);
        var elementoEliminado = baraja.splice(random,1);
        //alert("Eliminado: " + elementoEliminado);
        //alert(baraja.length);
    }
}

function generarCartas(){
    nuevaCartaUsuario();
    revisarPuntaje();
    nuevaCartaMaquina();
    revisarPuntaje();        
}

function usuarioTermina(){
    document.getElementById("nueva_carta").disabled = "true";
    document.getElementById("listo").disabled = "true";
    document.getElementById("repartir").disabled = "true";

    usr_termino = true;
    revisarPuntaje();
    for(i=0;i<21;i++){
        if(maq_termino == false){
            nuevaCartaMaquina();
            revisarPuntaje();
        }
    }
}

function reiniciar(){
    var baraja;
    var barajacopy;
    var score_usr = 0;
    var score_maq = 0;
    var cartas_usr = [];
    var cartas_maq = [];
    inicio();
}

function revisarPuntaje(){
    
    if(score_usr == 21 && score_maq != 21){
        document.write("<h2>USR VS MAQUI</h2><br><h1>",score_usr," vs ",score_maq,
                        "</h1><h2>HAS GANADO, VUELVE A CARGAR LA PAGINA<h2>");
    }else{
        if(score_usr > 21){
            document.write("<h2>USR VS MAQUI</h2><br><h1>",score_usr," vs ",score_maq,
                            "<h2>HAS PERDIDO, VUELVE A CARGAR LA PAGINA<h2>");
        }
    }
    
    if(score_maq == 21){
        document.write("<h2>USR VS MAQUI</h2><br><h1>",score_usr," vs ",score_maq,
                        "<h2>HAS PERDIDO, (LA MAQUINA TE GANO) VUELVE A CARGAR LA PAGINA<h2>");
    }else{
        if(score_maq > 21 && score_usr != 21){
            document.write("<h2>USR VS MAQUI</h2><br><h1>",score_usr," vs ",score_maq,
                            "<h2>HAS GANADO, (LA MAQUINA PERDIO) VUELVE A CARGAR LA PAGINA<h2>");
        }else{
            if(score_maq >= 18 && score_maq < 21){
                maq_termino = true;
                if(usr_termino == true){
                    document.write("<h2>USR VS MAQUI</h2><br><h1>",score_usr," vs ",score_maq,
                        "<h2>HAS PERDIDO, (LA MAQUINA TE GANO) VUELVE A CARGAR LA PAGINA<h2>");
                }
            }
        }
    }

    //EMPATE
    if(score_maq == score_usr && usr_termino == true && maq_termino == true){
        document.write("<h2>USR VS MAQUI</h2><br><h1>",score_usr," vs ",score_maq,
                            "<h2>EMPATE!<h2>");
    }
}