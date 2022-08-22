document.querySelector ("button[type=button]").onclick = iniciarJuego;

let turnoMaquina = [];
let turnoUsuario = [];
let ronda = 0;
actualizarTurno("Toca Iniciar para comenzar a jugar");

function iniciarJuego () {
    document.querySelector ("#turno").className = "alert alert-primary";
    actualizarTurno("Turno de compu!");
    reiniciar ();
    bloquearJugador();
    manejarTurnoMaquina();
}

function reiniciar () {
    turnoMaquina = [];
    turnoUsuario = [];
    ronda = 0;
}

function numeroAleatorio () {
   const $cuadros = document.querySelectorAll (".cuadro")
   const cuadroRandom = Math.floor(Math.random () * $cuadros.length );
   return $cuadros [cuadroRandom];
}

function manejarTurnoMaquina () {
    bloquearJugador();
    actualizarRonda(ronda);
    const valor = numeroAleatorio();
    turnoMaquina.push (valor);
    turnoMaquina.forEach (function (valor, index) {
        const retraso = (index + 1) * 1000;
        setTimeout (function() {resaltar (valor)}, retraso);
    });
    const retrasoJugor = (turnoMaquina.length + 1) * 1000;
    setTimeout (function() {
        desbloquearJugador();
        actualizarTurno("Turno de jugador")
    }, retrasoJugor)
    ronda ++;
    turnoUsuario = [];
}

function manejarTurnoJugador (e) {
    const cuadroJugador = e.target;
    resaltar(cuadroJugador);
    turnoUsuario.push (cuadroJugador);

    const cuadroMaquina = turnoMaquina [turnoUsuario.length -1]
    
    if (cuadroJugador.id !== cuadroMaquina.id) {
       window.alert("Perdiste!!! Vuelve a intentarlo");
       document.querySelector ("#turno").className = "alert alert-danger";
       document.querySelector ("#turno").innerText = "Toca Iniciar para comenzar a jugar";
       document.querySelector ("#ronda").innerText = "Indica #ronda";
       return;
    }

    if (turnoUsuario.length === turnoMaquina.length) {
        bloquearJugador();
        setTimeout (function (){ 
            actualizarTurno("Turno de compu!");
            manejarTurnoMaquina()}
            , 1000)
    }
    
}

function desbloquearJugador () {
    document.querySelectorAll (".cuadro").forEach (function(cuadroMarca) {
    cuadroMarca.onclick = manejarTurnoJugador;
       })
}

function bloquearJugador () {
    document.querySelectorAll (".cuadro").forEach (function(cuadro) {
    cuadro.onclick = function () {}});
}

function resaltar (parametro1) {
    parametro1.style.opacity = 1;
    setTimeout (function () {parametro1.style.opacity=0.5}, 500)
}
   
function actualizarTurno (turno) {
    document.querySelector ("#turno").innerText = turno;
}

function actualizarRonda (ronda) {
    document.querySelector ("#ronda").innerText = `# ${ronda}`;
}
