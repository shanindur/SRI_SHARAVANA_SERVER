const express = require("express");
require("./config/db");
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./helper/messageUser-Config');
const port = process.env.PORT || 3006
const app = express()


const bodyParser = require("express").json;

app.use(bodyParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = socketio(server);

app.use(express.urlencoded({extended : false}));

const OldRouter = require("./route/index");
const UserRouter=require("./route/userRouter");
const ProductRouter=require("./route/productRouter");
const TempleRouter=require("./route/templeRouter");
const PoojaRouter=require("./route/poojaRouter");
const SongRouter=require("./route/songRouter")

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

// app.use("/auth", OldRouter);
app.use('/user',UserRouter);
app.use('/product',ProductRouter);
app.use('/temple',TempleRouter);
app.use('/pooja',PoojaRouter);
app.use('/song',SongRouter);

server.listen(process.env.PORT || port, () => console.log(`App running on port ${port}`));




