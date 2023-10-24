//  Array de cartas
let cartas = [
  "01oros.jpg",
  "02oros.jpg",
  "03oros.jpg",
  "04oros.jpg",
  "05oros.jpg",
  "06oros.jpg",
  "07oros.jpg",
  "10oros.jpg",
  "11oros.jpg",
  "12oros.jpg",
  "01bastos.jpg",
  "02bastos.jpg",
  "03bastos.jpg",
  "04bastos.jpg",
  "05bastos.jpg",
  "06bastos.jpg",
  "07bastos.jpg",
  "10bastos.jpg",
  "11bastos.jpg",
  "12bastos.jpg",
  "01espadas.jpg",
  "02espadas.jpg",
  "03espadas.jpg",
  "04espadas.jpg",
  "05espadas.jpg",
  "06espadas.jpg",
  "07espadas.jpg",
  "10espadas.jpg",
  "11espadas.jpg",
  "12espadas.jpg",
  "01copas.jpg",
  "02copas.jpg",
  "03copas.jpg",
  "04copas.jpg",
  "05copas.jpg",
  "06copas.jpg",
  "07copas.jpg",
  "10copas.jpg",
  "11copas.jpg",
  "12copas.jpg",
];

// Para añadir las cartas
let jugador_visor = document.getElementById("jugador_visor");
let maquina_visor = document.getElementById("maquina_visor");

// Textos de salida
let jugador_titulo = document.getElementById("jugador_titulo");
let maquina_titulo = document.getElementById("maquina_titulo");

// Botones
let pedir = document.getElementById("pedir");
let plantarse = document.getElementById("plantarse");
let nueva_partida = document.getElementById("nueva_partida");

// Variables globales para guardar la jugada del jugador y de la máquina
let jugada = 0;
let jugadaJugador = 0;


// Funciones

//Realizo el barajeo de las cartas del array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function barajarCartas(cartas) {
  cartas.sort(() => Math.random() - 0.5);
  plantarse.disabled=true;
  shuffle(cartas);
  console.log(cartas)

}

//Cuando el usuario pide la carta mostrarla
function pedirCarta() {
  plantarse.disabled=false;
  let random = Math.floor(Math.random() * cartas.length)
  let cartagenerada = cartas[random];
  console.log(cartagenerada);


  jugador_visor.appendChild(document.createElement("img")).src =
    './imagenes/' + cartagenerada;

  // Extraer el número de la carta usando una expresión regular
  let numeroCarta = parseInt(cartagenerada.match(/\d+/)[0]);
  jugadaJugador += (numeroCarta >= 10) ? 0.5 : numeroCarta;
  jugador_titulo.textContent = jugadaJugador;

  // Verificar si la jugadaJugador supera 7 y deshabilitar el botón "Pedir"
  if (jugadaJugador > 7) {

    jugador_titulo.textContent = "Has perdido porque tienes " + jugadaJugador;
    pedir.disabled = true;
    plantarse.disabled = true;
    nueva_partida.style.display = "block";
  }

}

// Cuando el usuario se plante mostrar las cartas de la maquina
function finJugador() {
  while(jugada<7 && jugada<jugadaJugador){
  
    let random=Math.floor(Math.random() * cartas.length);
    let cartagenerada = cartas[random];
    maquina_visor.appendChild(document.createElement("img")).src =
    './imagenes/' + cartagenerada;
    let numeroCarta = parseInt(cartagenerada.match(/\d+/)[0]);
  jugada += (numeroCarta >= 10) ? 0.5 : numeroCarta;
  };
  

  // Verificar si la jugadaJugador supera 7 y deshabilitar el botón "Pedir"
  if (jugada > 7) {
    jugador_titulo.textContent = "Has ganado";
    maquina_titulo.textContent = "Pierde porque tiene mas de 7"

    pedir.disabled = true;
    plantarse.disabled = true;

  }

  if (jugada <= 7 && jugada > jugadaJugador) {
    maquina_titulo.textContent = "Gana la maquina porque tiene " + jugada;
    nueva_partida.style.display = "block";
    pedir.disabled = true;
    plantarse.disabled = true;
    jugador_titulo.textContent = "Has perdido"
  }

  if (jugada <= 7 && jugada < jugadaJugador) {
    maquina_titulo.textContent = +jugada + "Pierde";
    nueva_partida.style.display = "block";
    pedir.disabled = true;
    plantarse.disabled = true;
    jugador_titulo.textContent = +jugadaJugador + "Has ganado"

  }

  nueva_partida.style.display = "block";
}

// Cuando el usuario inicia una nueva partida
function reiniciarJuego() {
  // Restablecer las variables globales y limpiar visores
  jugada = 0;
  jugadaJugador = 0;
  jugador_titulo.textContent = "";
  maquina_titulo.textContent = "";
  jugador_visor.innerHTML = "";
  maquina_visor.innerHTML = "";

  // Habilitar los botones
  pedir.disabled = false;
  plantarse.disabled = false;
  nueva_partida.style.display = "none";

  // Barajar cartas para una nueva partida
  barajarCartas(cartas);
}

// Eventos
document.addEventListener("DOMContentLoaded", barajarCartas(cartas));
pedir.addEventListener("click", pedirCarta);
plantarse.addEventListener("click", finJugador);
nueva_partida.addEventListener("click", reiniciarJuego);
