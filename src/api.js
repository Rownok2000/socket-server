const serverless = require ('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();
const socketIo = require('socket.io');

// Creo un oggetto socketServer sopra  il server Http
socketServer = socketIo();

// Per ogni client connesso
socketServer.on('connection', socket => {
    console.log('Socket: client connected');
    //Invio il messaggio ricevuto a tutti i client
    socket.on('new-message', (message) => { 
      socketServer.emit('resp-message', message);
      console.log(message);
    });
});

module.exports = app;
module.exports.handler= serverless(app);  //Qui è dove esportiamo le nostre funzioni per netlify
