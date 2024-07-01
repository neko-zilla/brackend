import tmi from 'tmi.js';

// Configuración del bot
const BOT_USERNAME = 'nekodevsbot';
const OAUTH_TOKEN = 'oauth:x66qf4j5etm3pyc6d92e8u7o94wtmj';
const CHANNELS = ['dianneriivera']; // Reemplaza 'dianneriivera' con el nombre de tu canal

// Define las opciones de conexión
const opts = {
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN
    },
    channels: CHANNELS
};

// Crear un cliente de tmi.js con las opciones definidas
const client = new tmi.Client(opts);

// Registrar los manejadores de eventos
client.on('message', onMessageHandler);
client.on('cheer', onCheerHandler); // Manejador para cuando se canjean bits

// Conectarse a Twitch
client.connect();

// Manejador de mensajes
function onMessageHandler(channel, tags, message, self) {
    if (self) return; // Ignorar mensajes del bot

    // Saludar cuando alguien diga "!mamahuevo"
    if (message.toLowerCase() === '!mamahuevo') {
        client.say(channel, `¡pitito @${tags['display-name']} mamahuevo!`);
    }
}

// Manejador para cuando se canjean bits
function onCheerHandler(channel, userstate, message) {
    const bits = userstate.bits; // Obtener la cantidad de bits canjeados
    const displayName = userstate['display-name']; // Nombre de usuario que canjeó los bits
    const messageText = message || ''; // Mensaje asociado al canje de bits (opcional)

    // Manejar múltiples canjes de bits
    if (bits > 0) {
        client.say(channel, `¡Gracias @${displayName} por canjear ${bits} bits! ${messageText}`);
    }
}

// Manejador de conexión
client.on('connected', (addr, port) => {
    console.log(`* Conectado a ${addr}:${port}`);
});