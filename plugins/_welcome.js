import { Client, LocalAuth } from 'whatsapp-web.js';
import fetch from 'node-fetch';
import { readFile } from 'fs/promises';

// Inicialización del cliente
const client = new Client({
    authStrategy: new LocalAuth()
});

// Función para descargar una imagen desde una URL
const getImageBuffer = async (url) => {
    const response = await fetch(url);
    return await response.buffer();
};

// Evento cuando un participante entra al grupo
client.on('group_join', async (notification) => {
    const chat = await notification.getChat();
    const welcomeImageUrl = 'https://i.ibb.co/hYFH7FB/file.jpg';
    const welcomeMessage = `🎉 ¡Bienvenido al grupo, @${notification.id.participant.split('@')[0]}! 🎉`;

    // Descargar la imagen desde la URL
    const imageBuffer = await getImageBuffer(welcomeImageUrl);

    // Envía la imagen y el mensaje
    chat.sendMessage(welcomeMessage, { mentions: [notification.id.participant] });
    chat.sendMessage(imageBuffer, { media: { mimetype: 'image/jpeg' } });
});

// Evento cuando un participante sale del grupo
client.on('group_leave', async (notification) => {
    const chat = await notification.getChat();
    const goodbyeImageUrl = 'https://i.ibb.co/hYFH7FB/file.jpg';
    const goodbyeMessage = `👋 ¡Adiós, @${notification.id.participant.split('@')[0]}! ¡Te extrañaremos!`;

    // Descargar la imagen desde la URL
    const imageBuffer = await getImageBuffer(goodbyeImageUrl);

    // Envía la imagen y el mensaje
    chat.sendMessage(goodbyeMessage, { mentions: [notification.id.participant] });
    chat.sendMessage(imageBuffer, { media: { mimetype: 'image/jpeg' } });
});

// Inicializar el cliente
client.initialize();
