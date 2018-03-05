//VARIABLES GLOBALES
var baraja;
var barajacopy;
var score_usr;
var score_banca;
//var cartas = new Array(21);  
var cartas_usr = [];
var cartas_banca = [];
var usr_termino;
var banca_termino;

var cartaOculta_nom;
var cartaOculta_tipo;
var cartaOculta_valor;

function inicio(){
    baraja = [
        ["A","p",[1,11]], ["2","p",2], ["3","p",3], ["4","p",4], ["5","p",5], 
        ["6","p",6], ["7","p",7],["8","p",8], ["9","p",9], ["10","p",10],
        ["J","p",10], ["Q","p",10], ["K","p",10],

        ["A","c",[1,11]], ["2","c",2], ["3","c",3], ["4","c",4], ["5","c",5], 
        ["6","c",6], ["7","c",7], ["8","c",8], ["9","c",9], ["10","c",10],
        ["J","c",10], ["Q","c",10], ["K","c",10],

        ["A","t",[1,11]], ["2","t",2], ["3","t",3], ["4","t",4], ["5","t",5], 
        ["6","t",6], ["7","t",7], ["8","t",8], ["9","t",9], ["10","t",10],
        ["J","t",10], ["Q","t",10], ["K","t",10],

        ["A","d",[1,11]], ["2","d",2], ["3","d",3], ["4","d",4], ["5","d",5], 
        ["6","d",6], ["7","d",7], ["8","d",8], ["9","d",9], ["10","d",10],
        ["J","d",10], ["Q","d",10], ["K","d",10]
    ];
    
    barajacopy = baraja;
    score_usr = 0;
    score_banca = 0;

    usr_termino = false;
    banca_termino = false;
    /*
    imprimir();
    */

    //PRIMERAS DOS CARTAS PARA USUARIO Y MAQUINA
    generarCartasUsuario();
    generarCartasUsuario();

    generarCartasBanca("normal");
    generarCartasBanca("oculta");

    
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

        //AÑADE A LAS CARTAS QUE EL USUARIO LLEVA
        cartas_usr.push(baraja[random]);

        //MUESTRA LA CARTA NUEVA RANDOM
        var current_name = baraja[random][0];
        var current_type = baraja[random][1];
        var current_value = baraja[random][2];
        
        //SI LE TOCO EL AS
        if(current_name == "A"){
            if((score_usr+11) <= 21){ //Si As vale 10
                current_value = 11;   //El as vale 10
            }else{                    //El as vale 1
                current_value = 1; 
            }
        }

        var choise = "USUARIO: Name: " + current_name + " Type: " + current_type + " Value: " + current_value;
        var nuevaCarta = document.createElement("img");
        var src = "Baraja/"+current_name+current_type+".png";
        nuevaCarta.src=src;
        document.getElementById("cartas_usr").appendChild(nuevaCarta);

        //document.getElementById("cartas_usuario").innerHTML = choise;
        //alert(choise);

        //SUMA LOS PUNTOS 
        score_usr = parseInt(score_usr, 10) + parseInt(current_value, 10);
        document.getElementById("score_usuario").innerHTML = "Puntos: " + score_usr;

        //ELIMINAR DE LA BARAJA
        //alert(barajacopy.length);
        var elementoEliminado = baraja.splice(random,1);
        //alert("Eliminado: " + elementoEliminado);
        //alert(barajacopy.length);

        //nuevaCartaBanca();
    }
}

//Nueva carta Banca
function generarCartasBanca(tipoCarta){
    if(banca_termino == false){ //SI LA BANCA AUN NO TERMINA DE TOMAR CARTAS
        //OBTIENE EL RANDOM
        var random = Math.floor(Math.random() * (baraja.length));
        //alert(random);

        //AÑADE A LAS CARTAS QUE EL USUARIO LLEVA
        cartas_banca.push(baraja[random]);

        //MUESTRA LA CARTA NUEVA RANDOM
        var current_name = baraja[random][0];
        var current_type = baraja[random][1];
        var current_value = baraja[random][2];

        //SI LE TOCO EL AS
        if(current_name == "A"){
            if((score_banca+11) <= 21){ //Si As vale 11
                current_value = 11;   //El as vale 11
            }else{                    //El as vale 1
                current_value = 1; 
            }
        }

        var choise = "BANCA: Name: " + current_name + " Type: " + current_type + " Value: " + current_value;
        var nuevaCarta = document.createElement("img");
        var src = "";
        if(tipoCarta == "oculta"){
            src = "Baraja/cartaOculta.png";
            id = "cartaOculta";
            cartaOculta_nom = current_name;
            cartaOculta_tipo = current_type;
            cartaOculta_valor = current_value;
        }else{
            src = "Baraja/"+current_name+current_type+".png";
            id = "";
        }       
        nuevaCarta.src = src;
        nuevaCarta.id = id;
        document.getElementById("cartas_banca").appendChild(nuevaCarta);
        //document.getElementById("cartas_maquina").innerHTML = choise;
        //alert(choise);

        //SUMA LOS PUNTOS 
        score_banca = parseInt(score_banca, 10) + parseInt(current_value, 10);
        document.getElementById("score_banca").innerHTML = "Puntos: " + score_banca;

        //ELIMINAR DE LA BARAJA
        //alert(baraja.length);
        var elementoEliminado = baraja.splice(random,1);
        //alert("Eliminado: " + elementoEliminado);
        //alert(baraja.length);
    }
}

function generarCartasUsuario(){
    nuevaCartaUsuario();
    revisarPuntaje();
    //nuevaCartaBanca();
    //revisarPuntaje();        
}

function usuarioTermina(){
    var cartaOculta = document.getElementById("cartaOculta");
    cartaOculta.src = "Baraja/Ap.png";
    usr_termino = true;
    revisarPuntaje();
    if(score_banca < 17){
        generarCartasBanca();
    }
    banca_termino = true;
    revisarPuntaje();
}

function reiniciar(){
    var baraja;
    var barajacopy;
    var score_usr = 0;
    var score_banca = 0;
    var cartas_usr = [];
    var cartas_banca = [];
    inicio();
}

function mostrarCartaOculta(){
    var cartaOculta = document.getElementById("cartaOculta");
    cartaOculta.src = "Baraja/Ap.png";
}

function revisarPuntaje(){
    
    if(score_usr == 21 && score_banca != 21){
        //confirm("USR VS BANCA "+score_usr+" vs "+score_banca+" HAS GANADO, VUELVE A CARGAR LA PAGINA ");
        mostrarCartaOculta();
        window.open("https://www.argar.cat", "Diseño Web", "width=300, height=200");
    }else{
        if(score_usr > 21){
            mostrarCartaOculta();
            //confirm("USR VS BANCA "+score_usr+" vs "+score_banca+" HAS PERDIDO, VUELVE A CARGAR LA PAGINA");
            window.open("https://www.argar.cat", "Diseño Web", "width=300, height=200");
        }
    }
    
    if(score_banca == 21 && score_usr != 21){
        mostrarCartaOculta();
        //confirm("USR VS BANCA "+score_usr+" vs "+score_banca+" HAS PERDIDO, (LA MAQUINA TE GANO) VUELVE A CARGAR LA PAGINA");
        window.open("https://www.argar.cat", "Diseño Web", "width=300, height=200");
    }else{
        if(score_banca > 21 && score_usr != 21){
            mostrarCartaOculta();
            //confirm("USR VS BANCA "+score_usr+" vs "+score_banca+" HAS GANADO, (LA MAQUINA PERDIO) VUELVE A CARGAR LA PAGINA");
            window.open("https://www.argar.cat", "Diseño Web", "width=300, height=200");
        }else{
            if(score_banca >= 18 && score_banca < 21){
                banca_termino = true;
                if(usr_termino == true){
                    mostrarCartaOculta();
                    //confirm("USR VS BANCA "+score_usr+" vs "+score_banca+" HAS PERDIDO, (LA MAQUINA TE GANO) VUELVE A CARGAR LA PAGINA");
                    window.open("https://www.argar.cat", "Diseño Web", "width=300, height=200");
                }
            }
        }
    }

    //EMPATE
    if(score_banca == score_usr && usr_termino == true && banca_termino == true){
        //confirm("USR VS BANCA "+score_usr+" vs "+score_banca+" EMPATE! ");
        window.open("https://www.argar.cat", "Diseño Web", "width=300, height=200")
    }
}