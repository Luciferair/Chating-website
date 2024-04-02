const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});
const users = {};

io.on('connection', socket =>{
    socket.on('new-user-con', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-con', name);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});


http.listen(3000, ()=>{
    console.log('server is runing');
});