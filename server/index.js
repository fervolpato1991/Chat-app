const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: '*',
    }});

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
      
        if (error) {
          return callback(error); // Enviar el error como segundo argumento en el callback
        }
      
        socket.emit('message', { user: 'admin', text: `Welcome to the room ${user.room}, ${user.name}`});
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name}, has joined!`});
      
        socket.join(user.room);
      
        callback(); // Llamar al callback sin argumentos para indicar que todo está bien
      });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
      
        if (!user) {
          // Manejar el caso cuando el usuario no está definido
          return callback('User not found');
        }
      
        io.to(user.room).emit('message', { user: user.name, text: message });
      
        callback();
      });

    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`)); 