TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received an instance of Object
    at new ReadStream (node:internal/fs/streams:185:5)
    at createReadStream (node:fs:3104:10)
    at getStream (/home/container/node_modules/@whiskeysockets/baileys/lib/Utils/messages-media.js:279:48)
    at encryptedStream (/home/container/node_modules/@whiskeysockets/baileys/lib/Utils/messages-media.js:322:58)
    at prepareWAMessageMedia (/home/container/node_modules/@whiskeysockets/baileys/lib/Utils/messages.js:114:152)
    at generateWAMessageContent (/home/container/node_modules/@whiskeysockets/baileys/lib/Utils/messages.js:370:53)
    at generateWAMessage (/home/container/node_modules/@whiskeysockets/baileys/lib/Utils/messages.js:517:102)
    at Object.sendMessage (/home/container/node_modules/@whiskeysockets/baileys/lib/Socket/messages-send.js:617:69)
    at Object.handler (file:///home/container/plugins/downloader-play_v2.js?update=1736544996843:179:16)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.handler (file:///home/container/handler.js?update=1736543407352:1502:11) {
  code: 'ERR_INVALID_ARG_TYPE'
}