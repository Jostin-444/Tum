import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (m.action === 'add' || m.action === 'remove') {
    const groupId = m.chat;
    const groupName = conn.getName(groupId);
    const participants = await conn.groupMetadata(groupId);
    const newUser = m.action === 'add' ? m.participant : m.quoted.sender;

    const welcomeImage = 'https://i.ibb.co/hYFH7FB/file.jpg';
    const goodbyeImage = 'https://i.ibb.co/hYFH7FB/file.jpg';

    const welcomeMessage = `Bienvenido/a @${newUser.split('@')[0]} al grupo ${groupName}!`;
    const goodbyeMessage = `Hasta luego @${newUser.split('@')[0]}!`;

    if (m.action === 'add') {
      await conn.sendMessage(groupId, { image: fs.readFileSync(welcomeImage), caption: welcomeMessage, mentions: [newUser] });
    } else if (m.action === 'remove') {
      await conn.sendMessage(groupId, { image: fs.readFileSync(goodbyeImage), caption: goodbyeMessage, mentions: [newUser] });
    }
  }
}

handler.help = ['Bienvenida y despedida automática'];
handler.tags = ['grupo'];
handler.command = false;

export default handler;
