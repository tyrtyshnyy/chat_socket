"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import dotenv from 'dotenv';
// dotenv.config();
const app = (0, express_1.default)();
const http = require("http").Server(app);
const cors = require("cors");
const port = 5000;
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});
//Add this before the app.get() block
let users = [];
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });
    socket.on('typing', (data) => { socket.broadcast.emit('typingResponse', data); console.log(data); });
    //Listens when a new user joins the server
    socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
    });
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});
app.use(cors());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});
http.listen(port, () => {
    console.log(`⚡️[server]: Server is running atsss https://localhost:${port}`);
});
