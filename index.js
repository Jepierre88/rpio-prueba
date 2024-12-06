import rpio from "rpio";

// Configurar GPIO 22 como salida
const RELAY_PIN = 22;
rpio.open(RELAY_PIN, rpio.OUTPUT, rpio.LOW); // Inicia apagado

// Función para encender el relé
function turnOnRelay() {
    console.log('Encendiendo el relé...');
    rpio.write(RELAY_PIN, rpio.HIGH);
}

// Función para apagar el relé
function turnOffRelay() {
    console.log('Apagando el relé...');
    rpio.write(RELAY_PIN, rpio.LOW);
}

// Simulación: alternar encendido y apagado cada 2 segundos
let isRelayOn = false;
setInterval(() => {
    if (isRelayOn) {
        turnOffRelay();
    } else {
        turnOnRelay();
    }
    isRelayOn = !isRelayOn;
}, 10000);

// Al salir del programa, asegurarse de apagar el relé
process.on('SIGINT', () => {
    console.log('\nApagando el relé y cerrando...');
    turnOffRelay();
    rpio.close(RELAY_PIN);
    process.exit(0);
});
