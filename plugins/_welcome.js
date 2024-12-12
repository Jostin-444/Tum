import { Client, LocalAuth } from 'whatsapp-web.js';
import fetch from 'node-fetch';

// Configuración del cliente
const client = new Client({
    authStrategy: new LocalAuth(),
});

const groupSettings = {}; // Almacena el estado de "welcome" por grupo

// Función para descargar una imagen desde una URL
const getImageBuffer = async (url) => {
    const response = await fetch(url);
    return await response.buffer();
};

// Evento cuando el bot está listo
client.on('ready', () => {
    console.log('¡El bot está listo y conectado!');
});

// Comando para activar o desactivar bienvenida
client.on('message', async (message) => {
    if (message.body.toLowerCase() === 'welcome on') {
        if (message.isGroupMsg) {
            groupSettings[message.from] = true;
            message.reply('✅ Bienvenidas y despedidas activadas en este grupo.');
        }
    } else if (message.body.toLowerCase() === 'welcome off') {
        if (message.isGroupMsg) {
            groupSettings[message.from] = false;
            message.reply('❌ Bienvenidas y despedidas desactivadas en este grupo.');
        }
    }
});

// Evento cuando alguien entra al grupo
client.on('group_join', async (notification) => {
    const chat = await notification.getChat();
    if (groupSettings[chat.id._serialized]) {
        const welcomeImageUrl = 'https://i.ibb.co/hYFH7FB/file.jpg'; // URL de imagen
        const welcomeMessage = `🎉 ¡Bienvenido al grupo, @${notification.id.participant.split('@')[0]}! 🎉`;

        // Descargar y enviar la imagen
        const imageBuffer = await getImageBuffer(welcomeImageUrl);
        await chat.sendMessage(welcomeMessage, { mentions: [notification.id.participant] });
        await chat.sendMessage(imageBuffer, { media: { mimetype: 'image/jpeg' } });
    }
});

// Evento cuando alguien sale del grupo
client.on('group_leave', async (notification) => {
    const chat = await notification.getChat();
    if (groupSettings[chat.id._serialized]) {
        const goodbyeImageUrl = 'https://i.ibb.co/hYFH7FB/file.jpg'; // URL de imagen
        const goodbyeMessage = `👋 ¡Adiós, @${notification.id.participant.split('@')[0]}! ¡Te extrañaremos!`;

        // Descargar y enviar la imagen
        const imageBuffer = await getImageBuffer(goodbyeImageUrl);
        await chat.sendMessage(goodbyeMessage, { mentions: [notification.id.participant] });
        await chat.sendMessage(imageBuffer, { media: { mimetype: 'image/jpeg' } });
    }
});

// Manejo de errores
client.on('error', (error) => {
    console.error('Error:', error);
});

// Inicializar el cliente
client.initialize();
